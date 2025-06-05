import { mergeThemeOverrides } from '@mantine/core';

import { themeColors } from './colors';
import { themeButton } from './components/button';
import { themeDatePickerInput } from './components/input/date-picker';
import { themeFileInput } from './components/input/file';
import { themeMultiSelect } from './components/input/multi-select';
import { themeNumberInput } from './components/input/number';
import { themePinInput } from './components/input/pin';
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
  themeMultiSelect,
  themeNumberInput,
  themePinInput,
  themeFileInput,
);
