import { graphql, PageProps } from 'gatsby';
import React from 'react';
import AboutMe from '../components/about-me/about-me';
import BlogList from '../components/blog/blog-list/blog-list';
import Layout from '../layout/layout';

const IndexPage: React.FC<PageProps> = props => (
  <Layout pathName={props.location.pathname}>
    <AboutMe />
    <BlogList />
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage;
