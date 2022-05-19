import React from 'react'
import { objectPromiseAll } from '@akolos/object-promise-all'
import { Octokit } from '@octokit/rest'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import ProjectListing from '../components/projects/project-listing/project-listing'
import Seo from '../components/seo'
import Layout from '../components/layout/layout'
import { contributedTo, libraryProjects, otherProjects, ProjectDescriptor } from '../lib/project-descriptors'
import SharedStyles from '../styles/shared-styles.module.scss'
import { Project, ProjectBase, PersonalProject, CollaborativeProject } from '../lib/project'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

interface ProjectListProps {
  myLibraries: Project[]
  other: Project[]
  contributedTo: Project[]
}

export const getStaticProps: GetStaticProps<ProjectListProps> = async () => {
  const repos = await objectPromiseAll({
    myLibraries: libraryProjects.map((p) => getProjectInfo(p)),
    other: otherProjects.map((p) => getProjectInfo(p)),
    contributedTo: contributedTo.map((p) => getProjectInfo(p)),
  })

  return {
    props: repos,
  }
}

const listProjects = (projects: Project[]) => projects.map((p) => <ProjectListing project={p} key={p.name} />)

const Projects: React.FC<ProjectListProps> = (props) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname}>
      <Seo description="A list of Andrew Kolos' personal/hobby software projects." />
      <div className={SharedStyles.card}>
        <h1>OSS I have contributed to</h1>
        {listProjects(props.contributedTo)}
      </div>
      <div className={SharedStyles.card}>
        <h1>Libraries</h1>
        {listProjects(props.myLibraries)}
      </div>
      <div className={SharedStyles.card}>
        <h1>Other stuff</h1>
        {listProjects(props.other)}
      </div>
    </Layout>
  )
}

export default Projects

async function getProjectInfo(project: ProjectDescriptor): Promise<Project> {
  const { data: repoData } = await octokit.repos.get({
    owner: project.owner,
    repo: project.name,
  })

  const resultBase: ProjectBase = {
    owner: project.owner,
    name: project.name,
    url: repoData.html_url,
    topics: repoData.topics,
    description: repoData.description ?? undefined,
    createdAt: repoData.created_at,
    updatedAt: repoData.updated_at,
  }

  if (resultBase.owner === 'andrewkolos') {
    return resultBase as PersonalProject
  }

  // Note: this won't pull more than 100 results. Paging would be required to pull more.
  const numberOfPrsIMadeToThisRepo =
    (
      await octokit.search.issuesAndPullRequests({
        q: `repo:${project.owner}/${project.name} author:andrewkolos`,
      })
    ).data.total_count - 1

  const result: CollaborativeProject = {
    ...resultBase,
    numberOfPrsOpenedByMe: numberOfPrsIMadeToThisRepo,
  }

  return result
}
