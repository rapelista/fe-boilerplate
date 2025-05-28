import { Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export default function Page() {
  return (
    <Container my="xl">
      <Stack>
        <Title>Boilerplate NextJS v15</Title>

        <Text
          c="primary"
          component={Link}
          fw={600}
          href="https://github.com/developergamatecha/frontend-boilerplate?tab=readme-ov-file#boilerplate-v15"
          style={{ textUnderlineOffset: 2 }}
          td="underline"
        >
          Read Documentation
        </Text>
      </Stack>
    </Container>
  );
}
