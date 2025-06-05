import { createTheme, MultiSelect } from '@mantine/core';
import { TbChevronDown } from 'react-icons/tb';

export const themeMultiSelect = createTheme({
  components: {
    MultiSelect: MultiSelect.extend({
      defaultProps: {
        rightSection: TbChevronDown({}),
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            input: {
              '--input-height': '40px',
              '--input-padding-y': '7.8px',
            },
          };
        }

        return {};
      },
    }),
  },
});
