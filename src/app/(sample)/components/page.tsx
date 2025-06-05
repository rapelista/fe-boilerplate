import { Container, Divider, Stack, Title } from '@mantine/core';

import { SampleButtonComponent } from '~/components/(sample)/components/button';
import { SampleInputComponent } from '~/components/(sample)/components/input';
import { SampleModalComponent } from '~/components/(sample)/components/modal';

export default function Page() {
  return (
    <Container py="xl">
      <Stack>
        <Title>Input</Title>

        <SampleInputComponent />

        <Divider />

        <Title>Buttons</Title>

        <SampleButtonComponent />

        <Divider />

        <Title>Modals</Title>

        <SampleModalComponent />
      </Stack>
    </Container>
  );
}
