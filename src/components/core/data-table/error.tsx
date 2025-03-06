import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { ErrorResponseType } from '~/types/core/response';
import { useFetchPaginatedData } from '../hooks';
import { toast } from '../toast';
import { useDataTableContext } from './context';

const toastConfig = {
  title: 'An error occured!',
  autoClose: false,
};

export function DataTableError() {
  const { context, params } = useDataTableContext();

  const { error } = useFetchPaginatedData(context, params);

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
