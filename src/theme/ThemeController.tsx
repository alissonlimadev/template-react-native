import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { themeSelector } from './controller';

type ThemeOptions = {
  handleTheme(): void;
};

const ThemeContext = createContext<ThemeOptions>({
  handleTheme: () => {},
});

const ThemeController: FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const getSystemTheme = useCallback(() => {
    const colorScheme = Appearance.getColorScheme();
    console.log(`system using ${colorScheme?.toUpperCase()} theme`);
    setDarkMode(colorScheme === 'dark');
  }, []);

  const handleTheme = useCallback(() => {
    setDarkMode((oldState) => !oldState);
  }, [darkMode]);

  const theme = useMemo(() => {
    return themeSelector(darkMode);
  }, [darkMode]);

  useEffect(() => {
    getSystemTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        handleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useClients must be user within an ClientsProvider');
  }
  return context;
};

export { ThemeController, useTheme };
