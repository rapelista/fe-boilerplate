import * as React from 'react';

import {
  Container,
  MantineProvider,
  useMantineColorScheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { DocsContainer, DocsContainerProps } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { theme } from '~/utils/mantine';

const channel = addons.getChannel();

const ColorSchemeWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { setColorScheme } = useMantineColorScheme();

  React.useEffect(() => {
    const handleColorScheme = (value: boolean) =>
      setColorScheme(value ? 'dark' : 'light');
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, []);

  return <>{children}</>;
};

const DocsContainerWrapper: React.FC<DocsContainerProps> = (props) => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const handleColorScheme = (value: boolean) => setIsDark(value);
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, []);

  return (
    <DocsContainer {...props} theme={isDark ? themes.dark : themes.light} />
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainerWrapper,
    },
  },
  decorators: [
    (renderStory) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
    (renderStory) => (
      <MantineProvider theme={theme}>
        <Container py="md">{renderStory()}</Container>
      </MantineProvider>
    ),
  ],
};

export default preview;
