import {
  keepPreviousData,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';

import { EntityType } from '~/types/core/entity';
import { PaginatedResponseType } from '~/types/core/response';
import { ParamsType } from '~/types/core/uri';

export function useFetchPaginatedData<
  T extends EntityType,
  P extends PaginatedResponseType<T> = PaginatedResponseType<T>,
>(
  context: string,
  params?: ParamsType,
  options?: Partial<
    UndefinedInitialDataOptions<P> & {
      withAuth?: boolean;
    }
  >,
) {
  const withAuth = options?.withAuth;
  const queryKey =
    typeof withAuth === 'boolean'
      ? [context, params, withAuth]
      : [context, params];

  const {
    data: response,
    isLoading,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  } = useQuery<P>({
    queryKey,
    retry: false,
    placeholderData: keepPreviousData,
    ...options,
  });

  const data = response ? response.data : [];
  const meta = response?.meta;

  return {
    data,
    meta,
    error,
    isLoading,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
  };
}
