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
import { DataTableActions, DataTableActionsProps } from './actions';
import { useDataTableContext } from './context';
import { useFetchDataTable } from './hooks';
import { DataTableOverlay } from './overlay';
import { DataTableSkeleton, DataTableSkeletonProps } from './skeleton';

export interface DataTableUIProps<T>
  extends TableProps,
    Pick<DataTableActionsProps<T>, 'actions'> {
  columns: ColumnDef<T>[];
  skeletonProps?: DataTableSkeletonProps;
}

export function DataTableUI<T extends EntityType>({
  columns: initialColumns = [],
  actions: initialActions = [],
  skeletonProps,
  ...props
}: DataTableUIProps<T>) {
  const { context, params } = useDataTableContext();
  const { data, isPending, isFetching } = useFetchDataTable<T>(context, params);

  const columns = useMemo(() => {
    if (initialActions.length > 0) {
      return initialColumns.concat({
        id: 'actions',
        header: 'Actions',
        cell: (props) => (
          <DataTableActions row={props.row.original} actions={initialActions} />
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
    <Table layout="fixed" pos="relative" captionSide="top" {...props}>
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

      {!isPending && isFetching && <DataTableOverlay />}

      <TableTbody pos="relative">
        {isPending ? (
          <DataTableSkeleton
            cols={columns.length}
            rows={Number(params.limit)}
            {...skeletonProps}
          />
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
