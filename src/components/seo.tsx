/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export interface SeoProps {
  description?: string;
  lang?: string;
  meta?: Array<{
    property: string;
    content: string;
  } | {
    name: string;
    content: string;
  }>;
  title?: string;
  ogImageSrc?: string;
}

function Seo({ description, lang, meta, title, ogImageSrc }: SeoProps): React.ReactElement {


  const { site, file} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        file(relativePath: { eq: "portrait.jpg" }) {
          childImageSharp {
            fixed(quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  const coalescedLang = lang ?? 'en';
  const metaDescription = description ?? site.siteMetadata.description;
  const coalescedTitle = title ?? site.siteMetadata.title;
  const coalescedMeta = meta ?? [];
  const coalescedImage = ogImageSrc ?? file.childImageSharp.fixed.src;

  return (
    <Helmet
      htmlAttributes={{
        lang: coalescedLang,
      }}
      title={title}
      meta={[
        {
          name: "author",
          content: "Andrew Kolos",
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: coalescedTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:image",
          content: coalescedImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(coalescedMeta)}
    />
  )
}

export default Seo;
