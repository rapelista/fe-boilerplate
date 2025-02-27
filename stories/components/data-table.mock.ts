import { http, HttpResponse } from 'msw';
import { paginationSchema } from '../utils/validation';

import { faker } from '~/utils/faker';

const users = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  age: faker.number.int({ min: 17, max: 100 }),
}));

export const DATA_TABLE_MOCK = http.get(
  'http://localhost:3000/api/v1/users',
  ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    const { data: validated, error } = paginationSchema.safeParse(params);

    if (error) {
      return HttpResponse.json({ error: error.errors });
    }

    const { page, limit, search } = validated;

    const data = users
      .filter((user) => {
        if (!search) return true;
        return user.name.toLowerCase().includes(search.toLowerCase());
      })
      .slice((page - 1) * limit, page * limit);

    const totalPage = Math.ceil(users.length / limit);
    const totalData = users.length;
    const meta = { page, totalPage, totalData };

    return HttpResponse.json({ data, meta });
  },
);
