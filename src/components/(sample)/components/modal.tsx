'use client';

import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Fragment } from 'react';
import { TbX } from 'react-icons/tb';

export function SampleModalComponent() {
  const [opened, { close, open }] = useDisclosure();

  return (
    <Fragment>
      <Group>
        <Button onClick={open}>Open Modal</Button>
      </Group>

      <Modal opened={opened} title="Sample Modal" onClose={close}>
        <Stack>
          <TextInput data-autofocus label="Full Name" placeholder="Full Name" />

          <Group>
            <Button
              c="black"
              color="gray"
              leftSection={<TbX />}
              variant="outline"
              onClick={close}
            >
              Close
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Fragment>
  );
}
