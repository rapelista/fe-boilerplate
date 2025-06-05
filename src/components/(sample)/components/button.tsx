import { Button, Group } from '@mantine/core';

export function SampleButtonComponent() {
  return (
    <Group>
      <Button>Register</Button>
      <Button data-freeze="true">Freeze</Button>
    </Group>
  );
}
