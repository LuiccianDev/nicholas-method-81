import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NicholasProvider } from '@/state/NicholasContext';
import ParametersForm from './components/ParametersForm';
import CardResult from './components/CardResult';
import BarChart from './components/BarChart';
import ScoringMatrixView from './components/ScoringMatrixView';
import { useNicholasContext } from '@/state/NicholasContext';

function CalculatorContent() {
  const {
    input,
    updateInput,
    results,
    chartData,
    absoluteBest,
    bestUnderground,
  } = useNicholasContext();

  const [showMatrix, setShowMatrix] = useState(false);

  const onOpenDetails = useCallback(() => setShowMatrix(true), []);
  const onCloseDetails = useCallback(() => setShowMatrix(false), []);

  return (
    <motion.div className="mx-auto grid w-full grid-cols-1 gap-10 px-4 pt-30 md:px-20 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]">
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
            <ScoringMatrixView results={results} onBack={onCloseDetails} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NicholasCalculator() {
  return (
    <NicholasProvider>
      <CalculatorContent />
    </NicholasProvider>
  );
}
