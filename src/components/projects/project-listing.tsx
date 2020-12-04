import React from 'react';
import { ProjectDescriptor } from '../../projects';
import Styles from './project-listing.module.scss';

export interface ProjectListingProps extends ProjectDescriptor {
  url: string;
  description: string;
  topics: string[];
}

export const ProjectListing: React.FC<ProjectListingProps> = (data) => {

  console.log(data);
  return (
    <div className={Styles.container} key={data.name}>
      <a href={data.url}><h3 className={Styles.title}>{data.name}{" "}</h3></a>
      <p className={Styles.excerpt}>{data.description}</p>
    </div>
  );
}

export default ProjectListing;
