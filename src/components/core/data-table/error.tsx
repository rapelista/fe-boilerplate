import { useEffect } from 'react';
import { ErrorResponseType } from '~/types/core/response';
import { toast } from '../toast';
import { useDataTableContext } from './context';
import { useFetchDataTable } from './hooks';

export function DataTableError() {
  const { context, params } = useDataTableContext();

  const { error } = useFetchDataTable(context, params);

  useEffect(() => {
    if (error) {
      const data: ErrorResponseType = JSON.parse(error.message);

      data.errors.map((error) => {
        toast.error({
          title: 'An error occured!',
          message: error.detail,
          autoClose: false,
        });
      });
    }
  }, [error]);

  return null;
}
