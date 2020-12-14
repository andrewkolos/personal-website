import { PageProps } from 'gatsby';
import React from 'react';
import Layout from '../layout/layout';
import Seo from '../components/seo';

const NotFoundPage: React.FC<PageProps> = (props: PageProps) => (
  <Layout pathName={props.location.pathname}>
    <Seo title="404: Not found" />
    <h1>Page not found ):</h1>
  </Layout>
);

export default NotFoundPage;
