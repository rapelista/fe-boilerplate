import { Meta, StoryObj } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { columns } from '~/components/(example)/users/columns';
import { DataTable, DataTableProps } from '~/components/core/data-table';
import { UserType } from '~/types/(example)/users';
import { getQueryClient } from '~/utils/query';

export default {
  component: DataTable,
  title: 'Components/Data Table',
  decorators: [
    (renderStory) => (
      <QueryClientProvider client={getQueryClient()}>
        {renderStory()}
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    ),
  ],
  args: {
    context: 'users',
    params: {},
    columns: columns,
  },
} satisfies Meta;

type Story = StoryObj<DataTableProps<UserType>>;

export const Primary: Story = {};

export const Pagination: Story = {
  args: {
    withPagination: true,
  },
};
