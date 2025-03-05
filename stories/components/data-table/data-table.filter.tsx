import { Group, Select } from '@mantine/core';
import { useDataTableContext } from '~/components/core/data-table/context';

const data = [
  { label: 'All', value: '' },
  { label: 'Young', value: 'young' },
  { label: 'Old', value: 'old' },
  { label: '[Invalid Type]', value: 'anything' },
];

function FilterByType() {
  const { updateParam, params } = useDataTableContext();

  const value = String(params.type || '');
  const handleChange = (value: string | null) => {
    if (value != null) {
      updateParam('type', value);
    }
  };

  return (
    <Select
      allowDeselect={false}
      data={data}
      value={value}
      onChange={handleChange}
    />
  );
}

export function DataTableFilter() {
  return (
    <Group justify="end" w="100%">
      <FilterByType />
    </Group>
  );
}
