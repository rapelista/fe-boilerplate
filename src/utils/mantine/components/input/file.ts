import { createTheme, FileInput } from '@mantine/core';

export const themeFileInput = createTheme({
  components: {
    FileInput: FileInput.extend({
      defaultProps: {
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            input: {
              '--input-height': '40px',
            },
          };
        }

        return {};
      },
    }),
  },
});
