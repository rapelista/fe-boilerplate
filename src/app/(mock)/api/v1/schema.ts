import z from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().default(1),
  limit: z.coerce.number().int().default(10),
  search: z.string().nullish().default(null),
});

export type Pagination = z.infer<typeof paginationSchema>;
