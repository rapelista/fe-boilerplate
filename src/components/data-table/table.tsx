import {
  Table,
  TableProps,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { EntityType } from '~/types/core/entity';
import { PaginatedResponseType } from '~/types/core/response';

export interface DataTableProps extends TableProps {
  context: string;
}

export function DataTable<T extends EntityType>({
  context,
  ...props
}: DataTableProps) {
  const { data } = useQuery<
    PaginatedResponseType<
      // TODO: Fix this type.
      T & {
        name: string;
        age: number;
      }
    >
  >({ queryKey: [context] });

  return (
    <Table {...props}>
      <TableThead>
        <TableTr>
          <TableTh>Name</TableTh>
          <TableTh>Age</TableTh>
        </TableTr>
      </TableThead>

      <TableTbody>
        {data?.data.map((row, key) => (
          <TableTr key={key}>
            <TableTd>{row.name}</TableTd>
            <TableTd>{row.age}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
