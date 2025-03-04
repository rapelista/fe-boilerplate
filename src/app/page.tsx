import { Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export default function Page() {
  return (
    <Container my="xl">
      <Stack>
        <Title>Boilerplate NextJS v15</Title>

        <Text
          component={Link}
          href="https://github.com/developergamatecha/frontend-boilerplate?tab=readme-ov-file#boilerplate-v15"
          c="primary"
          fw={600}
          td="underline"
          style={{ textUnderlineOffset: 2 }}
        >
          Read Documentation
        </Text>
      </Stack>
    </Container>
  );
}
