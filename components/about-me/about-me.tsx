import Image from 'next/image'
import * as React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import portrait from '../../public/portrait.jpg'
import Styles from './about-me.module.scss'

const AboutMe: React.FC<{}> = () => {
  const [aboutMeExpanded, setAboutMeExpanded] = React.useState(false)
  const additionalContentDiv: React.RefObject<HTMLDivElement> = React.useRef(null)

  React.useEffect(() => {
    const listener = () => updateAboutMeContentsHeight()
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  })

  React.useEffect(() => {
    if (window.innerWidth > 800) {
      setAboutMeExpanded(true)
    }
  })

  React.useEffect(() => {
    updateAboutMeContentsHeight()
  }, [aboutMeExpanded])

  function getAboutMeContentsHeightPx(ref: HTMLDivElement) {
    return Array.from(ref.childNodes).reduce((s, c) => s + ((c as HTMLElement).clientHeight || 0), 0)
  }

  function updateAboutMeContentsHeight() {
    const { current } = additionalContentDiv
    if (current == null) return

    const aboutMeContentsHeightPx = getAboutMeContentsHeightPx(current)
    if (aboutMeExpanded) {
      // eslint-disable-next-line no-param-reassign
      current.style.height = `${aboutMeContentsHeightPx}px`
    } else {
      // eslint-disable-next-line no-param-reassign
      current.style.height = '0px'
    }
  }

  return (
    <div className={Styles.container}>
      <h1>About me</h1>
      <div className={Styles.portraitContainer}>
        <Image src={portrait} alt="Portrait of Andrew Kolos" className={Styles.portrait} width={128} height={128} />
      </div>
      <p className={Styles.content}>
        Hello! I enjoy programming and am most experienced in full-stack web dev. Topics that interest me include
        software architecture, code/API design, and developer productivity/happiness. When I&apos;m not programming or
        reading about it, I spend most of my time playing video games, particularly shorter single-player titles or
        team-based games.
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
          <ul>
            <li>
              Working on{' '}
              <a href="https://flutter.dev" target="blank">
                Flutter <FaExternalLinkAlt />
              </a>{' '}
              at Google, focused primarily on tools.
            </li>
            <li>
              Enrolled in{' '}
              <a href="https://omscs.gatech.edu/" target="blank">
                Georgia Tech&#39;s OMSCS program <FaExternalLinkAlt />
              </a>{' '}
              for the Fall 2022 semester.
            </li>
            <li>
              Learning{' '}
              <a href="https://flutter.dev/" target="blank">
                Flutter <FaExternalLinkAlt />
              </a>
              .
            </li>
            <li>
              Slowly reading{' '}
              <a href="https://abseil.io/resources/swe-book" target="blank">
                Software Engineering at Google <FaExternalLinkAlt />
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
