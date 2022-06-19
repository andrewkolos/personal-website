import { useRouter } from 'next/router'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { IoMdMail } from 'react-icons/io'
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
            target="blank"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`}>
              <FaLinkedin />
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
            target="blank"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`} data-text="Email me">
              <IoMdMail />
              <span className={Styles.tooltipText}>
                {' '}
                Email me <FiExternalLink />{' '}
              </span>
            </span>
          </a>
          <span className={Styles.link}>
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`}>
              <DiscordButton />
              <span className={Styles.tooltipText}>
                {' '}
                Copy Discord Username <RiFileCopyLine />{' '}
              </span>
            </span>
          </span>
          <a
            className={Styles.link}
            href="https://github.com/andrewkolos"
            aria-label="Link to Andrew Kolos' GitHub profile"
            target="blank"
          >
            <span className={`${Styles.tooltip} ${Styles.tooltipTop}`}>
              <FaGithub />
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
