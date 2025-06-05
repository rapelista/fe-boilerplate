import { Container } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

import { AsyncAutocomplete } from '~/components/core/async-autocomplete';

import { WithReactQuery } from '../../decorators/query';

import { AsyncAutocompleteControlled } from './async-autocomplete.controlled';
import { ASYNC_AUTOCOMPLETE_MOCK } from './async-autocomplete.mock';

export default {
  title: 'Components/Async Autocomplete',
  component: AsyncAutocomplete,
  parameters: { msw: { handlers: [ASYNC_AUTOCOMPLETE_MOCK] } },
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
  args: {
    debug: true,
  },
} satisfies Meta<typeof AsyncAutocomplete>;

type Story = StoryObj<typeof AsyncAutocomplete>;

export const Default: Story = {
  args: {
    context: 'products',
    label: 'Product',
    placeholder: 'Search for a product...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 101,
    defaultRender: 'Buku',
  },
};

export const Clearable: Story = {
  args: {
    ...Default.args,
    clearable: true,
  },
};

export const Controlled: Story = {
  render: AsyncAutocompleteControlled,
};
