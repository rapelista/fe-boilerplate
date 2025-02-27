import { ColumnDef } from '@tanstack/react-table';
import { UserType } from '~/types/(example)/users';

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];
