import { createTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

export const themeDatePickerInput = createTheme({
  components: {
    DatePickerInput: DatePickerInput.extend({
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
