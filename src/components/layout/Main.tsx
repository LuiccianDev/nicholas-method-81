import { Suspense, useCallback, lazy, useState } from 'react';
import { useNicholasCalculator } from '../../hooks/useNicholasCalculator';
import ParametersForm from '../calculator/ParametersForm';
import BestMethodCard from '../calculator/BestMethodCard';
import ComparisonChart from '../calculator/ComparisonChart';

const ScoringMatrixModal = lazy(
  () => import('../calculator/ScoringMatrixModal')
);

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
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="grid h-full grid-cols-1 gap-x-8 lg:grid-cols-12">
        {/* Input Column */}
        <ParametersForm input={input} updateInput={updateInput} />
        <div
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
        </div>
      </div>

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
