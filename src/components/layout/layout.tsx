/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import Header from '../header/header';
import "./layout.css"
import { SocialLinks } from './social-links/social-links';

const Meta: React.FunctionComponent<{}> = () => {

  return (
    <Helmet>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Andrew Kolos</title>
      <meta name="description" content="Andrew Kolos' personal website." />
      <meta name="author" content="Andrew Kolos" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Andrew Kolos" />
      <meta property="og:description" content="Andrew Kolos' personal website." />
      <meta property="og:url" content="https://www.andrewkolos.com" />
      <meta property="og:image" content="https://www.andrewkolos.com/icons/icon-512x512.png" />
    </Helmet>
  )
}

const Layout: React.FunctionComponent<{ children: any }> = (props: { children: any }) => {
  const data = useStaticQuery<any>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div style={{ margin: 'auto' }}>
      <Meta />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `3rem auto`,
          maxWidth: 960,
        }}
      >
        <main>{props.children}</main>
      </div>
      <footer style={{
        marginTop: `3.45rem`
      }}>
        <hr />
        <SocialLinks />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
