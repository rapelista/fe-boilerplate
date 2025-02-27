'use client';

import { Group, Stack } from '@mantine/core';
import { EntityType } from '~/types/core/entity';
import { DataTablePagination } from './pagination';
import { DataTableProvider, DataTableProviderProps } from './provider';
import { DataTableUI, DataTableUIProps } from './ui';

export interface DataTableProps<T>
  extends DataTableUIProps<T>,
    DataTableProviderProps {
  withPagination?: boolean;
}

export function DataTable<T extends EntityType>({
  withPagination = false,
  ...props
}: DataTableProps<T>) {
  return (
    <DataTableProvider context={props.context} params={props.params}>
      <Stack>
        <DataTableUI {...props} />

        <Group>{withPagination && <DataTablePagination />}</Group>
      </Stack>
    </DataTableProvider>
  );
}
