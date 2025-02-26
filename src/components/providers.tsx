'use client';

import { MantineProvider } from '@mantine/core';
import { theme } from '~/utils/mantine';

export function Providers({ children }: React.PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
