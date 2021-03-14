import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { ListLink } from './nav-link'
import Styles from './header.module.scss';

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <header className={Styles.header}>
    <div className={Styles.container}>
      <span className={Styles.titleContainer}>
        <Link to="/" className={Styles.title}>{siteTitle}</Link>
      </span>
      <nav>
        <ul className={Styles.navLinkContainer}>
          <ListLink to='/' className={Styles.navLink} activeClassName={Styles.navLinkActive}>Blog</ListLink>
          <ListLink to='/projects/' className={Styles.navLink} activeClassName={Styles.navLinkActive}>Projects</ListLink>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
