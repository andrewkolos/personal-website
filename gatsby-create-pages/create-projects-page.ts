import { CreatePagesArgs } from 'gatsby';
import { contributedTo, libraryProjects, otherProjects, ProjectDescriptor } from '../src/projects';
import { Octokit } from '@octokit/rest';
import { objectPromiseAll } from '@akolos/object-promise-all';
import { Project } from '../src/components/projects/project-page/project-page';

const octokit = new Octokit({
  auth: process.env['GITHUB_TOKEN'],
});

export async function createProjectsPage({ actions }: CreatePagesArgs) {
  const projectList = require.resolve('../src/components/projects/project-page/project-page.tsx');

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

async function getProjectInfo(project: ProjectDescriptor): Promise<Project> {

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
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
