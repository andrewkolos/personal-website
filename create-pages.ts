import { CreatePagesArgs, GatsbyNode } from 'gatsby';
import { contributedTo, libraryProjects, otherProjects, ProjectDescriptor } from './src/projects';
import { Octokit } from '@octokit/rest';
import { objectPromiseAll } from '@akolos/object-promise-all';
import { Project } from './src/components/projects/project-list';
const octokit = new Octokit({
  auth: process.env['GITHUB_TOKEN'],
});

export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([createBlogPages(params), createProjectsPage(params)]);
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

async function createBlogPages({ actions, graphql, reporter }: CreatePagesArgs) {
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

  result.data.allMarkdownRemark.edges.forEach(({ node }: { node: any }) => {
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


async function createProjectsPage({ actions }: CreatePagesArgs) {
  const projectList = require.resolve('./src/components/projects/project-list.tsx');

  const repos = await objectPromiseAll({
    myLibraries: libraryProjects.map(p => getProjectInfo(p)),
    other: otherProjects.map(p => getProjectInfo(p)),
    contributedTo: contributedTo.map(p => getProjectInfo(p)),
  });

  actions.createPage({
    path: '/projects',
    component: projectList,
    context: repos,
  });
}

export async function getProjectInfo(project: ProjectDescriptor): Promise<Project> {
  
  const data = (await octokit.repos.get({
    owner: project.owner,
    repo: project.name,
  })).data;

  return {
    name: project.name,
    owner: project.owner,
    url: data.html_url,
    topics: data.topics,
    description: data.description,
  };

}
