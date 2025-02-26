import { mergeThemeOverrides } from '@mantine/core';
import { themeColors } from './colors';
import { themeTable } from './components/table';
import { themeFonts } from './fonts';
import { themeMisc } from './misc';

export const theme = mergeThemeOverrides(
  themeColors,
  themeMisc,
  themeFonts,
  themeTable,
);
