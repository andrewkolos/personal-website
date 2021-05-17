import dedent from 'dedent';

const data = [
  {
    date: '2021/05/16',
    url: 'https://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php',
    blurb: dedent`
      Demonstrates, at a conceptual level, how relatively complex AI behavior can be achieved by composing simple constructs.
      Since games are huge state-ful applications with complex behavior, it is no surprise that game developers employ
      elegant architectural patterns to keep themselves sane.

      I'd also recommend Robert Nystrom's free book, [*Game Programming Patterns*](https://gameprogrammingpatterns.com/contents.html), to
      anyone not already highly-experienced with OOD, regardless of whether or not they are interested in game development.
    `
  },
  {
    date: '2021/05/16',
    url: 'https://www.simplethread.com/dear-client-heres-why-that-change-took-so-long/',
    blurb: dedent`
     Interesting example of someone attempting to explain to a client why the smallest of code changes could
     take a decent bit of time to make. Personally, I'd rather do this in -person rather than over email.
     
     Additionally, providing a list of all the things done to perform a simple code change in the invoice could is simpler way of 
     exposing the client to a lot the complexity they don't see. This could avoid the need for such an email to begin with.

     The Hacker News thread on this article has lots of good discussion around the topic.`
  },
  {
    date: '2021/05/15',
    url: 'https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7#.dzqq7q4o7',
    blurb: `A nice case study that walks through the considerations and process of choosing a DB for Discord's scenario.`
  },
  {
    date: '2021/04/09',
    url: 'https://tyrrrz.me/blog/return-type-inference'
  },
  {
    date: '2021/04/01',
    url: 'https://www.capitalone.com/tech/software-engineering/relational-and-nosql-database-myths/'
  },
  {
    date: '2021/03/30',
    url: 'https://www.capitalone.com/tech/software-engineering/is-your-app-chaos-engineering-ready/'
  },
  {
    date: '2021/03/30',
    url: 'https://www.capitalone.com/tech/software-engineering/how-to-avoid-loose-coupled-microservices/'
  },
  {
    date: '2021/03/29',
    url: 'https://www.capitalone.com/tech/software-engineering/go-is-boring/'
  },
  {
    date: '2021/03/24',
    url: 'https://uxdesign.cc/text-fields-forms-design-ui-components-series-2b32b2beebd0'
  }
];

export default data;
