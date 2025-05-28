import { z } from 'zod';

export const entitySchema = z.object({
  id: z.number(),
});

export type Entity = z.infer<typeof entitySchema>;
