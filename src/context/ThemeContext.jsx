import { createContext, useState, useEffect } from 'react';
import { themes } from '../data/services';

export const ThemeContext = createContext();

// Define a constant for 'system' theme
const SYSTEM_THEME = 'system';

// Helper function to get the current system theme preference
const getSystemThemePreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Add system theme to the available themes
const extendedThemes = [
  { id: SYSTEM_THEME, name: 'System Default', icon: 'computer' },
  ...themes
];

export const ThemeProvider = ({ children }) => {
  // Use 'system' as the default theme
  const [currentTheme, setCurrentTheme] = useState(SYSTEM_THEME);
  // This will store the actual theme to apply (light/dark/purple/green)
  const [effectiveTheme, setEffectiveTheme] = useState(getSystemThemePreference());
  
  // Apply theme class to body element
  useEffect(() => {
    // Calculate the effective theme - if system is selected, use the system preference
    const themeToApply = currentTheme === SYSTEM_THEME ? effectiveTheme : currentTheme;
    
    // Handle dark mode - only add dark class for the dark theme
    if (themeToApply === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Applied dark theme based on', currentTheme === SYSTEM_THEME ? 'system preference' : 'user selection');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Applied light theme based on', currentTheme === SYSTEM_THEME ? 'system preference' : 'user selection');
    }
    
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-purple', 'theme-green');
    // Add current theme class
    document.body.classList.add(`theme-${themeToApply}`);
    
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
    if (themeToApply === 'light') {
      root.style.setProperty('--primary-color', '#4f46e5');
      root.style.setProperty('--primary-dark-color', '#4338ca');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#8b5cf6');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #4f46e5, #6366f1)');
      root.style.setProperty('--card-hover-color', 'rgba(79, 70, 229, 0.1)');
    } else if (themeToApply === 'dark') {
      root.style.setProperty('--primary-color', '#6366f1');
      root.style.setProperty('--primary-dark-color', '#4f46e5');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#8b5cf6');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #6366f1, #8b5cf6)');
      root.style.setProperty('--card-hover-color', 'rgba(99, 102, 241, 0.2)');
    } else if (themeToApply === 'purple') {
      root.style.setProperty('--primary-color', '#8b5cf6');
      root.style.setProperty('--primary-dark-color', '#7c3aed');
      root.style.setProperty('--secondary-color', '#ec4899');
      root.style.setProperty('--accent-color', '#d946ef');
      root.style.setProperty('--button-gradient', 'linear-gradient(to right, #8b5cf6, #d946ef)');
      root.style.setProperty('--card-hover-color', 'rgba(139, 92, 246, 0.2)');
    } else if (themeToApply === 'green') {
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
      const colorToApply = themeColors[themeToApply] || '#4f46e5';
      themeColorMeta.setAttribute('content', colorToApply);
    }
    
    // Store user preference
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme, effectiveTheme]);

  // Load saved theme on initial render and detect system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === SYSTEM_THEME || themes.some(theme => theme.id === savedTheme)) {
        setCurrentTheme(savedTheme);
      }
    } else {
      // Default to system theme if no preference is saved
      setCurrentTheme(SYSTEM_THEME);
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Update the effective theme if system preference changes and we're using system theme
      if (currentTheme === SYSTEM_THEME) {
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setCurrentTheme, 
      effectiveTheme,
      themes: extendedThemes,
      SYSTEM_THEME,
      isSystemTheme: currentTheme === SYSTEM_THEME,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};