import { Suspense, lazy } from 'react';
import { type ScoredMethod, type ChartDataRow } from '../../types';
import MethodRecommendation from '../results/MethodRecommendation';

const SelectionMatrix = lazy(() => import('../results/SelectionMatrix'));

interface ResultsSectionProps {
  bestUnderground: ScoredMethod | undefined;
  absoluteBest: ScoredMethod | undefined;
  chartData: ChartDataRow[];
  results: ScoredMethod[];
  onOpenDetails: () => void;
}

export default function ResultsSection({
  bestUnderground,
  absoluteBest,
  chartData,
  results,
  onOpenDetails,
}: ResultsSectionProps) {
  return (
    <div className="lg:col-span-8 lg:px-6">
      <MethodRecommendation
        bestMethod={bestUnderground}
        absoluteBest={absoluteBest}
        onOpenDetails={onOpenDetails}
      />
      <Suspense
        fallback={
          <div className="mb-8 h-90 w-full animate-pulse border border-border bg-surface-muted" />
        }
      >
        <SelectionMatrix chartData={chartData} results={results} />
      </Suspense>
    </div>
  );
}
