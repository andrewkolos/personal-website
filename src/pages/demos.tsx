import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React, { useEffect } from 'react';
import DemoList from '../components/demo/demo-list/demo-list';
import { DemoListingProps } from '../components/demo/demo-listing/demo-listing';
import Seo from '../components/seo';
import { embeddedDemos, noninteractiveDemos } from '../demos';
import Layout from '../layout/layout';
import SharedStyles from '../shared-styles.module.scss';

const DemosPage: React.FC<PageProps> = props => {
  const images = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(webp)/" }
          relativeDirectory: { eq: "demo-thumbs" }
        }
      ) {
        edges {
          node {
            id
            name
            childImageSharp {
              fixed(width: 423, height: 237, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `).allFile.edges.map((e: any) => [e.node.name, e.node.childImageSharp.fixed]);

  const imagesByName = new Map<string, FixedObject>(images);

  const embeddedDemoListings: DemoListingProps[] = embeddedDemos.map(d => {
    const thumbnail = getThumbnailObject(imagesByName, d.thumbnailName);
    return {
      demoUrl: d.demoUrl,
      name: d.name,
      repoUrl: d.repoUrl,
      description: d.description,
      thumbnail,
      urlName: d.urlName,
    };
  });

  useEffect(() => {
    embeddedDemoListings.forEach(edl => {
      fetch(edl.demoUrl, {
        mode: 'no-cors',
      }); // Hack to rehydrate any Heroku servers.
    });
  }, []);

  const noninteractiveDemoListings: DemoListingProps[] = noninteractiveDemos.map(
    d => {
      const thumbnail = getThumbnailObject(imagesByName, d.thumbnailName);
      return {
        demoUrl: d.demoUrl,
        name: d.name,
        repoUrl: d.repoUrl,
        description: d.description,
        thumbnail,
      };
    }
  );

  return (
    <Layout pathName={props.location.pathname}>
      <Seo
        description="Games and demos made by Andrew Kolos."
        keywords={['games', 'demos', 'portfolio']}
      />
      <div className={SharedStyles.card}>
        <h1>Games and demos</h1>
        Some games and other demos of things that I've made for fun that are
        still working.
        <DemoList demoInfo={embeddedDemoListings} />
      </div>
      <div className={SharedStyles.card}>
        <h1>Noninteractive demos</h1>
        Some other stuff I have that can be shown off with pictures.
        <DemoList demoInfo={noninteractiveDemoListings} />
      </div>
    </Layout>
  );
};

export default DemosPage;

function getThumbnailObject(
  imagesByName: Map<string, FixedObject>,
  thumbnailName: string
) {
  const thumbnail = imagesByName.get(thumbnailName);
  if (thumbnail == null) {
    throw Error(`No thumbnail found for demo: ${thumbnailName}`);
  }
  return thumbnail;
}
