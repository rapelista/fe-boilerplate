import { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableProps } from '~/components/data-table/table';

export default {
  title: 'Components/Data Table',
  component: DataTable,
} satisfies Meta;

type Story = StoryObj<DataTableProps>;

export const Primary: Story = {
  args: {
    context: 'users',
  },
};
