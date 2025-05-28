import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

import { ApiError } from '~/utils/shared/errors';

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
      if (error instanceof ApiError) {
        error.errors.forEach((error) => {
          toast.error({
            message: error.detail,
          });
        });
      } else {
        toast.error({
          ...toastConfig,
          message: 'Terjadi kesalahan.',
        });
      }
    }

    return () => {
      notifications.clean();
    };
  }, [error]);

  return null;
}
