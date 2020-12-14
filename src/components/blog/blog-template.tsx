import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../layout/layout";
import { DiscussionEmbed } from "disqus-react";
import Seo from "../seo";

import Styles from "./blog-template.module.scss";

const BlogTemplate: React.FunctionComponent<any> = (props) => {

  const { markdownRemark } = props.data;
  const { frontmatter, html, excerpt } = markdownRemark;

  const gatsbyName = process.env.GATSBY_DISQUS_NAME;

  if (!gatsbyName) {
    throw Error("Disqus name was empty/undefined.");
  }

  const disqusConfig = {
    shortname: gatsbyName,
    config: { identifier: frontmatter.slug, title: frontmatter.title },
  };

  return (
    <Layout pathName={props.location.pathname}>
      <Seo
        title={`${frontmatter.title} | Andrew Kolos`}
        description={excerpt}
      />
      <div className={Styles.blogPostContainer}>
        <div className={Styles.blogPost}>
          <h1 className={Styles.title}>{frontmatter.title}</h1>
          {frontmatter.subtitle && (
            <h2 className={Styles.subtitle}>{frontmatter.subtitle}</h2>
          )}
          <div className={Styles.date}>{frontmatter.date}</div>
          <div
            className={Styles.blogPostContent}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <DiscussionEmbed {...disqusConfig} />
        </div>
      </div>
    </Layout>
  );
};

export const mdPageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
      }
      excerpt(pruneLength: 280)
    }
  }
`;

export default BlogTemplate;
