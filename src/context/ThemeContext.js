import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const value = {
    isDarkMode,
    theme: {
      colors: isDarkMode ? darkColors : lightColors,
    },
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightColors = {
  background: '#fff',
  cardBackground: '#fff',
  text: '#333',
  textSecondary: '#666',
  textTertiary: '#9ca3af',
  border: '#e5e7eb',
  inputBackground: '#f3f4f6',
  sectionBackground: '#f9fafb',
  gradient: ['#667eea', '#764ba2'],
  primary: '#667eea',
  headerText: '#fff',
  tabBar: '#fff',
  tabBarInactive: '#9ca3af',
};

const darkColors = {
  background: '#1a1a2e',
  cardBackground: '#16213e',
  text: '#e5e5e5',
  textSecondary: '#b0b0b0',
  textTertiary: '#6b7280',
  border: '#2d3748',
  inputBackground: '#0f3460',
  sectionBackground: '#0f3460',
  gradient: ['#667eea', '#764ba2'],
  primary: '#667eea',
  headerText: '#fff',
  tabBar: '#16213e',
  tabBarInactive: '#6b7280',
};
