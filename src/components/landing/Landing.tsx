import { motion } from 'motion/react';
import Navigation from './Navigation';
import Hero from './Hero';
import VisualDashboard from './Visual';

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F8F9F8] min-h-screen text-black"
    >
      <Navigation />
      <Hero />
      <VisualDashboard />
    </motion.div>
  );
}
