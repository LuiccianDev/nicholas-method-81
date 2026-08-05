import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantClasses = {
  primary:
    'bg-secondary text-surface hover:bg-secondary/90 dark:bg-primary dark:text-surface dark:hover:bg-primary/90',
  ghost:
    ' bg-surface/80 text-foreground-muted backdrop-blur-sm hover:border-primary hover:text-primary',
  icon: 'flex h-11 w-11 cursor-pointer items-center justify-center  border border-primary bg-surface/80 text-secondary backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-surface dark:hover:bg-primary',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className="inline-flex cursor-pointer items-center justify-center bg-secondary text-surface transition-all duration-300 hover:bg-secondary/90 dark:bg-primary dark:text-surface dark:hover:bg-primary/90">
      {children}
    </button>
  );
}
