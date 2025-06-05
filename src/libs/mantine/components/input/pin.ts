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
              '--input-height': 'var(--custom-input-height)',
              '--input-size': 'var(--custom-input-height)',
            },
            wrapper: {
              '--pin-input-size': 'var(--custom-input-height)',
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
