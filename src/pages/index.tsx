import { graphql } from 'gatsby'
import React from "react"
import BlogListing from '../components/blog/blog-listing/blog-listing'
import Layout from "../components/layout"

const IndexPage = ({data}: { data: any }) => (
  <Layout>
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
