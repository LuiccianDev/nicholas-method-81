import { motion } from 'motion/react';
import Navigation from './Navigation';
import HeroVisual from './HeroVisual';

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white pt-[72px] text-black"
    >
      <Navigation />
      <HeroVisual />
    </motion.div>
  );
}
