import { Button, createTheme } from '@mantine/core';

export const themeButton = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'custom',
      },

      vars: (theme, { size }) => {
        if (size === 'custom') {
          return {
            root: {
              '--button-height': '40px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});
