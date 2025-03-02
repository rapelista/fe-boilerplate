import { Select, SelectProps } from '@mantine/core';
import { defaultLimitOptions } from '~/utils/core/data-table';
import { useDataTableContext } from './context';

export interface DataTableLimitationProps
  extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {
  customLimitOptions?: number[];
}

export function DataTableLimitation({
  customLimitOptions,
  ...props
}: DataTableLimitationProps) {
  const { params, updateParam } = useDataTableContext();

  const currentLimit = String(params.limit);
  const setLimit = (limit: null | string) => {
    if (limit) {
      const numericLimit = Number(limit);
      if (!isNaN(numericLimit) && numericLimit > 0) {
        updateParam('limit', numericLimit);
      }
    }
  };

  const limitOptions = customLimitOptions
    ? customLimitOptions.map(String)
    : defaultLimitOptions.map(String);

  return (
    <Select
      data={limitOptions}
      value={currentLimit}
      onChange={setLimit}
      {...props}
    />
  );
}
