import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EntityType } from '~/types/core/entity';
import { PaginatedResponseType } from '~/types/core/response';
import { ParamsType } from '~/types/core/uri';

export function useFetchDataTable<T extends EntityType>(
  context: string,
  params: ParamsType,
) {
  const {
    data: response,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  } = useQuery<PaginatedResponseType<T>>({
    retry: false,
    queryKey: [context, params],
    placeholderData: keepPreviousData,
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
