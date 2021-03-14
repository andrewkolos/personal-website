import React from 'react';
import { ProjectDescriptor } from '../../../projects';
import Styles from './project-listing.module.scss';

export interface ProjectListingProps extends ProjectDescriptor {
  url: string;
  description: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
}

export const ProjectListing: React.FC<ProjectListingProps> = data => {
  return (
    <div className={Styles.container} key={data.name}>
      <a href={data.url} className={Styles.titleLink}>
        <h2 className={Styles.title}>{data.name} </h2>
      </a>
      <p>
        Last updated: {formatMMDDYYYY(new Date(data.updatedAt))}. Created:{' '}
        {formatMMDDYYYY(new Date(data.createdAt))}.
      </p>
      <p className={Styles.remarks}>{data.description}</p>
      {data.owner !== 'andrewkolos' && (
        <p>
          <a
            aria-label={`Andrew Kolos' pull requests for ${data.name}`}
            href={`https://github.com/${data.owner}/${data.name}/pulls?q=author%3Aandrewkolos`}
          >
            Pull Requests
          </a>
        </p>
      )}
    </div>
  );
};

export default ProjectListing;

function formatMMDDYYYY(date: Date): string {
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}
