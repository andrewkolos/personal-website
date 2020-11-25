import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { ListLink } from '../nav-link'
import Styles from './header.module.scss';

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <header className={Styles.header}>
    <div className={Styles.container}>
      <h1 className={Styles.titleContainer}>
        <Link to="/" className={Styles.title}>{siteTitle}</Link>
      </h1>
      <ul className={Styles.navLinkContainer}>
        <ListLink to='/blog' className={Styles.navLink}>Blog</ListLink>
        <ListLink to='/about/' className={Styles.navLink}>About</ListLink>
        <ListLink to='/contact/' className={Styles.navLink}>Contact</ListLink>
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
