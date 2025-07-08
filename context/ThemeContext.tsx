import * as React from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Theme } from '~/utilities/const';
import { useMUIStyles } from '~/hooks/useMUIStyles';

type ThemeProviderProps = {
  theme?: Theme;
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  theme: Theme.Patternfly,
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = Theme.Patternfly,
  children,
}) => {
  const themeValue = React.useMemo(() => ({ theme }), [theme]);
  const createMUITheme = React.useMemo(() => createTheme({ cssVariables: true }), []);

  // Automatically load MUI styles when MUI theme is selected
  useMUIStyles(theme === Theme.MUI);

  React.useEffect(() => {
    // Apply the theme based on the theme enum value
    if (theme === Theme.MUI) {
      document.documentElement.classList.add(Theme.MUI);
    } else {
      document.documentElement.classList.remove(Theme.MUI);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      {theme === Theme.MUI ? (
        <MUIThemeProvider theme={createMUITheme}>{children}</MUIThemeProvider>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};
