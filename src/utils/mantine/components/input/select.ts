import { createTheme, Select } from '@mantine/core';

export const themeSelect = createTheme({
  components: {
    Select: Select.extend({
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
