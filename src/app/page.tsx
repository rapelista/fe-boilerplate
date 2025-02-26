import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';

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
      </Stack>
    </Container>
  );
}
