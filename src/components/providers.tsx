'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { theme } from '~/libs/mantine';
import { getQueryClient } from '~/libs/query';

export interface ProvidersProps extends React.PropsWithChildren {
  withQueryDevtools?: boolean;
}

export function Providers({
  children,
  withQueryDevtools = true,
}: ProvidersProps) {
  const client = getQueryClient();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={client}>
        {children}

        {withQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>

      <Notifications />
    </MantineProvider>
  );
}
