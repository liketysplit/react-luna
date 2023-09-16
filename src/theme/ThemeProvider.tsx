import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme } from './base';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme; // Optional user-provided theme
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = lightTheme, // Use the user-provided theme if available, otherwise use the default theme
}) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);
  const context = useContext(ThemeContext);

  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    console.warn('Did you forget to wrap your app in a ThemeProvider?');
    const toggleTheme = () => {
      setCurrentTheme((prevTheme) =>
        prevTheme === lightTheme ? darkTheme : lightTheme
      );
    };
    return {theme: currentTheme, toggleTheme}
  }

  return context;
};