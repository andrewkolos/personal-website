#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { RecentlyPlayedGamesServiceStack } from '../lib/service-stack'

const app = new cdk.App()
// eslint-disable-next-line no-new -- This is AWS' doing, we can't do anything about it.
new RecentlyPlayedGamesServiceStack(app, 'RecentlyPlayedGamesServiceStack')
