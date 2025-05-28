'use client';

import {
  Table,
  TableProps,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { EntityType } from '~/types/core/entity';

import { useFetchPaginatedData } from '../hooks';

import { DataTableActions, DataTableActionsProps } from './actions';
import { useDataTableContext } from './context';
import { DataTableSkeleton, DataTableSkeletonProps } from './skeleton';

export interface DataTableUIProps<T>
  extends TableProps,
    DataTableUIComponentProps,
    Pick<DataTableActionsProps<T>, 'actions'> {
  withAuth?: boolean;
  columns: ColumnDef<T>[];
  messages?: {
    empty?: string;
    error?: string;
  };
}

export interface DataTableUIComponentProps {
  skeletonProps?: DataTableSkeletonProps;
}

export function DataTableUI<T extends EntityType>({
  columns: initialColumns = [],
  actions: initialActions = [],
  skeletonProps,
  messages,
  withAuth,
  ...props
}: DataTableUIProps<T>) {
  const { context, params } = useDataTableContext();
  const { data, isPending, isError } = useFetchPaginatedData<T>(
    context,
    params,
    { withAuth },
  );

  const columns = useMemo(() => {
    if (initialActions.length > 0) {
      return initialColumns.concat({
        id: 'actions',
        header: 'Actions',
        cell: (props) => (
          <DataTableActions actions={initialActions} row={props.row.original} />
        ),
      });
    }

    return initialColumns;
  }, [initialColumns, initialActions]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 250,
      minSize: 100,
      maxSize: 500,
    },
  });

  return (
    <Table captionSide="top" layout="fixed" pos="relative" {...props}>
      <TableThead>
        {table.getHeaderGroups().map((group) => (
          <TableTr key={group.id}>
            {group.headers.map((header) => (
              <TableTh key={header.id} w={header.getSize()}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableTh>
            ))}
          </TableTr>
        ))}
      </TableThead>

      <TableTbody pos="relative">
        {isPending ? (
          <DataTableSkeleton
            cols={columns.length}
            rows={Number(params.limit)}
            {...skeletonProps}
          />
        ) : isError ? (
          <TableTr>
            <TableTd colSpan={columns.length} h={100} ta="center">
              {messages?.error || 'An error occured'}
            </TableTd>
          </TableTr>
        ) : table.getRowModel().rows.length === 0 ? (
          <TableTr>
            <TableTd colSpan={columns.length} h={100} ta="center">
              {messages?.empty || 'No data available'}
            </TableTd>
          </TableTr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableTr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableTd key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableTd>
              ))}
            </TableTr>
          ))
        )}
      </TableTbody>
    </Table>
  );
}
