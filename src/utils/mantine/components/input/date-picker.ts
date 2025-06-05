import { createTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { TbCalendar } from 'react-icons/tb';

export const themeDatePickerInput = createTheme({
  components: {
    DatePickerInput: DatePickerInput.extend({
      defaultProps: {
        rightSection: TbCalendar({}),
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
