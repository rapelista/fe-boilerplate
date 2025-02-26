import * as React from 'react';

import '@mantine/core/styles.css';

import { theme } from '../src/utils/mantine';

import {
  Container,
  MantineProvider,
  useMantineColorScheme,
} from '@mantine/core';
import { addons } from '@storybook/preview-api';
import { Preview } from '@storybook/react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? 'dark' : 'light');

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (renderStory) => {
      return <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>;
    },
    (renderStory) => {
      return (
        <MantineProvider theme={theme}>
          <Container py="md">{renderStory()}</Container>
        </MantineProvider>
      );
    },
  ],
};

export default preview;
