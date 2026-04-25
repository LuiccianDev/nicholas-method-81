import { useState, useEffect, useCallback } from 'react';

// Constants
const THEME_STORAGE_KEY = 'theme' as const;
const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)' as const;
const LIGHT_THEME = 'light' as const;
const DARK_THEME = 'dark' as const;

// Types
type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

/**
 * Determines the initial theme from localStorage, system preference, or default.
 * - Respects localStorage if set to 'light' or 'dark'
 * - Falls back to system preference (prefers-color-scheme)
 * - Defaults to 'dark' if no preference found
 */
const getInitialTheme = (): Theme => {
  // SSR safety: return default during server-side rendering
  if (typeof window === 'undefined') {
    return DARK_THEME;
  }

  // Priority 1: Check localStorage
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === LIGHT_THEME || storedTheme === DARK_THEME) {
    return storedTheme;
  }

  // Priority 2: Check system preference
  if (window.matchMedia(PREFERS_DARK_QUERY).matches) {
    return DARK_THEME;
  }

  // Priority 3: Default to light
  return LIGHT_THEME;
};

/**
 * Hook to manage theme state with localStorage persistence and View Transition API support.
 * Returns the current theme and a toggle function.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sync theme to document and localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    // Update CSS class for Tailwind dark mode
    root.classList.remove(LIGHT_THEME, DARK_THEME);
    root.classList.add(theme);
    
    // Persist to localStorage
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Toggle with View Transition API support
  const toggleTheme = useCallback(() => {
    const nextTheme = (): Theme => 
      theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

    if (!document.startViewTransition) {
      // Fallback for browsers without View Transition API
      setTheme(nextTheme);
      return;
    }

    // Wrap state update in View Transition
    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  }, [theme]);

  return { theme, toggleTheme };
}
