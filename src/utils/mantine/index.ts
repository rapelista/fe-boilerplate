import { mergeThemeOverrides } from '@mantine/core';

import { themeColors } from './colors';
import { themeModal } from './components/modal';
import { themeSelect } from './components/select';
import { themeTable } from './components/table';
import { themeFonts } from './fonts';
import { themeMisc } from './misc';

export const theme = mergeThemeOverrides(
  themeColors,
  themeMisc,
  themeFonts,

  themeSelect,
  themeTable,
  themeModal,
);
