import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import DemoList from '../components/demo/demo-list/demo-list';
import { DemoListingProps } from '../components/demo/demo-listing/demo-listing';
import Seo from '../components/seo';
import { demos } from '../demos';
import Layout from '../layout/layout';
import SharedStyles from "../shared-styles.module.scss";

const DemosPage: React.FC<PageProps> = props => {
  const images = useStaticQuery(graphql`query {
	allFile(filter: {
		extension: { regex: "/(jpg)|(png)|(webp)/"}
  	relativeDirectory: {
    eq: "demo-thumbs"
  	}
	}) {
  	edges {
    	node {
      	id
      	name
      	childImageSharp {
        	fixed(width: 423, quality: 100) {
            ...GatsbyImageSharpFixed
        	}
      	}
    	}
  	}
	}
}`).allFile.edges.map((e: any) => [e.node.name, e.node.childImageSharp.fixed]);

const imagesByName = new Map<string, FixedObject>(images);

const listings: DemoListingProps[] = demos.map((d) => {
  const thumbnail = imagesByName.get(d.thumbnailName);
  if (thumbnail == null) {
    throw Error(`No thumbnail found for demo: ${d.thumbnailName}`);
  }
  return {
    demoUrl: d.demoUrl,
    name: d.name,
    repoUrl: d.repoUrl,
    description: d.description,
    thumbnail,
    urlName: d.urlName
  };
});


  return (
    <Layout pathName={props.location.pathname}>
      <Seo description="Games and demos made by Andrew Kolos." keywords={['games', 'demos', 'portfolio']} />
      <div className={SharedStyles.card}>
        <h1>Games and Demos</h1>
        Some games and other demos of things that I've made for fun that are still working.
      <DemoList demoInfo={listings}/>
      </div>
    </Layout>
  )
};

export default DemosPage;
