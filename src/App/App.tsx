import { Suspense, lazy, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { NicholasProvider } from '../state/calculator';
import ParametersForm from './components/ParametersForm';
import CardResult from './components/CardResult';
import BarChart from './components/BarChart';
import { useNicholasContext } from '../state/calculator';

const ScoringMatrixModal = lazy(
  () => import('./components/ScoringMatrixModal')
);

function CalculatorContent() {
  const {
    input,
    updateInput,
    results,
    chartData,
    absoluteBest,
    bestUnderground,
    isPending, //! Verifca que realiza el pending ?
  } = useNicholasContext();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const onOpenDetails = useCallback(() => setIsDetailsOpen(true), []);
  const onCloseDetails = useCallback(() => setIsDetailsOpen(false), []);

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.6,
          },
        }}
      >
        <ParametersForm input={input} updateInput={updateInput} />

        <div className="flex flex-col gap-6">
          <CardResult
            bestMethod={bestUnderground}
            absoluteBest={absoluteBest}
            onOpenDetails={onOpenDetails}
          />
          <BarChart chartData={chartData} />
        </div>
      </motion.div>

      <Suspense fallback={null}>
        <ScoringMatrixModal
          isOpen={isDetailsOpen}
          onClose={onCloseDetails}
          results={results}
        />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <NicholasProvider>
      <CalculatorContent />
    </NicholasProvider>
  );
}
