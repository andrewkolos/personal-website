import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Ref, useRef } from 'react'
import Styles from './header.module.scss'
import { NavLink } from './nav-link'

const Header = ({ siteTitle }: { siteTitle: string }) => {
  const navRef: Ref<HTMLElement> = useRef(null)

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <span className={Styles.titleContainer}>
          <Link href="/">
            <a className={Styles.title}>{siteTitle}</a>
          </Link>
        </span>
        <nav ref={navRef}>
          <ul className={Styles.navLinkContainer}>
            <NavLink to="/" activeclassname={Styles.navLinkActive}>
              Blog
            </NavLink>
            <NavLink to="/projects" activeclassname={Styles.navLinkActive}>
              Projects
            </NavLink>
            <NavLink to="/demos" activeclassname={Styles.navLinkActive}>
              Games/Demos
            </NavLink>
            <NavLink to="/reading-list" activeclassname={Styles.navLinkActive}>
              Reading List
            </NavLink>
            <NavLink to="/contact-me" activeclassname={Styles.navLinkActive}>
              Contact
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
