import { createTheme, Input } from '@mantine/core';

export const themeInput = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        size: 'custom',
      },

      vars: (theme, { size }) => {
        if (size === 'custom') {
          return {
            wrapper: {
              '--input-height': '40px',
            },
          };
        }

        return {
          wrapper: {},
        };
      },
    }),
  },
});
