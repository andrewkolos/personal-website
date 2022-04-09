import fs from 'fs'
import { postsDirectory } from './posts-directory'

export function getAllPostsFileIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    params: {
      // TODO: make dependency on params name more explicit and intuitive.
      id: fileName.replace(/\.mdx$/, ''),
    },
  }))
}
