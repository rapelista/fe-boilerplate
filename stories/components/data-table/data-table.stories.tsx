import { Container, Stack, Text } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { TbEye, TbPencil, TbTrash } from 'react-icons/tb';

import { DataTable } from '~/components/core/data-table';

import { WithReactQuery } from '../../decorators/query';

import { DataTableFilter } from './data-table.filter';
import { DATA_TABLE_ERROR_MOCK, DATA_TABLE_MOCK } from './data-table.mock';
import { UserModal, UserViewModal } from './data-table.modals';

export default {
  tags: ['autodocs'],
  title: 'Components/Data Table',
  component: DataTable,
  parameters: { msw: { handlers: [DATA_TABLE_MOCK] } },
  args: {
    messages: {
      empty: 'No users found. Maybe you should create one',
      error: 'An error occured!',
    },
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
        leftSection: <TbEye />,
        modal: 'user_view',
        modalProps: {
          title: 'View User',
        },
      },
      {
        type: 'modal',
        label: 'Edit',
        leftSection: <TbPencil />,
        modal: 'user',
        modalProps: {
          title: 'Edit User',
        },
      },
      // {
      //   type: 'link',
      //   label: 'Overview',
      //   href: '/users/[id]',
      //   leftSection: <TbEye />,
      // },
      {
        type: 'composite',
        actions: [
          {
            type: 'modal',
            label: 'Edit',
            modal: 'user',
            leftSection: <TbPencil />,
            modalProps: {
              title: 'Edit User from Composite',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'link',
            label: 'Delete',
            href: '/users/[id]',
            color: 'red',
            leftSection: <TbTrash />,
          },
        ],
        main: {
          leftSection: <TbEye />,
          label: 'View',
          type: 'modal',
          modal: 'user_view',
          modalProps: {
            title: 'View User from Composite',
          },
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

export const WhenError: Story = {
  tags: ['!autodocs'],
  parameters: { msw: { handlers: [DATA_TABLE_ERROR_MOCK] } },
  decorators: [
    (Story) => (
      <Stack>
        <Text fz="xs">*Maybe you should refresh this page</Text>

        <Story />
      </Stack>
    ),
  ],
};

export const WithCustomFilter: Story = {
  args: {
    topSection: <DataTableFilter />,
  },
};
