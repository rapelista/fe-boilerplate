import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
  search: z.string().default(''),
});

export const usersParams = paginationSchema.extend({
  type: z.enum(['young', 'old']).optional(),
});
