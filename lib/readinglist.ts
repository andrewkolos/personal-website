import dedent from 'dedent'

export interface ReadingListEntry {
  /** Needed in case their site's web server blocks crawler request at build time. */
  title: string
  date: string
  url: string
  blurb?: string
}

const data: ReadingListEntry[] = [
  {
    date: '2022/08/12',
    title: 'Crafting Interpreters - Representing Code',
    url: 'https://craftinginterpreters.com/representing-code.html',
    blurb: dedent`While this part of this book is how to have multiple components (e.g. parser and interpreter) work on an the same abstract syntax tree (AST), I find it particularly
    interesting for it's fantastic explanation and discussion on the Visitor OOD pattern. The Visitor pattern very much confused me when I first encountered it right out of college,
    and I think this is the explanation and example I really could have used back then.`,
  },
  {
    date: '2022/5/15',
    title: 'EventBridge Storming — How to build state-of-the-art Event-Driven Serverless Architectures',
    url: 'https://medium.com/serverless-transformation/eventbridge-storming-how-to-build-state-of-the-art-event-driven-serverless-architectures-e07270d4dee',
    blurb: dedent`Though I have heard and read about event-driven architectures before, this is a cool introduction to the idea of "Event Storming," an
    approach to defining the Events, Boundaries and Entities in a business domain. With these things defined, one can create a decoupled collection of microservices
    that can be deployed independently of each other, communicating indirectly via an event bus. I've seen this concept before in discussions about SoA, but it was
    neat to see it from an AWS-native perspective.`,
  },
  {
    date: '2022/5/14',
    title: 'We love AWS Lambda, but its concurrency handling with SQS is silly.',
    url: 'https://www.foxy.io/blog/we-love-aws-lambda-but-its-concurrency-handling-with-sqs-is-silly/',
    blurb: dedent`Despite having worked with Lambdas with SQS event source mappings for a decent amount of time now, I
      had no idea that such a configuration could result in Lambda throttling. I need to revise some of our team's stuff
      at Capital One to see if are vulnerable to any of this. My team personally doesn't use dead-letter queues (DLQs) due to a variety
      of unfortunate reasons, so such throttling could result in dropped messages.`,
  },
  {
    date: '2022/4/16',
    title: 'Fast-Paced Multiplayer: Client-Server Game Architecture',
    url: 'https://www.gabrielgambetta.com/client-server-game-architecture.html',
    blurb: dedent`An amazing article series explaining the fundamental architecture used to synchronized fast-moving online video games.
      Also includes a demo. It might take you an afternoon to synthesize all the information, but I'd definitely recommend it
      for anyone that plays games online or is interested in synchronization more generally.`,
  },
  {
    date: '2021/11/22',
    title: "Parse don't validate.",
    url: 'https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/',
    blurb: dedent`It's been a long time since I updated my reading list. I have been keeping myself busy with my new job at Capital One.
      A came across this article when looking for an object schema and declaration validation library for some node-based services at work.
      
      This article does a great job pointing out the utility of separating the duties of 1) input parsing/validation and 2) business logic
      using that input. Not only does this make bugs easier to pin down, it also makes it simpler to reason about the function I'm currently
      looking at. It's nice to not have to have the question "can I assume this parameter is has a valid value" burdening my mind when
      trying to parse a function.
    `,
  },
  {
    date: '2021/05/20',
    title: 'The Software Architect Fallacy',
    url: 'https://uxdesign.cc/the-software-architect-fallacy-b62a41683979',
  },
  {
    date: '2021/05/19',
    title: 'Pattern: Backends For Frontends',
    url: 'https://samnewman.io/patterns/architectural/bff/',
  },
  {
    title: 'Micro Frontends',
    date: '2021/05/18',
    url: 'https://martinfowler.com/articles/micro-frontends.html',
    blurb: dedent`An interesting approach of splitting up a single frontend into smaller ones based around business concerns,
      similarly to the microservices approach to backends. There's the downside of managing dependencies shared by multiple of
      these split frontends, but it can allow for each team to move more quickly to speed up development as well as use different
      frontend stacks.`,
  },
  {
    title: 'Behavior Trees for AI: How They Work',
    date: '2021/05/16',
    url: 'https://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php',
    blurb: dedent`
      Demonstrates, at a conceptual level, how relatively complex AI behavior can be achieved by composing simple constructs.
      Since games are huge state-ful applications with complex behavior, it is no surprise that game developers employ
      elegant architectural patterns to keep themselves sane.

      I'd also recommend Robert Nystrom's free book, [*Game Programming Patterns*](https://gameprogrammingpatterns.com/contents.html), to
      anyone not already highly-experienced with OOD, regardless of whether or not they are interested in game development.
    `,
  },
  {
    title: 'Dear Client, Here’s Why That Change Took So Long',
    date: '2021/05/16',
    url: 'https://www.simplethread.com/dear-client-heres-why-that-change-took-so-long/',
    blurb: dedent`
     Interesting example of someone attempting to explain to a client why the smallest of code changes could
     take a decent bit of time to make. Personally, I'd rather do this in -person rather than over email.
     
     Additionally, providing a list of all the things done to perform a simple code change in the invoice could is simpler way of 
     exposing the client to a lot the complexity they don't see. This could avoid the need for such an email to begin with.

     The Hacker News thread on this article has lots of good discussion around the topic.`,
  },
  {
    title: 'How Discord Stores Billions of Messages',
    date: '2021/05/15',
    url: 'https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7#.dzqq7q4o7',
    blurb:
      "A nice case study that walks through the considerations and process of choosing a DB for Discord's scenario.",
  },
  {
    title: 'Simulating Return Type Inference in C#',
    date: '2021/04/09',
    url: 'https://tyrrrz.me/blog/return-type-inference',
  },
  {
    title: 'Popular Myths About Relational & No-SQL Databases Explained',
    date: '2021/04/01',
    url: 'https://www.capitalone.com/tech/software-engineering/relational-and-nosql-database-myths/',
  },
  {
    title: 'Go is Boring...And That’s Fantastic!',
    date: '2021/03/29',
    url: 'https://www.capitalone.com/tech/software-engineering/go-is-boring/',
  },
  {
    title: 'Text fields & Forms design — UI components series',
    date: '2021/03/24',
    url: 'https://uxdesign.cc/text-fields-forms-design-ui-components-series-2b32b2beebd0',
  },
]

export default data
