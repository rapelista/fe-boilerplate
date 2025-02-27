import { Meta } from '@storybook/react';
import { DataTable } from '~/components/core/data-table';

export default {
  title: 'Components/Data Table',
  component: DataTable,
} satisfies Meta;

export const Primary = {
  args: {
    context: 'users',
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
  },
};
