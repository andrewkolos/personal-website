import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { ListLink } from './nav-link'
import Styles from './header.module.scss';

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <header className={Styles.header}>
    <div className={Styles.container}>
      <h1 className={Styles.titleContainer}>
        <Link to="/" className={Styles.title}>{siteTitle}</Link>
      </h1>

      <ul className={Styles.navLinkContainer}>
        <ListLink to='/' className={Styles.navLink}>Blog</ListLink>
        <ListLink to='/projects/' className={Styles.navLink}>Projects</ListLink>
      </ul>
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
