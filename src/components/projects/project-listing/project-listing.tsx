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

export const ProjectListing: React.FC<ProjectListingProps> = (data) => {

  console.log('data', data);
  return (
    <div className={Styles.container} key={data.name}>
      <a href={data.url} className={Styles.titleLink}><h3 className={Styles.title}>{data.name}{" "}</h3></a>
      <p>Last updated: {formatMMDDYYYY(new Date(data.updatedAt))}. Created: {formatMMDDYYYY(new Date(data.createdAt))}.</p>
      <p className={Styles.remarks}>{data.description}</p>
    </div>
  );
}

export default ProjectListing;

function formatMMDDYYYY(date: Date): string {
  return (date.getMonth() + 1) +
    "/" + date.getDate() +
    "/" + date.getFullYear();
}
