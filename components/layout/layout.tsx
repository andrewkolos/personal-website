import PropTypes from 'prop-types'
import React, { PropsWithChildren } from 'react'
import FadeIn from 'react-fade-in'
import { defaultSiteMetadata } from '../../lib/default-site-metadata'
import Header from '../header/header'
import Seo from '../seo'
import { SocialLinks } from './social-links/social-links'

interface LayoutProps extends PropsWithChildren {
  pathName: string
  showFooter?: boolean
  noSideMargins?: boolean
}

const Layout: React.FC<LayoutProps> = ({ pathName, children, showFooter, noSideMargins }) => (
  <div style={{ margin: 'auto' }}>
    <Seo pathName={pathName} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Header siteTitle={defaultSiteMetadata.title || `Title`} />
    <div
      style={{
        margin: `2rem auto`,
        maxWidth: noSideMargins ? 'initial' : 960,
      }}
    >
      <main id="main">
        <FadeIn delay={75}>{children}</FadeIn>
      </main>
    </div>
    {showFooter !== false && (
      <footer
        style={{
          marginTop: `3.45rem`,
        }}
      >
        <hr />
        <SocialLinks />
      </footer>
    )}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
  noSideMargins: PropTypes.bool,
}

Layout.defaultProps = {
  showFooter: true,
  noSideMargins: false,
}

export default Layout
