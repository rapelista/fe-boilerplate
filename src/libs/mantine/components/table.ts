import { createTheme, Table } from '@mantine/core';

import classes from '~/styles/mantine/table.module.css';

export const themeTable = createTheme({
  components: {
    Table: Table.extend({
      defaultProps: {
        striped: true,
        highlightOnHover: true,
        className: classes.table,
      },
    }),
  },
});
