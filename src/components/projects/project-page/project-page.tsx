import React from "react";
import Layout from "../../layout/layout"
import { ProjectDescriptor } from '../../../projects';
import { ProjectListing } from '../project-listing/project-listing';
import { PageProps } from 'gatsby';
import Styles from './project-page.module.scss';
import SharedStyles from '../../../../src/shared-styles.module.scss';

export interface Project extends ProjectDescriptor {
  description: string;
  topics: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectListProps {
  myLibraries: Project[];
  other: Project[];
  contributedTo: Project[];
}

const ProjectsPage: React.FC<PageProps<unknown, ProjectListProps>> = (data) => {

  const props = data.pageContext;
  return (
    <Layout>
      <div className={SharedStyles.card}>
        <h2 className={Styles.sectionHeading}>Libraries</h2>
        {listProjects(props.myLibraries)}
      </div>
      <div className={SharedStyles.card}>
        <h2 className={Styles.sectionHeading}>Other stuff</h2>
        {listProjects(props.other)}
      </div>
      <div className={SharedStyles.card}>
        <h2 className={Styles.sectionHeading}>OSS I have contributed to</h2>
        {listProjects(props.contributedTo)}
      </div>
    </Layout>
  );
}

const listProjects = (projects: Project[]) => projects.map((p, i) => {
  return (
    <ProjectListing {...p} key={p.name} />
  );
});

export default ProjectsPage;