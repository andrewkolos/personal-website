import { PageProps } from 'gatsby';
import React from 'react';
import AboutMe from '../components/about-me/about-me';
import BlogList from '../components/blog/blog-list/blog-list';
import Layout from '../layout/layout';

const IndexPage: React.FC<PageProps> = props => (
  <Layout pathName={props.location.pathname}>
    <AboutMe />
    <BlogList />
  </Layout>
);

export default IndexPage;
