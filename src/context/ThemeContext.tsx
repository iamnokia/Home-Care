// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#611463',
      light: '#8e24aa',
      dark: '#4a0e4e',
    },
    secondary: {
      main: '#f7931e',
      light: '#ffa726',
      dark: '#e65100',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'NotoSansLao-Regular', 'Roboto', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Define dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa',
      light: '#ba68c8',
      dark: '#611463',
    },
    secondary: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f7931e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f7931e',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: "'NotoSansLao-Regular', 'Roboto', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
  },
});

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('themeMode', newMode ? 'dark' : 'light');
  };

  const themeName = isDarkMode ? 'ໂໝດມືດ' : 'ໂໝດແຈ້ງ';

  // Apply theme to body for consistent background
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#f8f9fa';
    document.body.style.color = isDarkMode ? '#ffffff' : '#333333';
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [isDarkMode]);

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    themeName,
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProviderWrapper');
  }
  return context;
};