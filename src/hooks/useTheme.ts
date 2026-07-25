import { useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'theme' as const;
const LIGHT_THEME = 'light' as const;
const DARK_THEME = 'dark' as const;

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return LIGHT_THEME;
  const t = (window as any).__INITIAL_THEME__;
  return t === DARK_THEME || t === LIGHT_THEME ? t : LIGHT_THEME;
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
