import * as React from 'react';

import '~/styles/globals.css';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { WithMantine } from '../stories/decorators/mantine';

initialize();

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
    (Story) => (
      <WithMantine>
        <Story />
      </WithMantine>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
