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

export interface DataTableUIProps<T>
  extends TableProps,
    Pick<DataTableActionsProps<T>, 'actions'> {
  columns: ColumnDef<T>[];
}

export function DataTableUI<T extends EntityType>({
  columns: initialColumns = [],
  actions: initialActions = [],
  ...props
}: DataTableUIProps<T>) {
  const { context, params } = useDataTableContext();
  const { data } = useFetchDataTable<T>(context, params);

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
  });

  return (
    <Table {...props}>
      <TableThead>
        {table.getHeaderGroups().map((group) => (
          <TableTr key={group.id}>
            {group.headers.map((header) => (
              <TableTh key={header.id}>
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

      <TableTbody>
        {table.getRowModel().rows.map((row) => (
          <TableTr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableTd key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
