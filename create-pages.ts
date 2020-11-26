import { CreatePagesArgs, GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([createBlogPages(params)]);
};

interface Node {
  frontmatter: {
    title: string;
    slug: string;
  };
}

interface MarkDownQueryResult {
  allMarkdownRemark: {
    edges: {
      node: Node;
    }[];
  };
}

async function createBlogPages({ actions, graphql, reporter}: CreatePagesArgs) {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/components/blog/blog-template.tsx`)
  const result = await graphql<MarkDownQueryResult>(`
    query BlogIndex {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  if (!result.data) {
    throw Error('Could not fetch blog posts on build.');
  }

  result.data.allMarkdownRemark.edges.forEach(({node}: { node: any }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  });
}

