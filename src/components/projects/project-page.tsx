import React from "react";
import Layout from "../layout/layout"
import { ProjectDescriptor } from '../../projects';
import { ProjectListing } from './project-listing';
import { PageProps } from 'gatsby';

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
      <h2>My own projects</h2>
      <h3>Libraries</h3>
      {listProjects(props.myLibraries)}
      <h3>Other stuff</h3>
      {listProjects(props.other)}
      <h2>OSS I have contributed to</h2>
      {listProjects(props.contributedTo)}
    </Layout>
  );
}

const listProjects = (projects: Project[]) => projects.map(p => <ProjectListing {...p} key={p.name} />);

export default ProjectsPage;
