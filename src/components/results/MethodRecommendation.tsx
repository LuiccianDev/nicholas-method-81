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
    <>
      <div className="mb-4 lg:col-span-8 lg:px-6">
        <h2 className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
          02 / Method Recommendation
        </h2>
      </div>
      <div className="relative mb-8 flex flex-col border border-t-2 border-border border-t-primary bg-card p-8">
        <div className="mb-auto">
          <p className="font-serif text-[48px] leading-none wrap-break-word text-primary italic drop-shadow-sm sm:text-[64px] md:text-[80px]">
            {bestMethod?.method || 'None.'}
          </p>
          <p className="mt-2 text-xl font-light tracking-tight text-foreground-muted md:text-3xl">
            Optimal Underground Method
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">
            Based on the{' '}
            <span className="text-foreground italic underline">Geometry</span>{' '}
            and{' '}
            <span className="text-foreground italic underline">
              Rock Mechanics
            </span>{' '}
            supplied, Nicholas' numerical logic isolates this approach to
            maximize underground extraction viability.
          </p>

          {isSurfaceMoreViable && (
            <div className="mt-4 flex max-w-2xl items-start gap-4 border border-border bg-surface-muted p-4">
              <span className="mt-0.5 font-mono text-sm text-foreground-muted">
                ↳
              </span>
              <p className="font-mono text-[11px] leading-relaxed text-foreground-muted">
                <strong className="text-foreground">SURFACE COMPARISON:</strong>{' '}
                Note that{' '}
                <span className="text-foreground italic">Open Pit</span> scored
                higher overall technical viability ({absoluteBest.total} pts).
                It is maintained in the selection matrix as a baseline for
                surface-transition comparisons.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-[10px] text-foreground-muted uppercase">
                Total Score
              </p>
              <p className="font-mono text-lg tracking-tighter text-foreground">
                {bestMethod?.total || 0}
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-[10px] text-foreground-muted uppercase">
                Geo Component
              </p>
              <p className="font-mono text-lg tracking-tighter text-primary opacity-90">
                {bestMethod?.geometryScore || 0}
              </p>
            </div>
            <div className="hidden border-l-2 border-secondary pl-4 sm:block">
              <p className="text-[10px] text-foreground-muted uppercase">
                Rock Component
              </p>
              <p className="font-mono text-lg tracking-tighter text-secondary">
                {bestMethod?.rockTotal || 0}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenDetails}
          className="group absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary text-primary transition-all duration-300 hover:bg-primary hover:text-surface"
          title="View Full Calculation Matrix"
        >
          <ListTree className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
