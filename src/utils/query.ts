'use client';

import { isServer, QueryClient } from '@tanstack/react-query';
import { ParamsType } from '~/types/core/uri';
import { request } from './core/request';
import { generateUrl } from './core/uri';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        queryFn: async ({ queryKey, signal }) => {
          const [context, params] = queryKey as [
            string,
            ParamsType | undefined,
          ];

          return await request(generateUrl(context, params), {
            signal,
            withAuth: true,
          });
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
