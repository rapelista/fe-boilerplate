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
import { EntityType } from '~/types/core/entity';
import { useDataTableContext } from './context';
import { useFetchDataTable } from './hooks';

export interface DataTableUIProps<T> extends TableProps {
  columns: ColumnDef<T>[];
}

export function DataTableUI<T extends EntityType>({
  columns,
  ...props
}: DataTableUIProps<T>) {
  const { context, params } = useDataTableContext();

  const { data } = useFetchDataTable<T>(context, params);

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
