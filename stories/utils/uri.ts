import { ParamsType } from '~/types/core/uri';
import { generateParams } from '~/utils/core/uri';

export function generateUrl(context: string, params?: ParamsType): string {
  const url = new URL('http://localhost:3000/api/v1/');

  url.pathname = url.pathname + '/' + context;
  url.pathname = url.pathname.replace(/\/+/g, '/');

  if (params) {
    url.search = generateParams(params);
  }

  return url.toString();
}
