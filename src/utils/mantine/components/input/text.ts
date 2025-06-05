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
              '--input-height': '40px',
              '--input-size': '40px',
            },
          };
        }

        return {};
      },
    }),
  },
});
