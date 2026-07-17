import { Suspense, useCallback, lazy, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { useNicholasContext } from '../../context/NicholasContext';
import ParametersForm from '../calculator/ParametersForm';
import BestMethodCard from '../calculator/BestMethodCard';
import ComparisonChart from '../calculator/ComparisonChart';

const ScoringMatrixModal = lazy(
  () => import('../calculator/ScoringMatrixModal')
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      staggerChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 1.2,
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
  } = useNicholasContext();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const onOpenDetails = useCallback(() => setIsDetailsOpen(true), []);
  const onCloseDetails = useCallback(() => setIsDetailsOpen(false), []);

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
      <motion.div
        className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex min-h-0 min-w-0 flex-col"
        >
          <ParametersForm input={input} updateInput={updateInput} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`scroll-elegant flex min-h-0 min-w-0 flex-col gap-6 transition-opacity duration-300 ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <div className="flex-none">
            <h2 className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
              02 / Method Recommendation
            </h2>
          </div>
          <div className="grid gap-6 xl:grid-rows-[auto_auto]">
            <BestMethodCard
              bestMethod={bestUnderground}
              absoluteBest={absoluteBest}
              onOpenDetails={onOpenDetails}
            />
            <ComparisonChart chartData={chartData} />
          </div>
        </motion.div>
      </motion.div>

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
