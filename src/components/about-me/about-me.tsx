import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import Styles from './about-me.module.scss';

export const query = graphql`
  query {
    file(relativePath: { eq: "portrait.png" }) {
      childImageSharp {
        fixed(width: 128) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export const AboutMe: React.FC<unknown> = () => {
  const imgData = useStaticQuery(query);

  return (
    <div className={Styles.container}>
      <div className={Styles.portraitContainer}>
        <Img className={Styles.portrait} fixed={imgData.file?.childImageSharp?.fixed!} />
      </div>
      <p className={Styles.content}>
        Hello, I enjoy programming. I am most experienced in full-stack dev.
        I like to <strike>bikeshed</strike> think about application and code architecture/design.
        I also enjoy developing features for applications. Outside of programming, I spend most of
        my time playing videogames, particularly indie titles.
      </p>
    </div>
  );
};

export default AboutMe;

