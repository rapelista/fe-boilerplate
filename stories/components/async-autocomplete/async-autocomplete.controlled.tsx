import { Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { AsyncAutocomplete } from '~/components/core/async-autocomplete';

export function AsyncAutocompleteControlled() {
  const [value, setValue] = useState<number | null>(101);
  const [searchValue, setSearchValue] = useState<string>('Buku');

  return (
    <Stack>
      <AsyncAutocomplete
        label="Product"
        placeholder="Search for a product..."
        context="products"
        value={value}
        onValueChange={setValue}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        clearable
      />

      <Text fz="sm">value: {JSON.stringify(value)}</Text>
      <Text fz="sm">searchValue: {JSON.stringify(searchValue)}</Text>
    </Stack>
  );
}
