import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Appearance, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from '~/modules';
import { RemoteConfig, Storage } from '~/services';
import { ThemeMode } from '~/utils';
import themeDefault from './theme.json';

type ThemeOptions = {
  setDark(): void;
  setLight(): void;
  setSystemTheme(): void;
  getRemoteTheme(): Promise<void>;
  darkMode: boolean;
};

type ThemeConfig = {
  dark: DefaultTheme;
  light: DefaultTheme;
};

const ThemeContext = createContext<ThemeOptions>({
  setDark: () => {},
  setLight: () => {},
  setSystemTheme: () => {},
  getRemoteTheme: async () => {},
  darkMode: false,
});

const ThemeController: FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState({
    dark: themeDefault,
    light: themeDefault,
  } as ThemeConfig);

  const setDark = useCallback((): void => {
    setDarkMode(true);
    Storage.setThemeMode(ThemeMode.DARK);
  }, [darkMode, theme]);

  const setLight = useCallback((): void => {
    Storage.setThemeMode(ThemeMode.LIGHT);
    setDarkMode(false);
  }, [darkMode, theme]);

  const setSystemTheme = useCallback((): void => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');
    Storage.setThemeMode(ThemeMode.SYSTEM);
  }, [darkMode, theme]);

  const handleTheme = async () => {
    const themeMode = await Storage.getThemeMode();
    if (themeMode) {
      switch (themeMode) {
        case ThemeMode.DARK:
          return setDark();
        case ThemeMode.DARK:
          return setSystemTheme();
        default:
          return setLight();
      }
    }
  };

  const getRemoteTheme = async () => {
    const darkTheme = await RemoteConfig.getValueJson('dark_theme');
    const lightTheme = await RemoteConfig.getValueJson('light_theme');
    setTheme({
      dark: darkTheme as unknown as DefaultTheme,
      light: lightTheme as unknown as DefaultTheme,
    });
    await handleTheme();
  };

  const currentTheme = useMemo(
    () => (darkMode ? theme.dark : theme.light),
    [darkMode, theme],
  );

  return (
    <ThemeContext.Provider
      value={{
        setDark,
        setLight,
        setSystemTheme,
        getRemoteTheme,
        darkMode,
      }}
    >
      <StatusBar
        animated
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be theme within an ThemeProvider');
  }
  return context;
};

export { ThemeController, useTheme };
