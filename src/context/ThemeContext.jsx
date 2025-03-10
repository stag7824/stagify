import { createContext, useState, useEffect } from 'react';
import { themes } from '../data/services';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  
  // Apply theme class to body element
  useEffect(() => {
    // Handle dark mode - only add dark class for the dark theme
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-purple', 'theme-green');
    // Add current theme class
    document.body.classList.add(`theme-${currentTheme}`);
    
    // Apply theme-specific CSS variables
    const root = document.documentElement;
    
    // Reset all theme variables
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--primary-dark-color');
    root.style.removeProperty('--secondary-color');
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--button-gradient');
    root.style.removeProperty('--card-hover-color');
    
    // Set theme-specific variables
    if (currentTheme === 'light') {
      root.style.setProperty('--primary-color', '#4f46e5');
      root.style.setProperty('--primary-dark-color', '#4338ca');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#8b5cf6');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #4f46e5, #6366f1)');
      root.style.setProperty('--card-hover-color', 'rgba(79, 70, 229, 0.1)');
    } else if (currentTheme === 'dark') {
      root.style.setProperty('--primary-color', '#6366f1');
      root.style.setProperty('--primary-dark-color', '#4f46e5');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#8b5cf6');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #6366f1, #8b5cf6)');
      root.style.setProperty('--card-hover-color', 'rgba(99, 102, 241, 0.2)');
    } else if (currentTheme === 'purple') {
      root.style.setProperty('--primary-color', '#8b5cf6');
      root.style.setProperty('--primary-dark-color', '#7c3aed');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#d946ef');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #8b5cf6, #d946ef)');
      root.style.setProperty('--card-hover-color', 'rgba(139, 92, 246, 0.2)');
    } else if (currentTheme === 'green') {
      root.style.setProperty('--primary-color', '#10b981');
      root.style.setProperty('--primary-dark-color', '#059669');
      root.style.setProperty('--secondary-color', '#06b6d4');
      root.style.setProperty('--accent-color', '#34d399');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #10b981, #34d399)');
      root.style.setProperty('--card-hover-color', 'rgba(16, 185, 129, 0.2)');
    }
    
    // Update theme color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const themeColors = {
        light: '#4f46e5',
        dark: '#1f2937',
        purple: '#8b5cf6',
        green: '#10b981'
      };
      themeColorMeta.setAttribute('content', themeColors[currentTheme] || '#4f46e5');
    }
    
    // Store user preference
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Load saved theme on initial render and detect system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.some(theme => theme.id === savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only auto-switch if user hasn't explicitly set a theme
      if (!localStorage.getItem('theme')) {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};