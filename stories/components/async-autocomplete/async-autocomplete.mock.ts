import { http, HttpResponse } from 'msw';

import { delay } from '~/utils/core/misc';

import { PRODUCTS } from '../../utils/data';
import { paginationSchema } from '../../utils/validation';

export const ASYNC_AUTOCOMPLETE_MOCK = http.get(
  'http://localhost:3000/api/v1/products',
  async ({ request }) => {
    await delay();

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    const { data: validated, error } = paginationSchema.safeParse(params);

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

    const { page, limit, search } = validated;

    const products = PRODUCTS.reverse();

    const filteredData = products.filter((product) => {
      if (!search) return true;

      return product.name.toLowerCase().includes(search.toLowerCase());
    });

    const data = filteredData.slice((page - 1) * limit, page * limit);

    const totalPage = Math.ceil(filteredData.length / limit);
    const totalData = filteredData.length;
    const meta = { page, totalPage, totalData };

    return HttpResponse.json({ data, meta });
  },
);
