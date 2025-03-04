import { Container } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { IconEye, IconPencil } from '@tabler/icons-react';
import { DataTable } from '~/components/core/data-table';
import { WithReactQuery } from '../decorators/query';
import { DATA_TABLE_MOCK } from './data-table.mock';
import { UserModal, UserViewModal } from './data-table.modals';

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
      <WithReactQuery>
        <Story />
      </WithReactQuery>
    ),
    (Story) => (
      <Container my="md">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof DataTable>;

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

export const WithActions: Story = {
  args: {
    modals: {
      user: UserModal,
      user_view: UserViewModal,
    },
    actions: [
      {
        type: 'modal',
        label: 'View',
        leftSection: <IconEye />,
        modal: 'user_view',
        modalProps: {
          title: 'View User',
        },
      },
      {
        type: 'modal',
        label: 'Edit',
        leftSection: <IconPencil />,
        modal: 'user',
        modalProps: {
          title: 'Edit User',
        },
      },
    ],
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
