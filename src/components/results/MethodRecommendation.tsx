
import { type ScoredMethod } from '../../types';
import { ListTree } from 'lucide-react';

interface MethodRecommendationProps {
  bestMethod?: ScoredMethod;
  absoluteBest?: ScoredMethod;
  onOpenDetails: () => void;
}

export default function MethodRecommendation({
  bestMethod,
  absoluteBest,
  onOpenDetails,
}: MethodRecommendationProps) {
  const isSurfaceMoreViable =
    absoluteBest?.method === 'Open Pit' &&
    absoluteBest.total > (bestMethod?.total || 0);

  return (
    <div className="border-border border-t-primary bg-card relative mb-8 flex flex-col border border-t-2 p-8">
      <div className="mb-auto">
        <p className="text-primary font-serif text-[48px] leading-none wrap-break-word italic drop-shadow-sm sm:text-[64px] md:text-[80px]">
          {bestMethod?.method || 'None.'}
        </p>
        <p className="text-foreground-muted mt-2 text-xl font-light tracking-tight md:text-3xl">
          Optimal Underground Method
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-foreground-muted max-w-2xl text-sm leading-relaxed">
          Based on the{' '}
          <span className="text-foreground italic underline">
            Geometry
          </span>{' '}
          and{' '}
          <span className="text-foreground italic underline">
            Rock Mechanics
          </span>{' '}
          supplied, Nicholas' numerical logic isolates this approach to maximize
          underground extraction viability.
        </p>

        {isSurfaceMoreViable && (
          <div className="border-border bg-surface-muted mt-4 flex max-w-2xl items-start gap-4 border p-4">
            <span className="text-foreground-muted mt-0.5 font-mono text-sm">
              ↳
            </span>
            <p className="text-foreground-muted font-mono text-[11px] leading-relaxed">
              <strong className="text-foreground">
                SURFACE COMPARISON:
              </strong>{' '}
              Note that{' '}
              <span className="text-foreground italic">Open Pit</span>{' '}
              scored higher overall technical viability ({absoluteBest.total}{' '}
              pts). It is maintained in the selection matrix as a baseline for
              surface-transition comparisons.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
          <div className="border-primary border-l-2 pl-4">
            <p className="text-foreground-muted text-[10px] uppercase">
              Total Score
            </p>
            <p className="text-foreground font-mono text-lg tracking-tighter">
              {bestMethod?.total || 0}
            </p>
          </div>
          <div className="border-primary border-l-2 pl-4">
            <p className="text-foreground-muted text-[10px] uppercase">
              Geo Component
            </p>
            <p className="text-primary font-mono text-lg tracking-tighter opacity-90">
              {bestMethod?.geometryScore || 0}
            </p>
          </div>
          <div className="border-secondary hidden border-l-2 pl-4 sm:block">
            <p className="text-foreground-muted text-[10px] uppercase">
              Rock Component
            </p>
            <p className="text-secondary font-mono text-lg tracking-tighter">
              {bestMethod?.rockTotal || 0}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onOpenDetails}
        className="border-primary text-primary hover:bg-primary hover:text-surface group absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-300"
        title="View Full Calculation Matrix"
      >
        <ListTree className="h-5 w-5" />
      </button>
    </div>
  );
}
