import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark' | 'system';
type ThemeColors = {
  background: string;
  text: string;
  secondaryText: string;
  button: string;
  border: string;
  cardBackground: string;
};

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme: ThemeColors = {
  background: '#f5f5f5',
  text: '#333',
  secondaryText: '#666',
  button: '#007AFF',
  border: '#ccc',
  cardBackground: '#fff',
};

const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  text: '#fff',
  secondaryText: '#aaa',
  button: '#40C4FF',
  border: '#444',
  cardBackground: '#2a2a2a',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('system');
  const [colors, setColors] = useState<ThemeColors>(
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme // Initialize based on system theme
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme as ThemeType);
          if (savedTheme === 'system') {
            const systemTheme = Appearance.getColorScheme();
            setColors(systemTheme === 'dark' ? darkTheme : lightTheme);
          } else {
            setColors(savedTheme === 'dark' ? darkTheme : lightTheme);
          }
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setColors(colorScheme === 'dark' ? darkTheme : lightTheme);
      }
    });

    return () => subscription.remove();
  }, [theme]);

  const handleSetTheme = async (newTheme: ThemeType) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
      if (newTheme === 'system') {
        const colorScheme = Appearance.getColorScheme();
        setColors(colorScheme === 'dark' ? darkTheme : lightTheme);
      } else {
        setColors(newTheme === 'dark' ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};