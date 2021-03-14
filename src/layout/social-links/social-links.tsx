import * as React from 'react';
import { FiGithub, FiLinkedin, FiMail} from 'react-icons/fi';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import Styles from './social-links.module.scss';

export const SocialLinks: React.FC = () => {
  return (
    <div>
      <div className={Styles.linksContainer}>
        <OutboundLink
          className={Styles.link}
          href="https://github.com/andrewkolos"
          aria-label="Link to Andrew Kolos' GitHub profile"
        >
          <FiGithub />
        </OutboundLink>
        <OutboundLink
          className={Styles.link}
          href="https://linkedin.com/in/andrewkolos/"
          aria-label="Link to Andrew Kolos' LinkedIn profile"
        >
          <FiLinkedin />
        </OutboundLink>
        <OutboundLink
          className={Styles.link}
          href="mailto:andrewrkolos@gmail.com"
          aria-label="Mail link for andrewrkolos@gmail.com"
        >
          <FiMail />
        </OutboundLink>
      </div>
    </div>
  );
};
