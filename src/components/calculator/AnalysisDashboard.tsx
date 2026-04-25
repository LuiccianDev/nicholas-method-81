import { lazy } from 'react';
import { type ScoredMethod, type ChartDataRow } from '../../types';
import BestMethodCard from './BestMethodCard';

const ComparisonChart = lazy(() => import('./ComparisonChart'));

interface AnalysisDashboardProps {
  bestUnderground: ScoredMethod | undefined;
  absoluteBest: ScoredMethod | undefined;
  chartData: ChartDataRow[];
  results: ScoredMethod[];
  onOpenDetails: () => void;
}

export default function AnalysisDashboard({
  bestUnderground,
  absoluteBest,
  chartData,
  results,
  onOpenDetails,
}: AnalysisDashboardProps) {
  return (
    <div className="scroll-elegant flex min-h-0 flex-col lg:col-span-8 lg:h-full lg:overflow-y-auto lg:px-4">
      <BestMethodCard
        bestMethod={bestUnderground}
        absoluteBest={absoluteBest}
        onOpenDetails={onOpenDetails}
      />
      <ComparisonChart chartData={chartData} results={results} />
    </div>
  );
}
