import { toast } from '~/components/core/toast';

import { ApiError } from './errors';

export function errorsToToast(error: ApiError) {
  error.errors.forEach((error) => {
    toast.error({
      title: 'Gagal!',
      message: error.detail,
    });
  });
}
