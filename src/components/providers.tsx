'use client';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from '~/utils/mantine';
import { getQueryClient } from '~/utils/query';

export interface ProvidersProps extends React.PropsWithChildren {
  withQueryDevtools?: boolean;
}

export function Providers({
  withQueryDevtools = true,
  children,
}: ProvidersProps) {
  const client = getQueryClient();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={client}>
        {children}

        {withQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </MantineProvider>
  );
}
