import { useRouter } from 'next/router'
import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi'
import { RiFileCopyLine } from 'react-icons/ri'
import { DiscordButton } from '../components/discord-button'
import Layout from '../components/layout/layout'
import Styles from './contact-me.module.scss'

const ContactMePage: React.FC = () => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname} showFooter={false}>
      <div className={Styles.container}>
        <h1>Contact Me👋</h1>
        <p>Want to talk about programming? Your open source projects? Video games? Let&apos;s chat!</p>
        <div className={Styles.linksContainer}>
          <a
            className={Styles.link}
            href="https://linkedin.com/in/andrewkolos/"
            aria-label="Link to Andrew Kolos' LinkedIn profile"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`}>
              <FiLinkedin />
              <span className={Styles.tooltipText}>
                {' '}
                LinkedIn Profile <FiExternalLink />{' '}
              </span>
            </span>
          </a>
          <a
            className={Styles.link}
            href="mailto:andrewrkolos@gmail.com"
            aria-label="Mail link for andrewrkolos@gmail.com"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`} data-text="Email me">
              <FiMail />
              <span className={Styles.tooltipText}>
                {' '}
                Email me <FiExternalLink />{' '}
              </span>
            </span>
          </a>
          <span className={`${Styles.tooltip} ${Styles.tooltipTop} ${Styles.link}`}>
            <DiscordButton />
            <span className={Styles.tooltipText}>
              {' '}
              Copy Discord Username <RiFileCopyLine />{' '}
            </span>
          </span>
          <a
            className={Styles.link}
            href="https://github.com/andrewkolos"
            aria-label="Link to Andrew Kolos' GitHub profile"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`} data-text="GitHub Profile">
              <FiGithub />
              <span className={Styles.tooltipText}>
                GitHub Profile <FiExternalLink />
              </span>
            </span>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default ContactMePage
