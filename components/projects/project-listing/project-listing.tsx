import React from 'react'
import { z } from 'zod'
import { CollaborativeProject, Project } from '../../../lib/project'
import Styles from './project-listing.module.scss'

export interface ProjectListingProps {
  project: Project
}

const ProjectListing: React.FC<ProjectListingProps> = ({ project }) => (
  <div className={Styles.container} key={project.name}>
    <a href={project.url} className={Styles.titleLink}>
      <h2 className={Styles.title}>{project.name} </h2>
    </a>
    <p>
      Last updated: {formatMMDDYYYY(new Date(project.updatedAt))}. Created:{' '}
      {formatMMDDYYYY(new Date(project.createdAt))}.
    </p>
    <p>{project.description}</p>
    {project.owner !== 'andrewkolos' && (
      <p>
        <a
          aria-label={`Andrew Kolos' pull requests for ${project.name}`}
          href={`https://github.com/${project.owner}/${project.name}/pulls?q=author%3Aandrewkolos`}
        >
          Pull Requests {`(${z.number().parse((project as CollaborativeProject).numberOfPrsOpenedByMe)})`}
        </a>
      </p>
    )}
  </div>
)

export default ProjectListing

function formatMMDDYYYY(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
