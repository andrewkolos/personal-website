/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from '../components/header/header';
import './layout.css';
import { SocialLinks } from './social-links/social-links';
import Seo from '../components/seo';

interface LayoutProps {
  children: any;
  pathName: string;
}

const Layout: React.FC<LayoutProps> = props => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div style={{ margin: 'auto' }}>
      <Seo pathName={props.pathName} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `2rem auto`,
          maxWidth: 960,
        }}
      >
        <main>{props.children}</main>
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
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
