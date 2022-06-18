import { objectPromiseAll } from '@akolos/object-promise-all'
import { Octokit } from '@octokit/rest'
import dedent from 'dedent'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/layout/layout'
import ProjectListing from '../components/projects/project-listing/project-listing'
import Seo from '../components/seo'
import { CollaborativeProject, PersonalProject, Project, ProjectBase } from '../lib/project'
import { contributedTo, libraryProjects, otherProjects, ProjectDescriptor } from '../lib/project-descriptors'
import SharedStyles from '../styles/shared-styles.module.scss'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

interface ProjectListProps {
  myLibraries: PersonalProject[]
  other: PersonalProject[]
  contributedTo: CollaborativeProject[]
}

export const getStaticProps: GetStaticProps<ProjectListProps> = async () => {
  const repos = await objectPromiseAll({
    myLibraries: libraryProjects.map((p) => getPersonalProjectInfo(p)),
    other: otherProjects.map((p) => getPersonalProjectInfo(p)),
    contributedTo: contributedTo.map((p) => getCollaborativeProjectInfo(p)),
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
        {listProjects(props.contributedTo.sort((a, b) => a.numberOfPrsOpenedByMe - b.numberOfPrsOpenedByMe))}
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

async function getProjectInfo(projectDescriptor: ProjectDescriptor): Promise<ProjectBase> {
  const { data: repoData } = await octokit.repos.get({
    owner: projectDescriptor.owner,
    repo: projectDescriptor.name,
  })

  const resultBase: ProjectBase = {
    owner: projectDescriptor.owner,
    name: projectDescriptor.name,
    url: repoData.html_url,
    topics: repoData.topics,
    description: repoData.description ?? undefined,
    createdAt: repoData.created_at,
    updatedAt: repoData.updated_at,
  }

  return resultBase
}

async function getPersonalProjectInfo(projectDescriptor: ProjectDescriptor): Promise<PersonalProject> {
  const projectInfo = await getProjectInfo(projectDescriptor)

  if (projectInfo.owner !== 'andrewkolos') {
    throw Error(dedent`Repo does not belong to me. ${projectDescriptor.owner}/${projectDescriptor.name}`)
  }

  return {
    ...projectInfo,
    owner: 'andrewkolos',
  }
}

async function getCollaborativeProjectInfo(projectDescriptor: ProjectDescriptor): Promise<CollaborativeProject> {
  const repoInfo = await getProjectInfo(projectDescriptor)

  // Note: this won't pull more than 100 results. Paging would be required to pull more.
  const numberOfPrsIMadeToThisRepo =
    (
      await octokit.search.issuesAndPullRequests({
        q: `repo:${projectDescriptor.owner}/${projectDescriptor.name} author:andrewkolos`,
      })
    ).data.total_count - 1

  const result: CollaborativeProject = {
    ...repoInfo,
    numberOfPrsOpenedByMe: numberOfPrsIMadeToThisRepo,
  }

  return result
}
