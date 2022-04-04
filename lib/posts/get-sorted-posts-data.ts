import fse from 'fs-extra'
import matter from 'gray-matter'
import path from 'path'
import { BlogPostData } from './blog-post-data'
import { postsDirectory } from './posts-directory'

export async function getSortedPostsData() {
  const fileNames = await fse.readdir(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx$/, '')

      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fse.readFile(fullPath, 'utf8')

      const matterResult = matter(fileContents)

      return BlogPostData.parse({
        id,
        ...matterResult.data,
        compiledSource: matterResult.content,
      })
    }),
  )

  return allPostsData.sort((a, b) => {
    const aDate = a.date
    const bDate = b.date

    if (aDate < bDate) {
      return 1
    }
    if (aDate > bDate) {
      return -1
    }
    return 0
  })
}
