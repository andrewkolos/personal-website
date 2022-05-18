import React from 'react'
import { objectPromiseAll } from '@akolos/object-promise-all'
import { Octokit } from '@octokit/rest'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import ProjectListing from '../components/projects/project-listing/project-listing'
import Seo from '../components/seo'
import Layout from '../components/layout/layout'
import { contributedTo, libraryProjects, otherProjects, ProjectDescriptor } from '../lib/projects'
import SharedStyles from '../styles/shared-styles.module.scss'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Project extends ProjectDescriptor {
  description?: string
  topics?: string[]
  url: string
  createdAt: string
  updatedAt: string
}

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

const listProjects = (projects: Project[]) => projects.map((p) => <ProjectListing {...p} key={p.name} />)

const Projects: React.FC<ProjectListProps> = (props) => {
  const router = useRouter()
  return (
    <Layout pathName={router.pathname}>
      <Seo description="A list of Andrew Kolos' personal/hobby software projects." />
      <div className={SharedStyles.card}>
        <h1>Libraries</h1>
        {listProjects(props.myLibraries)}
      </div>
      <div className={SharedStyles.card}>
        <h1>Other stuff</h1>
        {listProjects(props.other)}
      </div>
      <div className={SharedStyles.card}>
        <h1>OSS I have contributed to</h1>
        {listProjects(props.contributedTo)}
      </div>
    </Layout>
  )
}

export default Projects

async function getProjectInfo(project: ProjectDescriptor): Promise<Project> {
  const { data } = await octokit.repos.get({
    owner: project.owner,
    repo: project.name,
  })

  return {
    name: project.name,
    owner: project.owner,
    url: data.html_url,
    topics: data.topics,
    description: data.description ?? undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
