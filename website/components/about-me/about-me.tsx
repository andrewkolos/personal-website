import Image from 'next/image'
import * as React from 'react'
import { GameData } from '../../lib/games/game-data'
import portrait from '../../public/portrait.jpg'
import Styles from './about-me.module.scss'
import GameShowcase from './game-showcase/game-showcase'

export interface AboutMeProps {
  games: GameData[]
}

const AboutMe: React.FC<AboutMeProps> = (props) => {
  const [aboutMeExpanded, setAboutMeExpanded] = React.useState(false)

  return (
    <div className={Styles.container}>
      <h1>About me</h1>
      <div className={Styles.portraitContainer}>
        <Image src={portrait} alt="Portrait of Andrew Kolos" className={Styles.portrait} width={128} height={128} />
      </div>
      <p className={Styles.content}>
        Hello, I enjoy programming and am most experienced in full-stack web dev. I like to think about application and
        code architecture/design. I also enjoy developing features for applications. When I&quot;m not programming or
        reading about it, I spend most of my time playing video games, particularly one-player indie titles or co-op
        games.
      </p>

      <button
        hidden={aboutMeExpanded}
        type="button"
        className={Styles.showMoreButton}
        onClick={() => setAboutMeExpanded(true)}
      >
        Show more...
      </button>

      <div hidden={!aboutMeExpanded}>
        <h2>What I&#39;m up to</h2>

        <h3>Work</h3>
        <p>
          I work at Capital One. I take part in enabling our contact center call quality assessment process, playing a
          crucial role in call/contact ingestion. Most of my work is backend, working on realtime and batch ingestion of
          customer contacts into our platform, with some on-off core API and frontend development.
        </p>
        <h3>Current Hobby Project</h3>
        <p>
          Right now, I&#39;m working on a recreation/rewrite of a{' '}
          <a href="https://github.com/andrewkolos/simple-personal-gradebook">
            personal gradebook/grade calculator web app I created back in back in college
          </a>
          . Back then, I created it as a way to teach myself modern simple full-stack web development. This time around,
          I aim to recreate it with an improved UI, improved cloud-native backend, and improved code quality.
        </p>
        <p>
          Along the way, I&#39;ll get to learn more general-purpose dev tools (like{' '}
          <a href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html">
            AWS SAM
          </a>{' '}
          and <a href="https://docs.aws.amazon.com/cdk/v2/guide/home.html">AWS CDK</a>
          ), the ability to flex some skills picked up while obtaining multiple AWS certifications, and learn new
          frontend technologies like <a href="https://svelte.dev/">Svelete</a> and{' '}
          <a href="https://tailwindcss.com/">Tailwind CSS</a>. Hopefully, my UI design skill will improve as well.
        </p>
        <h3>Upcoming Plans</h3>
        <p>
          I am enrolled in <a href="https://omscs.gatech.edu/">Georgia Tech&#39;s OMSCS program</a> for the Fall 2022
          semester. I&#39;ll start taking some graduate courses to explore more potential interests and hopefully
          develop an interest within a specialized field in computer science.
        </p>
        <h3>Recently Played Video Games</h3>
        <GameShowcase games={props.games} />
      </div>
    </div>
  )
}

export default AboutMe

// function formatDateForGamesPlayed(date: Date) {
//   return date.toLocaleString('en-us', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   })
// }
