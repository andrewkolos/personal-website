import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import Styles from './about-me.module.scss';

export const query = graphql`
  query {
    file(relativePath: { eq: "portrait.jpg" }) {
      childImageSharp {
        fixed(width: 128, quality: 100) {
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
      <h1>About me</h1>
      <div className={Styles.portraitContainer}>
        <Img
          className={Styles.portrait}
          fixed={imgData.file.childImageSharp.fixed}
          alt="Portrait of Andrew Kolos"
        />
      </div>
      <p className={Styles.content}>
        Hello, I enjoy programming and am most experienced in full-stack web
        dev. I like to <strike>bikeshed</strike> think about application and
        code architecture/design. I also enjoy developing features for
        applications. When I'm not programming or reading about it, I spend most
        of my time playing videogames, particularly one-player indie titles or
        co-op games.
      </p>
    </div>
  );
};

export default AboutMe;
