import { Button, createTheme } from '@mantine/core';

export const themeButton = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            root: {
              '--button-height': 'var(--custom-button-height)',
            },
          };
        }

        return {
          root: {},
        };
      },
    }),
  },
});
