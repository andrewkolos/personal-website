import { z } from 'zod'

export const BlogPostData = z
  .object({
    id: z.string().nonempty(),
    title: z.string().nonempty(),
    subtitle: z.string().nonempty().optional(),
    excerpt: z.string().nonempty(),
    date: z.string().nonempty(),
    compiledSource: z.string().nonempty(),
    tags: z.array(z.string()),
  })

export type BlogPostData = z.infer<typeof BlogPostData>
