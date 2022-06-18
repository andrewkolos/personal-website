import { useRouter } from 'next/router'
import React from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
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
            <FiLinkedin />
          </a>
          <a
            className={Styles.link}
            href="mailto:andrewrkolos@gmail.com"
            aria-label="Mail link for andrewrkolos@gmail.com"
          >
            <FiMail />
          </a>
          <DiscordButton className={Styles.link} />
          <a
            className={Styles.link}
            href="https://github.com/andrewkolos"
            aria-label="Link to Andrew Kolos' GitHub profile"
          >
            <FiGithub />
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default ContactMePage
