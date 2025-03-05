import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { ErrorResponseType } from '~/types/core/response';
import { toast } from '../toast';
import { useDataTableContext } from './context';
import { useFetchDataTable } from './hooks';

const toastConfig = {
  title: 'An error occured!',
  autoClose: false,
};

export function DataTableError() {
  const { context, params } = useDataTableContext();

  const { error } = useFetchDataTable(context, params);

  useEffect(() => {
    if (error) {
      try {
        const data: ErrorResponseType = JSON.parse(error.message);

        data.errors.forEach((error) => {
          toast.error({
            ...toastConfig,
            message: error.detail,
          });
        });
      } catch (e) {
        toast.error({
          ...toastConfig,
          message: (e as Error).message,
        });
      }
    }

    return () => {
      notifications.clean();
    };
  }, [error]);

  return null;
}
