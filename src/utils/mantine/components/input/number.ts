import { createTheme, NumberInput } from '@mantine/core';

export const themeNumberInput = createTheme({
  components: {
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'sm',
        hideControls: true,
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            controls: {},
            input: {
              '--input-height': '40px',
            },
          };
        }

        return {
          controls: {},
        };
      },
    }),
  },
});
