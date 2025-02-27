import * as React from 'react';

import '@mantine/core/styles.css';

import type { Preview } from '@storybook/react';
import { Providers } from '../src/components/providers';

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
      <Providers withQueryDevtools={false}>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;
