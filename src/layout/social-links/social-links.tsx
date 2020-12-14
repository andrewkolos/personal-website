import * as React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Styles from './social-links.module.scss';

export const SocialLinks: React.FC = () => {
  return (
    <div>
      <div className={Styles.linksContainer}>
        <a
          className={Styles.link}
          href="https://github.com/andrewkolos"
          aria-label="Link to Andrew Kolos' GitHub profile"
        >
          <FiGithub />
        </a>
        <a
          className={Styles.link}
          href="https://linkedin.com/in/andrewkolos/"
          aria-label="Link to Andrew Kolos' LinkedIn profile"
        >
          <FiLinkedin />
        </a>
      </div>
    </div>
  );
};
