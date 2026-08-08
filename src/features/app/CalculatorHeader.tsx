import { motion } from 'motion/react';
import ThemeToggle from './components/ui/ThemeToggle';

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

export default function CalculatorHeader() {

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-5 flex flex-col items-start justify-between gap-4 pb-5 md:flex-row md:items-end"
      id="top"
    >
      <div className="max-w-xl">
        <motion.p
          variants={itemVariants}
          className="mb-4 text-[12px] tracking-widest uppercase"
        >
          Mining Method Advisor
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-boldonse text-2xl leading-none tracking-tight italic md:text-4xl"
        >
          Nicholas Selector .
        </motion.h1>
      </div>
      <div className="flex w-full flex-col items-start gap-x-8 gap-y-3 md:w-auto md:flex-row md:items-end">
        <ThemeToggle />
        <div className="text-left font-roboto text-[13px] md:text-right">
          <motion.p variants={rightItemVariants}>
            REF: DAVID E. NICHOLAS / OPTIMIZATION ENGINE
          </motion.p>
          <motion.p variants={rightItemVariants}>
            EST. 1981 / ROCK MECHANICS
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
}
