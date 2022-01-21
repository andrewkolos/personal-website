import { PageProps } from 'gatsby';
import React from 'react';
import * as SharedStyles from '../../../../src/shared-styles.module.scss';
import Layout from '../../../layout/layout';
import { ProjectDescriptor } from '../../../projects';
import Seo from '../../seo';
import { ProjectListing } from '../project-listing/project-listing';

export interface Project extends ProjectDescriptor {
  description?: string;
  topics?: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectListProps {
  myLibraries: Project[];
  other: Project[];
  contributedTo: Project[];
}

const ProjectsPage: React.FC<PageProps<unknown, ProjectListProps>> = data => {
  const props = data.pageContext;
  return (
    <Layout pathName={data.location.pathname}>
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
  );
};

const listProjects = (projects: Project[]) =>
  projects.map((p) => {
    return <ProjectListing {...p} key={p.name} />;
  });

export default ProjectsPage;
