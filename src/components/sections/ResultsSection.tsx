import { type ScoredMethod, type ChartDataRow } from '../../types';
import MethodRecommendation from '../results/MethodRecommendation';
import SelectionMatrix from '../results/SelectionMatrix';

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
      <SelectionMatrix chartData={chartData} results={results} />
    </div>
  );
}
