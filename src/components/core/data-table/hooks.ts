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
  } = useQuery<PaginatedResponseType<T>>({
    queryKey: [context, params],
    // placeholderData: (data) =>
    //   data
    //     ? keepPreviousData(data)
    //     : ({
    //         data: Array.from({ length: Number(params?.limit || 10) }).map(
    //           (_, key) => ({
    //             id: key,
    //           }),
    //         ),
    //         meta: {
    //           page: 1,
    //           totalData: 0,
    //           totalPage: 0,
    //         },
    //       } as PaginatedResponseType<T>),
    placeholderData: keepPreviousData,
  });

  const data = useMemo(() => {
    return response ? response.data : [];
  }, [response]);

  const meta = useMemo(() => {
    return response?.meta;
  }, [response]);

  return { data, meta, isPending, isFetching, isPlaceholderData };
}
