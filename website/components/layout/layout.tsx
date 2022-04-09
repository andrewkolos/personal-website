import PropTypes from 'prop-types'
import React from 'react'
import { defaultSiteMetadata } from '../../lib/default-site-metadata'
import Header from '../header/header'
import Seo from '../seo'
import { SocialLinks } from './social-links/social-links'

interface LayoutProps {
  children: React.ReactNode
  pathName: string
}

const Layout: React.FC<LayoutProps> = ({ pathName, children }) => (
  <div style={{ margin: 'auto' }}>
    <Seo pathName={pathName} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Header siteTitle={defaultSiteMetadata.title || `Title`} />
    <div
      style={{
        margin: `2rem auto`,
        maxWidth: 960,
      }}
    >
      <main id="main">{children}</main>
    </div>
    <footer
      style={{
        marginTop: `3.45rem`,
      }}
    >
      <hr />
      <SocialLinks />
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
