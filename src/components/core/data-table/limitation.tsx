import { Select, SelectProps } from '@mantine/core';
import { defaultLimitOption } from '~/utils/core/data-table';
import { useDataTableContext } from './context';

export interface DataTableLimitationProps
  extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {}

export function DataTableLimitation(props?: DataTableLimitationProps) {
  const { params, updateParam } = useDataTableContext();

  const currentLimit = String(params.limit);
  const setLimit = (limit: null | string) => {
    if (limit) {
      updateParam('limit', Number(limit));
    }
  };

  return (
    <Select
      data={defaultLimitOption.map((option) => option.toString())}
      value={currentLimit}
      onChange={setLimit}
      {...props}
    />
  );
}
