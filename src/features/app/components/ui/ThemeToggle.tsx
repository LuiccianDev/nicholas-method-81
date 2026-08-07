import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/state/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface-muted p-2 text-foreground-muted transition-all duration-300 hover:border-primary hover:bg-card hover:text-primary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Current theme: ${theme}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
