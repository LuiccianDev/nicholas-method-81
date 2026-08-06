import { Suspense, lazy, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NicholasProvider } from '../state/calculator';
import ParametersForm from './components/ParametersForm';
import CardResult from './components/CardResult';
import BarChart from './components/BarChart';
import { useNicholasContext } from '../state/calculator';

const ScoringMatrixView = lazy(() => import('./components/ScoringMatrixView'));

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

  const [showMatrix, setShowMatrix] = useState(false);

  const onOpenDetails = useCallback(() => setShowMatrix(true), []);
  const onCloseDetails = useCallback(() => setShowMatrix(false), []);

  return (
    <motion.div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]">
      <ParametersForm input={input} updateInput={updateInput} />

      <AnimatePresence mode="wait">
        {!showMatrix ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <CardResult
              bestMethod={bestUnderground}
              absoluteBest={absoluteBest}
              onOpenDetails={onOpenDetails}
            />
            <BarChart chartData={chartData} />
          </motion.div>
        ) : (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Suspense fallback={null}>
              <ScoringMatrixView results={results} onBack={onCloseDetails} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  return (
    <NicholasProvider>
      <CalculatorContent />
    </NicholasProvider>
  );
}
