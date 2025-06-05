import { createTheme, Modal } from '@mantine/core';

import classes from '~/styles/mantine/modal.module.css';

export const themeModal = createTheme({
  components: {
    Modal: Modal.extend({
      defaultProps: {
        classNames: {
          ...Modal.classes,
          ...classes,
        },
      },
    }),
  },
});
