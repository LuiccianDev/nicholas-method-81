import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../state/theme';

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
      ease: [0.215, 0.61, 0.355, 1.0] as const,
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

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-border pb-5 md:flex-row md:items-end"
      id="top"
    >
      <div className="max-w-xl">
        <motion.p
          variants={itemVariants}
          className="mb-2 font-mono text-xxs tracking-widest  uppercase"
        >
          Mining Method Advisor
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-serif text-3xl leading-none font-bold tracking-tight  italic md:text-5xl"
        >
          Nicholas Selector .
        </motion.h1>
      </div>
      <div className="flex w-full flex-col items-start gap-x-8 gap-y-3 md:w-auto md:flex-row md:items-end">
        <motion.button
          suppressHydrationWarning
          variants={themeToggleVariants}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex cursor-pointer items-center justify-center rounded-full border border-border p-2 transition-all duration-300 "
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Current theme: ${theme}`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        <div className="text-left md:text-right">
          <motion.p
            variants={rightItemVariants}
            className="font-mono text-xs "
          >
            REF: DAVID E. NICHOLAS / OPTIMIZATION ENGINE
          </motion.p>
          <motion.p
            variants={rightItemVariants}
            className="font-mono text-xs "
          >
            EST. 1981 / ROCK MECHANICS
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
}
