import { createTheme, Select } from '@mantine/core';
import { TbChevronDown } from 'react-icons/tb';

export const themeSelect = createTheme({
  components: {
    Select: Select.extend({
      defaultProps: {
        rightSection: TbChevronDown({}),
        size: 'sm',
      },

      vars: (theme, props) => {
        if (props.size === 'sm') {
          return {
            input: {
              '--input-height': 'var(--custom-input-height)',
              '--input-size': 'var(--custom-input-height)',
            },
          };
        }

        return {};
      },
    }),
  },
});
