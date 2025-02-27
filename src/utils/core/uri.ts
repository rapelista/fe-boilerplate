import { ParamsType } from '~/types/core/uri';

export function generateUrl(context: string, params?: ParamsType): string {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL!);

  url.pathname = url.pathname + '/' + context;
  url.pathname = url.pathname.replace(/\/+/g, '/');

  if (params) {
    url.search = generateParams(params);
  }

  return url.toString();
}

export function generateParams(params: ParamsType): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value || typeof value === 'boolean') {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          searchParams.append(key, String(value));
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
}
