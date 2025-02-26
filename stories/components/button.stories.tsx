import { Button, ButtonProps } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: 'Click Me!',
  },
};

export default {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<ButtonProps>;
