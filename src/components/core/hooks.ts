import {
  keepPreviousData,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { EntityType } from '~/types/core/entity';
import { PaginatedResponseType } from '~/types/core/response';
import { ParamsType } from '~/types/core/uri';

export function useFetchPaginatedData<
  T extends EntityType,
  P extends PaginatedResponseType<T> = PaginatedResponseType<T>,
>(
  context: string,
  params?: ParamsType,
  options?: Partial<UndefinedInitialDataOptions<P>>,
) {
  const {
    data: response,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  } = useQuery<P>({
    retry: false,
    queryKey: [context, params],
    placeholderData: keepPreviousData,
    ...options,
  });

  const data = useMemo(() => {
    return response ? response.data : [];
  }, [response]);

  const meta = useMemo(() => {
    return response?.meta;
  }, [response]);

  return {
    data,
    meta,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
  };
}
