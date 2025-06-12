import {
  Box,
  FileInput,
  InputLabel,
  MultiSelect,
  NumberInput,
  PinInput,
  Select,
  SimpleGrid,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import { PhoneNumberInput } from '~/components/core/phone-number';

export function SampleInputComponent() {
  return (
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

      <PhoneNumberInput label="Phone Number" />
    </SimpleGrid>
  );
}
