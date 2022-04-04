import fse from 'fs-extra'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { BlogPostData } from './blog-post-data'
import { postsDirectory } from './posts-directory'

export async function getPostData(id: string): Promise<BlogPostData> {
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const fileContents = await fse.readFile(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  return BlogPostData.parse({
    id,
    ...matterResult.data,
    compiledSource: ((await serialize(matterResult.content)).compiledSource),
  })
}
