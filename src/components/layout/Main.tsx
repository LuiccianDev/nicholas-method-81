import { Suspense, useCallback, lazy, useState } from 'react';
import { motion , type Variants} from 'motion/react';
import { useNicholasCalculator } from '../../hooks/useNicholasCalculator';
import ParametersForm from '../calculator/ParametersForm';
import BestMethodCard from '../calculator/BestMethodCard';
import ComparisonChart from '../calculator/ComparisonChart';

const ScoringMatrixModal = lazy(
  () => import('../calculator/ScoringMatrixModal')
);

// Framer Motion Variants & Styles

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring', 
      staggerChildren: 0.25,
    },
  },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, x: 50},
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      type: 'spring', 
      bounce: 0, 
      duration: 1.2 
    },
  },
};

export default function Main() {
  const {
    input,
    updateInput,
    results,
    chartData,
    absoluteBest,
    bestUnderground,
    isPending,
  } = useNicholasCalculator();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const onOpenDetails = useCallback(() => setIsDetailsOpen(true), []);
  const onCloseDetails = useCallback(() => setIsDetailsOpen(false), []);

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
      <motion.div 
        className="grid h-full grid-cols-1 gap-x-8 lg:grid-cols-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Input Column */}
        <motion.div 
          variants={itemVariants} 
          className="flex min-h-0 flex-col lg:col-span-4 lg:h-full"
        >
          <ParametersForm input={input} updateInput={updateInput} />
        </motion.div>
        
        {/* Results Column */}
        <motion.div
          variants={itemVariants}
          className={`scroll-elegant flex min-h-0 flex-col transition-opacity duration-300 lg:col-span-8 lg:h-full lg:overflow-y-auto lg:px-2 ${
            isPending ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <BestMethodCard
            bestMethod={bestUnderground}
            absoluteBest={absoluteBest}
            onOpenDetails={onOpenDetails}
          />
          <ComparisonChart chartData={chartData} />
        </motion.div>
      </motion.div>

      {/* Details Modal */}
      <Suspense fallback={null}>
        <ScoringMatrixModal
          isOpen={isDetailsOpen}
          onClose={onCloseDetails}
          results={results}
        />
      </Suspense>
    </main>
  );
}
