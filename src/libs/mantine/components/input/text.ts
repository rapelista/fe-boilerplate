import { createTheme, TextInput } from '@mantine/core';

export const themeTextInput = createTheme({
  components: {
    TextInput: TextInput.extend({
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
          };
        }

        return {};
      },
    }),
  },
});
