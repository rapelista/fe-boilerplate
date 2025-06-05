import { mergeThemeOverrides } from '@mantine/core';

import { themeColors } from './colors';
import { themeButton } from './components/button';
import { themeDatePickerInput } from './components/input/date-picker';
import { themeSelect } from './components/input/select';
import { themeTextInput } from './components/input/text';
import { themeModal } from './components/modal';
import { themeTable } from './components/table';
import { themeFonts } from './fonts';
import { themeMisc } from './misc';

export const theme = mergeThemeOverrides(
  themeColors,
  themeMisc,
  themeFonts,

  themeTable,
  themeModal,

  themeButton,

  themeTextInput,
  themeDatePickerInput,
  themeSelect,
);
