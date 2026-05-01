import { defineCollection, z } from 'astro:content'

// We will load markdown/mdx from the repo's ../content folder (synced from your Obsidian vault).
// This schema is intentionally permissive: frontmatter is optional.
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }).passthrough(),
})

export const collections = { notes }
