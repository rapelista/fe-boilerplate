import { Meta, StoryObj } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DataTable, DataTableProps } from '~/components/data-table';
import { getQueryClient } from '~/utils/query';

export default {
  component: DataTable,
  title: 'Components/Data Table',
  decorators: [
    (renderStory) => {
      const client = getQueryClient();

      return (
        <QueryClientProvider client={client}>
          {renderStory()}

          <ReactQueryDevtools buttonPosition="bottom-left" />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta;

type Story = StoryObj<DataTableProps>;

export const Primary: Story = {
  args: {
    context: 'users',
    params: { page: 1, limit: 10 },
  },
};
