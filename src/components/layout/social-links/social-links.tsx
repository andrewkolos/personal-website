import { Link } from 'gatsby';
import * as React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Styles from './social-links.module.scss';

export const SocialLinks: React.FC = () => {
  return (
    <div>
      <div className={Styles.linksContainer}>
        <Link className={Styles.link} to="https://github.com/andrewkolos">
          <FiGithub />
        </Link>
        <Link className={Styles.link} to="https://linkedin.com/in/andrewkolos/">
          <FiLinkedin />
        </Link>
      </div>
    </div>
  );
}