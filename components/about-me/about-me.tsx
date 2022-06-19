import Image from 'next/image'
import * as React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import portrait from '../../public/portrait.jpg'
import Styles from './about-me.module.scss'

const AboutMe: React.FC<{}> = () => {
  const [aboutMeExpanded, setAboutMeExpanded] = React.useState(false)
  const additionalContentDiv: React.Ref<HTMLDivElement> = React.useRef(null)

  React.useEffect(() => {
    const { current } = additionalContentDiv
    if (current == null) return
    const height = getAboutMeContentsHeightPx(current)
    if (height < 300) {
      setAboutMeExpanded(true)
    }
  })

  React.useEffect(() => {
    const { current } = additionalContentDiv
    if (current == null) return

    const aboutMeContentsHeightPx = getAboutMeContentsHeightPx(current)
    if (aboutMeExpanded) {
      current.style.height = `${aboutMeContentsHeightPx}px`
    } else {
      current.style.height = '0px'
    }
  }, [aboutMeExpanded])

  function getAboutMeContentsHeightPx(ref: HTMLDivElement) {
    return Array.from(ref.childNodes).reduce((s, c) => s + ((c as HTMLElement).clientHeight || 0), 0)
  }

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
          <ul>
            <li>
              Working at Capital One, doing primarily data ingestion, using Node with TypeScript on cloud-native AWS
              services.
            </li>
            <li>
              Enrolled in{' '}
              <a href="https://omscs.gatech.edu/" target="blank">
                Georgia Tech&#39;s OMSCS program <FiExternalLink />
              </a>{' '}
              for the Fall 2022 semester.
            </li>
            <li>
              Learning{' '}
              <a href="https://flutter.dev/" target="blank">
                Flutter <FiExternalLink />
              </a>
              .
            </li>
            <li>
              Casually reading{' '}
              <a href="https://abseil.io/resources/swe-book" target="blank">
                Software Engineering at Google <FiExternalLink />
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
