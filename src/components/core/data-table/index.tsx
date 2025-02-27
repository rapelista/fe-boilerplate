'use client';

import { Group, GroupProps, Stack } from '@mantine/core';
import { EntityType } from '~/types/core/entity';
import { DataTableLimitation, DataTableLimitationProps } from './limitation';
import { DataTablePagination, DataTablePaginationProps } from './pagination';
import { DataTableProvider, DataTableProviderProps } from './provider';
import { DataTableSearch, DataTableSearchProps } from './search';
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
  searchProps?: DataTableSearchProps;
  bottomSectionProps?: GroupProps;
}

export function DataTable<T extends EntityType>({
  /**
   * Component Visibility
   */
  withPagination = false,
  withLimitation = false,
  withSearch = false,

  /**
   * Componenet Props
   */
  paginationProps,
  limitationProps,
  searchProps,
  bottomSectionProps,

  /**
   * Rest props a.k.a DataTableUIProps
   */
  ...props
}: DataTableProps<T>) {
  return (
    <DataTableProvider context={props.context} params={props.params}>
      <Stack>
        {/**
         * Top Section
         */}
        <Group>{withSearch && <DataTableSearch {...searchProps} />}</Group>

        {/**
         * Main Table Section
         */}
        <DataTableUI {...props} />

        {/**
         * Bottom Section
         */}
        <Group {...bottomSectionProps}>
          {withPagination && <DataTablePagination {...paginationProps} />}
          {withLimitation && <DataTableLimitation {...limitationProps} />}
        </Group>
      </Stack>
    </DataTableProvider>
  );
}
