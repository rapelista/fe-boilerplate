import {
  CheckIcon,
  CloseButton,
  Code,
  Combobox,
  ComboboxProps,
  Group,
  Loader,
  Stack,
  TextInput,
  TextInputProps,
  useCombobox,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { EntityType } from '~/types/core/entity';
import { useFetchPaginatedData } from '../hooks';

export interface AsyncAutocompleteProps<V, T>
  extends AsyncAutocompleteComponentProps,
    Omit<TextInputProps, 'defaultValue'> {
  context: string;
  valueKey?: keyof T;
  renderKey?: keyof T;

  defaultRender?: string;
  defaultValue?: V;

  withAuth?: boolean;
  clearable?: boolean;

  /**
   * Make sure dev only.
   */
  debug?: boolean;
}

export interface AsyncAutocompleteComponentProps {
  comboboxProps?: ComboboxProps;
}

export function AsyncAutocomplete<
  V extends number | string | null,
  T extends EntityType & Record<string, V>,
>({
  context,
  valueKey = 'id',
  renderKey = 'name',

  defaultRender,
  defaultValue,

  withAuth,
  clearable = false,

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
  rightSection,
  ...props
}: AsyncAutocompleteProps<V, T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<V | null>(defaultValue || null);
  const [search, setSearch] = useState(defaultRender || '');

  const enabled = !!defaultRender || value === null;

  const { data, isFetching } = useFetchPaginatedData<T>(
    context,
    { search },
    { enabled, withAuth },
  );

  const loading = isFetching;
  const empty = data.length === 0;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = (data || []).map((item) => {
    const itemValue = String(item[valueKey]);
    const itemRender = item[renderKey];

    return (
      <Combobox.Option
        key={itemValue}
        value={itemValue}
        active={itemValue === String(value)}
      >
        <Group gap="xs">
          {itemValue === String(value) && <CheckIcon size={12} />}
          <span>{itemRender}</span>
        </Group>
      </Combobox.Option>
    );
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    setValue(null);

    combobox.resetSelectedOption();
    combobox.openDropdown();
  };

  const handleOptionSubmit = (optionValue: string) => {
    const option = data.find(
      (item: Record<string, V>) => item[valueKey]?.toString() === optionValue,
    );

    if (option) {
      setValue(option[valueKey]);
      setSearch(String(option[renderKey]));
    }

    combobox.closeDropdown();
  };

  const handleReset = () => {
    setValue(null);
    setSearch('');
    inputRef.current?.focus();
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
            ref={inputRef}
            value={search}
            onChange={handleChange}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={
              loading ? (
                <Loader size={18} />
              ) : clearable ? (
                <CloseButton
                  variant="transparent"
                  onClick={handleReset}
                  display={value ? undefined : 'none'}
                />
              ) : (
                rightSection
              )
            }
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
