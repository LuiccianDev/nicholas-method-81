import { Suspense, lazy, useCallback, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { NicholasProvider } from './state/calculator';
import ParametersForm from './components/calculator/ParametersForm';
import BestMethodCard from './components/calculator/BestMethodCard';
import ComparisonChart from './components/calculator/ComparisonChart';
import { useNicholasContext } from './state/calculator';

const ScoringMatrixModal = lazy(
  () => import('./components/calculator/ScoringMatrixModal')
);

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

function CalculatorContent() {
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
        className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]"
        initial={{ opacity: 0 }}
        animate={{opacity: 1,transition: {
            type: 'spring',
            staggerChildren: 0.25,
          }}}
      >
        <motion.div
          variants={itemVariants}
          className="flex min-h-0 min-w-0 flex-col"
        >
          <ParametersForm input={input} updateInput={updateInput} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`flex min-h-0 scroll-elegant min-w-0 flex-col gap-6 transition-opacity duration-300 ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <div className="flex-none">
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
              02 / Method Recommendation
            </h2>
          </div>
          <div className="grid w-full min-w-0 gap-6 xl:grid-rows-[auto_auto]">
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

export default function App() {
  return (
    <NicholasProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <CalculatorContent />
      </div>
    </NicholasProvider>
  );
}
