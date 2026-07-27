import { useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'theme' as const;
const LIGHT_THEME = 'light' as const;
const DARK_THEME = 'dark' as const;

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return LIGHT_THEME;
  const t = (window as { __INITIAL_THEME__?: Theme }).__INITIAL_THEME__;
  return t === DARK_THEME || t === LIGHT_THEME ? t : LIGHT_THEME;
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(LIGHT_THEME, DARK_THEME);
    root.classList.add(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = (): Theme =>
      theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  }, [theme]);

  return { theme, toggleTheme };
}
