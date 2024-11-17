import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(10),
  published: z.boolean().default(false),
  authorId: z.number(),
});
