import { http, HttpResponse } from 'msw';
import { delay } from '~/utils/core/misc';
import { USERS } from '../../utils/data';
import { usersParams } from '../../utils/validation';

const url = 'http://localhost:3000/api/v1/users';

export const DATA_TABLE_ERROR_MOCK = http.get(url, async () => {
  await delay();

  const errors = [
    {
      code: 'not_authenticated',
      detail: 'Authentication credentials not provided.',
      attr: null,
    },
  ];

  return HttpResponse.json(
    {
      timestamp: new Date().toISOString(),
      type: 'client_error',
      errors,
    },
    { status: 401 },
  );
});

export const DATA_TABLE_MOCK = http.get(url, async ({ request }) => {
  await delay();

  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  const { data: validated, error } = usersParams.safeParse(params);

  if (error) {
    return HttpResponse.json(
      {
        type: 'client_error',
        errors: error.errors.map((error) => ({
          detail: error.message,
          attr: error.path.join(','),
          code: error.code,
        })),
        timestamp: new Date().toISOString(),
      },
      {
        status: 400,
      },
    );
  }

  const { page, limit, search, type } = validated;

  const users = USERS.reverse();

  const filteredData = users
    .filter((user) => {
      if (!search) return true;
      return user.name.toLowerCase().includes(search.toLowerCase());
    })
    .filter((user) => {
      if (type === 'young') return user.age < 30;
      if (type === 'old') return user.age >= 30;
      return true;
    });

  const data = filteredData.slice((page - 1) * limit, page * limit);

  const totalPage = Math.ceil(filteredData.length / limit);
  const totalData = filteredData.length;
  const meta = { page, totalPage, totalData };

  return HttpResponse.json({ data, meta });
});
