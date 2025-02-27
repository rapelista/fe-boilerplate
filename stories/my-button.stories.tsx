import { Button } from '@mantine/core';
import { Meta } from '@storybook/react';

export default {
  tags: ['autodocs'],
  component: Button,
} as Meta;

export const Primary = {
  args: {
    children: 'Hello',
  },
};
