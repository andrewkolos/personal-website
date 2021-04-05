const path = require("path")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Andrew Kolos`,
    description: `Andrew Kolos is a software developer.`,
    author: `Andrew Kolos`,
    siteUrl: 'https://andrewkolos.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Andrew Kolos' Website",
        short_name: `A. Kolos' Site`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    "gatsby-transformer-typescript-css-modules",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/src/data/blog-posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        name: 'readinglist',
        path: './src/data'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
            }
          },
          'gatsby-remark-copy-linked-files',
        ]
      },
    },
    'gatsby-plugin-mdx-prismjs',
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
        ]
      }
    }
  ],
}
