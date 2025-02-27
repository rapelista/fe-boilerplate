import { Button } from '@mantine/core';
import { useDataTableContext } from './context';

export function DataTablePagination() {
  const { params, updateParam } = useDataTableContext();

  const currentPage = Number(params.page);
  const setPage = (page: number) => updateParam('page', page);

  return (
    <Button
      onClick={() => {
        setPage(currentPage + 1);
      }}
    >
      Next
    </Button>
  );
}
