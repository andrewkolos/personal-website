import { CreatePagesArgs } from 'gatsby';

interface Node {
  frontmatter: {
    title: string;
    slug: string;
  };
}

interface MarkDownQueryResult {
  allMdx: {
    edges: {
      node: Node;
    }[];
  };
}

export async function createBlogPages({ actions, graphql, reporter }: CreatePagesArgs): Promise<void> {
  const { createPage } = actions;
  const blogPostTemplate = require.resolve(`../src/components/blog/blog-template.tsx`);
  const result = await graphql<MarkDownQueryResult>(`
    query BlogIndex {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              slug
              subtitle
              date
            }
            excerpt(pruneLength: 280)
          }
        }
      }
    }`
  );
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  if (!result.data) {
    throw Error('Could not fetch blog posts on build.');
  }

  result.data.allMdx.edges.forEach(({ node }: { node: any; }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });
}
