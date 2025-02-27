'use client';

import { Group, Stack } from '@mantine/core';
import { EntityType } from '~/types/core/entity';
import { DataTableLimitation, DataTableLimitationProps } from './limitation';
import { DataTablePagination, DataTablePaginationProps } from './pagination';
import { DataTableProvider, DataTableProviderProps } from './provider';
import { DataTableSearch } from './search';
import { DataTableUI, DataTableUIProps } from './ui';

export interface DataTableProps<T>
  extends DataTableUIProps<T>,
    DataTableProviderProps,
    DataTableComponentProps {
  withPagination?: boolean;
  withLimitation?: boolean;
  withSearch?: boolean;
}

export interface DataTableComponentProps {
  paginationProps?: DataTablePaginationProps;
  limitationProps?: DataTableLimitationProps;
}

export function DataTable<T extends EntityType>({
  withPagination = false,
  withLimitation = false,
  withSearch = false,
  paginationProps,
  limitationProps,
  ...props
}: DataTableProps<T>) {
  return (
    <DataTableProvider context={props.context} params={props.params}>
      <Stack>
        {/**
         * Top Section
         */}
        <Group>{withSearch && <DataTableSearch />}</Group>

        {/**
         * Main Table Section
         */}
        <DataTableUI {...props} />

        {/**
         * Bottom Section
         */}
        <Group>
          {withPagination && <DataTablePagination {...paginationProps} />}
          {withLimitation && <DataTableLimitation {...limitationProps} />}
        </Group>
      </Stack>
    </DataTableProvider>
  );
}
