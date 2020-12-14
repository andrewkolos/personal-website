import React from 'react';
import Layout from '../components/layout/layout';
import Seo from '../components/seo';

const NotFoundPage: React.FC = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>Page not found ):</h1>
  </Layout>
);

export default NotFoundPage;
