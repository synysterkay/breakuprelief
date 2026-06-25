import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.string(),
    seoSlug: z.string(),
    category: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
  }),
});

export const collections = { blog };
