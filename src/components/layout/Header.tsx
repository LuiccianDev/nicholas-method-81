import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export default function Header({ toggleTheme, theme }: HeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0] as const, // Quartic ease out
      },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0] as const,
      },
    },
  };

  const themeToggleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0] as const,
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end"
    >
      <div className="max-w-xl">
        <motion.p
          variants={itemVariants}
          className="mb-2 font-mono text-[10px] tracking-[0.3em] text-primary uppercase"
        >
          Mining Method Advisor
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl leading-none font-bold tracking-tight text-foreground italic md:text-6xl"
        >
          Nicholas Selector
          <span className="text-primary">.</span>
        </motion.h1>
      </div>
      <div className="flex w-full flex-col items-start gap-x-8 gap-y-4 md:w-auto md:flex-row md:items-end">
        <motion.button
          variants={themeToggleVariants}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface-muted p-2 text-foreground-muted transition-all duration-300 hover:border-primary hover:bg-card hover:text-primary"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Current theme: ${theme}`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        <div className="text-left md:text-right">
          <motion.p
            variants={rightItemVariants}
            className="font-mono text-xs text-foreground-muted"
          >
            REF: DAVID E. NICHOLAS / OPTIMIZATION ENGINE
          </motion.p>
          <motion.p
            variants={rightItemVariants}
            className="font-mono text-xs text-foreground-muted"
          >
            EST. 1981 / ROCK MECHANICS
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
}
