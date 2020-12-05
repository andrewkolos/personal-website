import { graphql } from 'gatsby'
import React from "react"
import AboutMe from '../components/about-me/about-me'
import BlogListing from '../components/blog/blog-listing/blog-listing'
import Layout from "../components/layout/layout"

const IndexPage: React.FC<{}> = () => (
  <Layout>
    <AboutMe />
    <BlogListing />
  </Layout>
)

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
