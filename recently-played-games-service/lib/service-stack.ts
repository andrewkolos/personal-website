import { Stack, StackProps } from 'aws-cdk-lib'
import * as sns from 'aws-cdk-lib/aws-sns'
import * as events from 'aws-cdk-lib/aws-events'
import * as targets from 'aws-cdk-lib/aws-events-targets'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import { Construct, IConstruct } from 'constructs'
import * as dotEnv from 'dotenv'
import * as readEnv from 'env-var'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as cloudwatchActions from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions'
import * as cdk from 'aws-cdk-lib'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'

dotEnv.config()

export class RecentlyPlayedGamesServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const gamesDatabaseBucket = new Bucket(this, 'recently-played-games-service-database', {
      bucketName: 'recently-played-games-service-database',
      versioned: true,
    })
    tag(gamesDatabaseBucket)

    const steamworksApiTokenParameter = new ssm.StringParameter(this, 'STEAMWORKS_TOKEN', {
      stringValue: readEnv.get('STEAMWORKS_TOKEN').required().asString(),
      parameterName: 'STEAMWORKS_TOKEN',
      type: ssm.ParameterType.STRING,
      simpleName: true,
      dataType: ssm.ParameterDataType.TEXT,
    })
    tag(steamworksApiTokenParameter)

    const commonPackagesLayer = new lambda.LayerVersion(this, 'common-packages-layer', {
      layerVersionName: 'common-packages-layer',
      code: lambda.Code.fromAsset('common'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
      license: 'MIT',
      description: 'Shared packages for the RecentlyPlayedGamesService',
    })
    tag(commonPackagesLayer)

    const awsSdkLayer = new lambda.LayerVersion(this, 'aws-sdk-v3-layer-layer', {
      layerVersionName: 'aws-sdk-v3-layer-layer',
      code: lambda.Code.fromAsset('aws-sdk-v3-layer'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
      license: 'MIT',
      description: 'Layer with certain AWS SDK V3 (@aws-sdk) libraries.',
    })
    tag(commonPackagesLayer)

    const getLambda = new lambda.Function(this, 'get', {
      functionName: 'get',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambdas/get'),
      handler: 'dist/handler.lambdaHandler',
      layers: [commonPackagesLayer, awsSdkLayer],
      environment: {
        DATABASE_BUCKET_NAME: gamesDatabaseBucket.bucketName,
      },
    })
    tag(getLambda)
    gamesDatabaseBucket.grantRead(getLambda)

    const getApi = new apigateway.RestApi(this, 'get-api', {
      restApiName: 'get-api',
      description: 'Gets recently played games from Steam.',
    })
    const getApiLambdaIntegration = new apigateway.LambdaIntegration(getLambda, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    })

    getApi.root.addMethod('GET', getApiLambdaIntegration)
    tag(getApi)

    const triggerUpdateLambda = new lambda.Function(this, 'trigger-update', {
      functionName: 'trigger-update',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambdas/trigger-update'),
      handler: 'dist/handler.lambdaHandler',
      layers: [commonPackagesLayer, awsSdkLayer],
      environment: {
        DATABASE_BUCKET_NAME: gamesDatabaseBucket.bucketName,
      },
    })
    tag(triggerUpdateLambda)
    steamworksApiTokenParameter.grantRead(triggerUpdateLambda)
    gamesDatabaseBucket.grantReadWrite(triggerUpdateLambda)

    const triggerUpdateScheduledEventRule = new events.Rule(this, 'trigger-update-scheduled-event-rule', {
      ruleName: 'trigger-update-scheduled-event-rule',
      schedule: events.Schedule.expression('rate(7 days)'),
    })
    tag(triggerUpdateScheduledEventRule)
    triggerUpdateScheduledEventRule.addTarget(new targets.LambdaFunction(triggerUpdateLambda))

    const lambdaErrorTopic = new sns.Topic(this, 'error-topic', {
      topicName: 'error-topic',
    })
    tag(lambdaErrorTopic)
    lambdaErrorTopic.addSubscription(new snsSubscriptions.EmailSubscription('andrewrkolos@gmail.com'))

    const getLambdaErrorMetric = triggerUpdateLambda.metricErrors()
    const getLambdaErrorAlarm = getLambdaErrorMetric.createAlarm(this, 'get-error', {
      alarmName: 'get-error',
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    })
    tag(getLambdaErrorAlarm)

    getLambdaErrorAlarm.addAlarmAction(new cloudwatchActions.SnsAction(lambdaErrorTopic))

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, 'getApiEndpoint', {
      value: getApi.url,
      description: 'URL for the get API endpoint.',
      exportName: 'getApiEndpoint',
    })
  }
}

function tag(scope: IConstruct) {
  cdk.Tags.of(scope).add('Environment', 'prod')
  cdk.Tags.of(scope).add('Application', 'recently-played-games-service')
}
