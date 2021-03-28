import { PageProps } from 'gatsby';
import React from 'react';
import Seo from '../components/seo';
import Layout from '../layout/layout';

interface Demo {
  name: string;
  description: string;
  urlName: string;
  keywords: string[];
}

const demos: Demos[] = [
  {
    name: 'Bastion Breach 3D',
    description: 'A 2-5 minute card game.',
    urlName: 'bastion-breach-3d',
    keywords: ['game', 'cards']
  }
]

const IndexPage: React.FC<PageProps> = props => (
  <Layout pathName={props.location.pathname}>
    <Seo description="Games and demos made by Andrew Kolos." keywords={['games', 'demos', 'portfolio']} />
    
  </Layout>
);

export default IndexPage;
