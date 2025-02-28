import { Container } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '~/components/core/data-table';
import { DATA_TABLE_MOCK } from './data-table.mock';

export default {
  title: 'Components/Data Table',
  component: DataTable,
  parameters: { msw: { handlers: [DATA_TABLE_MOCK] } },
  args: {
    context: 'users',
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ],
  },
  decorators: [
    (Story) => (
      <Container my="md">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta;

type Story = StoryObj<typeof DataTable>;

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

export const FullFeature: Story = {
  args: {
    ...Search.args,
    ...Pagination.args,
    ...Limitation.args,
    bottomSectionProps: {
      justify: 'space-between',
    },
  },
};

export const WithActions: Story = {
  args: {
    actions: [
      {
        type: 'modal',
        label: 'View',
      },
      {
        type: 'link',
        href: '/users',
        label: 'Edit',
      },
    ],
  },
};
