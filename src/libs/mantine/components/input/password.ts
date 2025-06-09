import { createTheme, PasswordInput } from '@mantine/core';

export const themePasswordInput = createTheme({
  components: {
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            input: {
              '--input-size': 'var(--custom-input-height)',
              '--input-height': 'var(--custom-input-height)',
            },
            root: {},
          };
        }

        return {
          root: {},
        };
      },
    }),
  },
});
