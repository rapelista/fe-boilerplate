'use client';

import { isServer, QueryClient } from '@tanstack/react-query';
import { request } from './core/request';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        queryFn: async ({ queryKey }) => {
          const [context] = queryKey as [string];
          return await request(process.env.NEXT_PUBLIC_API_URL + context);
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
