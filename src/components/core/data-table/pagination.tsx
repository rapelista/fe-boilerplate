import { Pagination, PaginationProps } from '@mantine/core';

import { useFetchPaginatedData } from '../hooks';

import { useDataTableContext } from './context';

export interface DataTablePaginationProps
  extends Omit<PaginationProps, 'total' | 'value' | 'onChange'> {}

export function DataTablePagination(props: DataTablePaginationProps) {
  const { context, params, updateParam } = useDataTableContext();
  const { meta } = useFetchPaginatedData(context, params);

  const currentPage = Number(params.page);
  const setPage = (page: number) => updateParam('page', page);

  return (
    <Pagination
      total={meta?.totalPage || 1}
      value={currentPage}
      onChange={setPage}
      {...props}
    />
  );
}
