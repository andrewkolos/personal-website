const path = require('path')
const withPWA = require('next-pwa')

require('dotenv').config()

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  ...withMDX({
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    sassOptions: {
      includePaths: [path.join(__dirname)],
    },
    eslint: { // TODO: Remove this.
      ignoreDuringBuilds: true
    },
  })
})
