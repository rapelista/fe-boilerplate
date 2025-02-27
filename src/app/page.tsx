import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { columns } from '~/components/(example)/users/columns';
import { DataTable } from '~/components/core/data-table';

export default function Page() {
  return (
    <Container my="md">
      <Stack>
        <Title order={3}>Hello World!</Title>

        <Text ta="justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, non
          et. Accusamus, molestiae laudantium veritatis maxime asperiores,
          suscipit possimus ex rerum perferendis officia totam voluptatibus
          ratione debitis ab ipsum eligendi?
        </Text>

        <Group>
          <Button>Click Me</Button>
        </Group>

        <DataTable context="users" columns={columns} />
      </Stack>
    </Container>
  );
}
