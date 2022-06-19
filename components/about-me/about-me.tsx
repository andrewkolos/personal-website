import Image from 'next/image'
import * as React from 'react'
import portrait from '../../public/portrait.jpg'
import Styles from './about-me.module.scss'
import GameShowcase from './game-showcase/game-showcase'

const AboutMe: React.FC<{}> = () => {
  const [aboutMeExpanded, setAboutMeExpanded] = React.useState(false)
  const additionalContentDiv: React.Ref<HTMLDivElement> = React.useRef(null)

  React.useEffect(() => {
    const { current } = additionalContentDiv
    if (current == null) return

    if (aboutMeExpanded) {
      current.style.height = `${Array.from(current.childNodes).reduce(
        (s, c) => s + ((c as HTMLElement).clientHeight || 0),
        0,
      )}px`
    } else {
      current.style.height = '0px'
    }
  }, [aboutMeExpanded])

  return (
    <div className={Styles.container}>
      <h1>About me</h1>
      <div className={Styles.portraitContainer}>
        <Image src={portrait} alt="Portrait of Andrew Kolos" className={Styles.portrait} width={128} height={128} />
      </div>
      <p className={Styles.content}>
        Hello, I enjoy programming and am most experienced in full-stack web dev. I like to think about application and
        code architecture/design. I also enjoy developing features for applications. When I&apos;m not programming or
        reading about it, I spend most of my time playing video games, particularly single-player indie titles or co-op
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

      <div className={Styles.additionalContent} hidden={!aboutMeExpanded} ref={additionalContentDiv}>
        <div>
          <h2>What I&#39;m up to</h2>

          <h3>Work</h3>
          <p>
            I work at Capital One. I take part in enabling our contact center call quality assessment process, playing a
            crucial role in call/contact ingestion. Most of my work is backend, working on realtime and batch ingestion
            of customer contacts into our platform, with some on-off core API and frontend development.
          </p>
          <h3>Upcoming Plans</h3>
          <p>
            I am enrolled in <a href="https://omscs.gatech.edu/">Georgia Tech&#39;s OMSCS program</a> for the Fall 2022
            semester. I&#39;ll start taking some graduate courses to explore more potential interests and hopefully
            develop an interest within a specialized field in computer science.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
