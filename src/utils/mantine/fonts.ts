import { createTheme } from '@mantine/core';

import { inter, plusJakartaSans } from '~/configs/fonts';

export const themeFonts = createTheme({
  fontFamily: inter.style.fontFamily,
  headings: { fontFamily: plusJakartaSans.style.fontFamily },
});
