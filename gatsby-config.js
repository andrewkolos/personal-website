const path = require("path")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Andrew Kolos`,
    description: `Andrew Kolos' personal website. Andrew Kolos is a software developer.`,
    author: `@gatsbyjs`,
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
        path: `${__dirname}/src/blog-posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              colorTheme: "Dark+ (default dark)",
              injectStyles: true,
              extensions: [],
              extensionDataDirectory: path.resolve("extensions"),
              logLevel: "error",
            },
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
