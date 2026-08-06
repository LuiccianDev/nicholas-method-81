import { ArrowLeft, TableProperties } from 'lucide-react';
import { type ScoredMethod } from '../../types';
import RankingTable from './RankingTable';

interface ScoringMatrixViewProps {
  results: ScoredMethod[];
  onBack: () => void;
}

export default function ScoringMatrixView({
  results,
  onBack,
}: ScoringMatrixViewProps) {
  return (
    <>
      <h2 className="font-boldonse text-[10px] tracking-widest uppercase">
        02 / Full Scoring Matrix
      </h2>
      <div className="relative flex min-h-72 w-full flex-col rounded-xl bg-secondary p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <TableProperties className="size-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl italic">Result Matrix</h3>
              <p className="text-xxs tracking-widest uppercase">
                Numerical Breakdown / Nicholas Optimization
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium transition-all hover:border-primary/50 hover:bg-background/80 active:scale-95"
            title="Return to Summary view"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Summary</span>
          </button>
        </div>

        {/* Body */}
        <div className="scroll-elegant flex-1 overflow-y-auto">
          <RankingTable results={results} />
        </div>
      </div>
    </>
  );
}
