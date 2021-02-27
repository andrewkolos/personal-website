import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../../layout/layout';
import { DiscussionEmbed } from 'disqus-react';
import Seo from '../seo';
import Styles from './blog-template.module.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from '../code-block/code-block';

const components = {
  pre: CodeBlock,
};

const BlogTemplate: React.FunctionComponent<any> = props => {
  const { mdx } = props.data;
  const { frontmatter, body, excerpt } = mdx;

  const gatsbyName = process.env.GATSBY_DISQUS_NAME;

  if (!gatsbyName) {
    throw Error('Disqus name was empty/undefined.');
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
          <div className={Styles.blogPostContent}>
            <MDXProvider components={components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </div>
          <DiscussionEmbed {...disqusConfig} />
        </div>
      </div>
    </Layout>
  );
};

export const mdPageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date
        slug
        title
        subtitle
      }
    }
  }
`;

export default BlogTemplate;
