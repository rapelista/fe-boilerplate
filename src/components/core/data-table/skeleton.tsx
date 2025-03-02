import { Skeleton, TableTd, TableTr } from '@mantine/core';

export interface DataTableSkeletonProps {
  rows?: number;
  cols: number;
}

export function DataTableSkeleton({ rows = 10, cols }: DataTableSkeletonProps) {
  return Array.from({ length: rows }).map((_, key) => (
    <TableTr key={`skeleton-${key}`}>
      {Array.from({ length: cols }).map((_, key) => (
        <TableTd key={`skeleton-column-${key}`}>
          <Skeleton h={25} w="100%" />
        </TableTd>
      ))}
    </TableTr>
  ));
}
