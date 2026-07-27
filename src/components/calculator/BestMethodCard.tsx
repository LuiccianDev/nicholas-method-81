import { memo } from 'react';
import { type ScoredMethod } from '../../types';
import { ListTree } from 'lucide-react';

interface BestMethodCardProps {
  bestMethod?: ScoredMethod;
  absoluteBest?: ScoredMethod;
  onOpenDetails: () => void;
}

const BestMethodCard = memo(function BestMethodCard({
  bestMethod,
  absoluteBest,
  onOpenDetails,
}: BestMethodCardProps) {
  const isSurfaceMoreViable =
    absoluteBest?.method === 'Open Pit' &&
    absoluteBest.total > (bestMethod?.total || 0);

  return (
    <>
      <div className="relative flex min-h-72 flex-col border border-t-2 border-border border-t-primary bg-card p-6 sm:p-8">
        <div className="mb-auto space-y-3">
          <p className="max-w-[12ch] font-serif text-[clamp(2.5rem,5vw,5rem)] leading-none break-words text-secondary italic drop-shadow-sm dark:text-primary">
            {bestMethod?.method || 'None.'}
          </p>
          <p className="text-lg font-light tracking-tight text-foreground-muted sm:text-xl md:text-2xl">
            Optimal Underground Method
          </p>
        </div>

        <div className="mt-4 grid gap-4">
          <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
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
            <div className="flex max-w-2xl items-start gap-4 border border-border bg-surface-muted p-4">
              <span className="mt-0.5 font-mono text-sm text-foreground-muted">
                ↳
              </span>
              <p className="font-mono text-[10px] leading-relaxed text-foreground-muted">
                <strong className="text-foreground">SURFACE COMPARISON:</strong>{' '}
                Note that{' '}
                <span className="text-foreground italic">Open Pit</span> scored
                higher overall technical viability ({absoluteBest.total} pts).
                It is maintained in the selection matrix as a baseline for
                surface-transition comparisons.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onOpenDetails}
          className="group absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-primary bg-surface/80 text-secondary backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-surface dark:text-primary dark:hover:bg-primary"
          title="View Full Calculation Matrix"
        >
          <ListTree className="h-5 w-5" />
        </button>
      </div>
    </>
  );
});

export default BestMethodCard;
