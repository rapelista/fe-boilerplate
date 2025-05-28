import { createTheme, Select } from '@mantine/core';
import { TbChevronDown } from 'react-icons/tb';

export const themeSelect = createTheme({
  components: {
    Select: Select.extend({
      defaultProps: {
        rightSection: TbChevronDown({}),
      },
    }),
  },
});
