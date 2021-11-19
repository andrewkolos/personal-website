import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Ref, useEffect, useRef, useState } from 'react';
import { NavLink } from './nav-link';
import Styles from './header.module.scss';
import { FiMenu } from 'react-icons/fi';

const Header = ({ siteTitle }: { siteTitle: string }) => {
  const [menuExpanded, setMenuExpended] = useState(false);

  const navRef: Ref<HTMLElement> = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    if (menuExpanded) {
      nav.classList.add(Styles.navExpanded);
    } else {
      nav.classList.remove(Styles.navExpanded);
    }
  }, [menuExpanded]);

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
              className={Styles.navLink}
              activeClassName={Styles.navLinkActive}
            >
              Blog
            </NavLink>
            <NavLink
              to="/projects/"
              className={Styles.navLink}
              activeClassName={Styles.navLinkActive}
            >
              Projects
            </NavLink>
            <NavLink
              to="/demos/"
              className={Styles.navLink}
              activeClassName={Styles.navLinkActive}
            >
              Games/Demos
            </NavLink>
            <NavLink
              to="/reading-list/"
              className={Styles.navLink}
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
