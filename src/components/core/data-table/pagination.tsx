import { Pagination, PaginationProps } from '@mantine/core';
import { useDataTableContext } from './context';
import { useFetchDataTable } from './hooks';

export interface DataTablePaginationProps
  extends Omit<PaginationProps, 'total' | 'value' | 'onChange'> {}

export function DataTablePagination(props: DataTablePaginationProps) {
  const { context, params, updateParam } = useDataTableContext();
  const { meta } = useFetchDataTable(context, params);

  const currentPage = Number(params.page);
  const setPage = (page: number) => updateParam('page', page);

  return (
    <Pagination
      value={currentPage}
      onChange={setPage}
      total={meta?.totalPage || 1}
      {...props}
    />
  );
}
