import { TextInput, TextInputProps } from '@mantine/core';
import { useDataTableContext } from './context';

export interface DataTableSearchProps
  extends Omit<TextInputProps, 'value' | 'onChange'> {}

export function DataTableSearch(props: DataTableSearchProps) {
  const { params, updateParam } = useDataTableContext();

  const currentSearch = String(params.search || '');
  const setSearch = (search: string) => updateParam('search', search);

  return (
    <TextInput
      value={currentSearch}
      onChange={(e) => setSearch(e.currentTarget.value)}
      {...props}
    />
  );
}
