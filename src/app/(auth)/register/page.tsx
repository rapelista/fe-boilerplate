import {
  Button,
  Container,
  Group,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

export default function Page() {
  return (
    <Container>
      <Stack>
        <TextInput label="Email" placeholder="Email" />

        <DatePickerInput label="Periode" placeholder="Periode" />

        <Select
          data={['Person 1', 'Person 2']}
          label="Person"
          placeholder="Person"
        />

        <Group>
          <Button>Register</Button>
        </Group>
      </Stack>
    </Container>
  );
}
