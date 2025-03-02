import { Code, Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { toast, ToastProps } from '~/components/core/toast';
import { delay } from '~/utils/core/misc';

function Toast({
  name,
  props,
}: {
  name: keyof typeof toast;
  props: ToastProps;
}) {
  useEffect(() => {
    async function show() {
      await delay();
      toast[name]({ ...props });
    }

    show();

    return () => {
      notifications.clean();
    };
  }, [name, props]);

  return (
    <Container>
      <Code block>{`toast.${name}(${JSON.stringify(props, null, 2)})`}</Code>
    </Container>
  );
}

export default {
  title: 'Components/Toast',
  component: Toast,
} satisfies Meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    name: 'success',
    props: {
      title: 'Success',
      message: 'This is a success message',
    },
  },
};

export const Error: Story = {
  args: {
    name: 'error',
    props: {
      title: 'Error',
      message: 'This is an error message',
    },
  },
};
