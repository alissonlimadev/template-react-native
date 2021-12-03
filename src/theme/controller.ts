import { DefaultTheme } from 'styled-components';
import darkTheme from './dark-theme.json';
import lightTheme from './light-theme.json';

export function themeSelector(isDarkMode: boolean): DefaultTheme {
  console.log(isDarkMode);
  return isDarkMode ? darkTheme : lightTheme;
}
