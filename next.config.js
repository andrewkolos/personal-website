const path = require('path')

require('dotenv').config()

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

module.exports = {
  ...withMDX({
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    sassOptions: {
      includePaths: [path.join(__dirname)],
    },
  }),
  async redirects() {
    return [
      {
        source: '/art',
        destination: '/art/gallery',
        permanent: true,
      },
    ]
  },
}
