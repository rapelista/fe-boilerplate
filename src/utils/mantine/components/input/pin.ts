import { createTheme, PinInput } from '@mantine/core';

export const themePinInput = createTheme({
  components: {
    PinInput: PinInput.extend({
      defaultProps: {
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            root: {},
            input: {
              '--input-height': '40px',
            },
            wrapper: {
              '--pin-input-size': '40px',
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
