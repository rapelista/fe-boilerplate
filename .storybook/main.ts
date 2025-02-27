import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: true,
      },
    },
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Documentation',
  },
  webpackFinal: async (config) => {
    if (!config?.plugins) {
      return config;
    }

    config.plugins.push(
      new webpack.DefinePlugin(
        Object.keys(process.env)
          .filter((key) => key.startsWith('NEXT_PUBLIC_'))
          .reduce(
            (state, nextKey) => ({ ...state, [nextKey]: process.env[nextKey] }),
            {},
          ),
      ),
    );
    return config;
  },
};
export default config;
