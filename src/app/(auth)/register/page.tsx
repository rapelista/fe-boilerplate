import {
  Button,
  Container,
  Group,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

export default function Page() {
  return (
    <Container py="xl">
      <Stack>
        <SimpleGrid cols={2}>
          <TextInput label="Email" placeholder="Email" />

          <DatePickerInput label="Periode" placeholder="Periode" type="range" />

          <Select
            data={['Person 1', 'Person 2']}
            label="Person"
            placeholder="Person"
          />
        </SimpleGrid>

        <Group>
          <Button>Register</Button>
        </Group>
      </Stack>
    </Container>
  );
}
