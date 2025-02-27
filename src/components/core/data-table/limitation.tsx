import { Select, SelectProps } from '@mantine/core';
import { defaultLimitOption } from '~/utils/core/data-table';
import { useDataTableContext } from './context';

export interface DataTableLimitationProps
  extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {
  customLimitOption?: number[];
}

export function DataTableLimitation(props?: DataTableLimitationProps) {
  const { params, updateParam } = useDataTableContext();

  const currentLimit = String(params.limit);
  const setLimit = (limit: null | string) => {
    if (limit) {
      updateParam('limit', Number(limit));
    }
  };

  const limitOption = props?.customLimitOption
    ? props.customLimitOption.map(String)
    : defaultLimitOption.map(String);

  return (
    <Select
      data={limitOption}
      value={currentLimit}
      onChange={setLimit}
      {...props}
    />
  );
}
