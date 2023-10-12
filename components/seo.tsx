import React from 'react'
import { Helmet } from 'react-helmet'
import { defaultSiteMetadata } from '../lib/default-site-metadata'
// import portrait from '../public/portrait.jpg'

export interface SeoProps {
  description?: string
  lang?: string
  meta?: Array<
    | {
        property: string
        content: string
      }
    | {
        name: string
        content: string
      }
  >
  title?: string
  // ogImageSrc?: string
  pathName?: string
  keywords?: string[]
}

function Seo({ description, lang, meta, title, pathName, keywords }: SeoProps): React.ReactElement {
  const coalescedLang = lang ?? 'en'
  const metaDescription = description ?? defaultSiteMetadata.description
  const coalescedTitle = title ?? defaultSiteMetadata.title
  const coalescedMeta = meta ?? []
  // const coalescedImage = ogImageSrc ?? portrait.src

  const currentUrl = `${defaultSiteMetadata.siteUrl}${pathName}`
  if (pathName) {
    coalescedMeta.push({
      property: 'og:url',
      content: currentUrl,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: coalescedLang,
      }}
      title={coalescedTitle}
      meta={[
        {
          name: 'author',
          content: 'Andrew Kolos',
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: `andrew kolos, software, developer${keywords ? `, ${keywords?.join(', ')}` : ''}`,
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
        // {
        //   property: 'og:image',
        //   content: defaultSiteMetadata.siteUrl + coalescedImage,
        // },
        {
          property: 'og:url',
          content: currentUrl,
        },
        {
          name: `twitter:card`,
          content: `Personal website of Andrew Kolos.`,
        },
        {
          name: `twitter:creator`,
          content: defaultSiteMetadata.author,
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
    >
      {pathName && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  )
}

Seo.defaultProps = {
  description: undefined,
  lang: undefined,
  meta: undefined,
  title: undefined,
  // ogImageSrc: undefined,
  pathName: undefined,
  keywords: undefined,
}

export default Seo
