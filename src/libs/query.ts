'use client';

import { isServer, QueryClient } from '@tanstack/react-query';

import { ParamsType } from '~/types/core/uri';
import { request } from '~/utils/core/request';
import { generateUrl } from '~/utils/core/uri';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        queryFn: async ({ queryKey, signal }) => {
          const [context, params, withAuth] = queryKey as [
            string,
            ParamsType | undefined,
            boolean | undefined,
          ];

          return await request(generateUrl(context, params), {
            signal,
            withAuth: typeof withAuth === 'boolean' ? withAuth : true,
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
