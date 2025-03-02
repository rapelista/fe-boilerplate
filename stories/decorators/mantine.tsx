import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function WithMantine({ children }: React.PropsWithChildren) {
  return (
    <MantineProvider>
      {children}
      <Notifications />
    </MantineProvider>
  );
}
