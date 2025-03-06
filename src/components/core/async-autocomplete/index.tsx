import {
  Code,
  Combobox,
  ComboboxProps,
  Loader,
  Stack,
  TextInput,
  TextInputProps,
  useCombobox,
} from '@mantine/core';
import { useState } from 'react';
import { EntityType } from '~/types/core/entity';
import { useFetchPaginatedData } from '../hooks';

export interface AsyncAutocompleteProps<T>
  extends AsyncAutocompleteComponentProps,
    TextInputProps {
  context: string;
  valueKey?: keyof T;
  renderKey?: keyof T;

  /**
   * Make sure dev only.
   */
  debug?: boolean;
}

export interface AsyncAutocompleteComponentProps {
  comboboxProps?: ComboboxProps;
}

export function AsyncAutocomplete<
  T extends EntityType & Record<string, number | string>,
>({
  context,
  valueKey = 'id',
  renderKey = 'name',

  /**
   * Make sure dev only.
   */
  debug = false,

  /**
   * ComponentProps
   */
  comboboxProps,

  /**
   * TextInputProps.
   */
  ...props
}: AsyncAutocompleteProps<T>) {
  const [value, setValue] = useState<number | string | null>(null);
  const [search, setSearch] = useState('');

  const { data, isFetching } = useFetchPaginatedData<T>(
    context,
    { search },
    { enabled: value === null },
  );
  const loading = isFetching;
  const empty = data.length === 0;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = (data || []).map((item) => (
    <Combobox.Option value={item[valueKey].toString()} key={item[valueKey]}>
      {item[renderKey]}
    </Combobox.Option>
  ));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    setValue(null);

    combobox.resetSelectedOption();
    combobox.openDropdown();
  };

  const handleOptionSubmit = (optionValue: string) => {
    const option = data.find(
      (item: Record<string, number | string>) =>
        item[valueKey].toString() === optionValue,
    );

    if (option) {
      setValue(option[valueKey]);
      setSearch(option[renderKey].toString());
    }

    combobox.closeDropdown();
  };

  const renderCombobox = () => {
    return (
      <Combobox
        onOptionSubmit={handleOptionSubmit}
        withinPortal={false}
        store={combobox}
        {...comboboxProps}
      >
        <Combobox.Target>
          <TextInput
            value={search}
            onChange={handleChange}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
            {...props}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  };

  const renderDebug = () => {
    return <Code block>{JSON.stringify({ value }, null, 2)}</Code>;
  };

  return debug ? (
    <Stack>
      {renderCombobox()}
      {renderDebug()}
    </Stack>
  ) : (
    renderCombobox()
  );
}
