import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { theme } from '~/utils/mantine';

export function WithMantine({ children }: React.PropsWithChildren) {
  return (
    <MantineProvider theme={theme}>
      {children}
      <Notifications />
    </MantineProvider>
  );
}
