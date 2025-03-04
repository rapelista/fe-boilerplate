import { Button, Code, Group, Stack, Title } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { EntityType } from '~/types/core/entity';

export function UserModal({ id, innerProps }: ContextModalProps) {
  return (
    <Stack>
      <Title order={4}>This is user modal</Title>

      <Code block>{JSON.stringify(innerProps, null, 2)}</Code>

      <Group>
        <Button
          onClick={() => {
            modals.close(id);
          }}
        >
          Close
        </Button>
      </Group>
    </Stack>
  );
}

export function UserViewModal({
  id,
  innerProps,
}: ContextModalProps<{
  row: EntityType & {
    name: string;
    age: string;
  };
}>) {
  return (
    <Stack>
      <Title order={4}>This is user view modal</Title>

      <Code block>{JSON.stringify(innerProps, null, 2)}</Code>

      <Group>
        <Button
          onClick={() => {
            modals.close(id);
          }}
        >
          Close
        </Button>
      </Group>
    </Stack>
  );
}
