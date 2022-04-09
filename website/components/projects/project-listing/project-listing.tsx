import React from 'react'
import { ProjectDescriptor } from '../../../lib/projects'
import Styles from './project-listing.module.scss'

export interface ProjectListingProps extends ProjectDescriptor {
  url: string
  description?: string
  createdAt: string
  updatedAt: string
}

const ProjectListing: React.FC<ProjectListingProps> = ({ url, description, createdAt, updatedAt, name, owner }) => (
  <div className={Styles.container} key={name}>
    <a href={url} className={Styles.titleLink}>
      <h2 className={Styles.title}>{name} </h2>
    </a>
    <p>
      Last updated: {formatMMDDYYYY(new Date(updatedAt))}. Created: {formatMMDDYYYY(new Date(createdAt))}.
    </p>
    <p>{description}</p>
    {owner !== 'andrewkolos' && (
      <p>
        <a
          aria-label={`Andrew Kolos' pull requests for ${name}`}
          href={`https://github.com/${owner}/${name}/pulls?q=author%3Aandrewkolos`}
        >
          Pull Requests
        </a>
      </p>
    )}
  </div>
)

export default ProjectListing

ProjectListing.defaultProps = {
  description: undefined,
}

function formatMMDDYYYY(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
