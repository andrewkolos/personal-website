import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Ref, useRef } from 'react';
import * as Styles from './header.module.scss';
import { NavLink } from './nav-link';

const Header = ({ siteTitle }: { siteTitle: string }) => {

  const navRef: Ref<HTMLElement> = useRef(null);

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <span className={Styles.titleContainer}>
          <Link to="/" className={Styles.title}>
            {siteTitle}
          </Link>
        </span>
        <nav ref={navRef}>
          <ul className={Styles.navLinkContainer}>
            <NavLink
              to="/"
              activeClassName={Styles.navLinkActive}
            >
              Blog
            </NavLink>
            <NavLink
              to="/projects/"
              activeClassName={Styles.navLinkActive}
            >
              Projects
            </NavLink>
            <NavLink
              to="/demos/"
              activeClassName={Styles.navLinkActive}
            >
              Games/Demos
            </NavLink>
            <NavLink
              to="/reading-list/"
              activeClassName={Styles.navLinkActive}
            >
              Reading List
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
