import { Meta, StoryObj } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { columns } from '~/components/(example)/users/columns';
import { DataTable, DataTableProps } from '~/components/core/data-table';
import { UserType } from '~/types/(example)/users';
import { getQueryClient } from '~/utils/query';

const withQueryClientProvider = (renderStory: () => React.ReactElement) => (
  <QueryClientProvider client={getQueryClient()}>
    {renderStory()}
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
);

export default {
  tags: ['autodocs'],
  component: DataTable,
  title: 'Components/Data Table',
  decorators: [withQueryClientProvider],
  args: {
    context: 'users',
    params: {},
    columns: columns,
  },
} satisfies Meta;

type Story = StoryObj<DataTableProps<UserType>>;

export const Primary: Story = {};

export const Search: Story = {
  args: {
    withSearch: true,
    searchProps: {
      flex: 1,
      placeholder: 'Search something...',
    },
  },
};

export const Pagination: Story = {
  args: {
    withPagination: true,
    paginationProps: {},
  },
};

export const Limitation: Story = {
  args: {
    withLimitation: true,
    limitationProps: {},
    bottomSectionProps: {
      justify: 'flex-end',
    },
  },
};

export const LimitationWithCustomOptions: Story = {
  args: {
    ...Limitation.args,
    limitationProps: {
      customLimitOptions: [5, 10, 15, 20, 25],
    },
  },
};

export const FullFeature: Story = {
  args: {
    ...Search.args,
    ...Pagination.args,
    ...Limitation.args,
    bottomSectionProps: { justify: 'space-between' },
  },
};
