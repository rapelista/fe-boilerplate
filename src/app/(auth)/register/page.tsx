import {
  Box,
  Button,
  Container,
  FileInput,
  Group,
  InputLabel,
  MultiSelect,
  NumberInput,
  PinInput,
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

          <TextInput label="Phone" placeholder="Phone" type="tel" />

          <DatePickerInput
            allowSingleDateInRange
            label="Periode"
            placeholder="Periode"
            type="range"
          />

          <Select
            data={['Person 1', 'Person 2']}
            label="Person"
            placeholder="Person"
          />

          <MultiSelect
            data={['Person 1', 'Person 2']}
            label="Persons"
            placeholder="Persons"
          />

          <NumberInput
            decimalSeparator=","
            label="Salary"
            placeholder="Salary"
            prefix="Rp "
            thousandSeparator="."
          />

          <Box>
            <InputLabel>Pin</InputLabel>
            <PinInput />
          </Box>

          <FileInput label="Document" placeholder="Document" />
        </SimpleGrid>

        <Group>
          <Button>Register</Button>
        </Group>
      </Stack>
    </Container>
  );
}
