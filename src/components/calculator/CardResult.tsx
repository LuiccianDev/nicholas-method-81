import { memo } from 'react';
import { type ScoredMethod } from '../../types';
import { ListTree } from 'lucide-react';
import Button from '../ui/Button';

interface CardResultProps {
  bestMethod?: ScoredMethod;
  absoluteBest?: ScoredMethod;
  onOpenDetails: () => void;
}

const CardResult = memo(function CardResult({
  bestMethod,
  absoluteBest,
  onOpenDetails,
}: CardResultProps) {
  const isSurfaceMoreViable =
    absoluteBest?.method === 'Open Pit' &&
    absoluteBest.total > (bestMethod?.total || 0);

  return (
    <>
      <h2 className="text-xs font-bold tracking-widest uppercase">
        02 / Method Recommendation
      </h2>
      <div className="relative flex min-h-72 w-full min-w-0 flex-col border border-t-2 border-border border-t-primary bg-card p-6 sm:p-8">
        <div className="mb-auto space-y-3">
          <p className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-none wrap-break-word text-secondary italic">
            {bestMethod?.method || 'None.'}
          </p>
          <p className="text-lg font-light tracking-tight sm:text-xl md:text-2xl">
            Optimal Underground Method
          </p>
        </div>

        <div className="mt-4 grid gap-4">
          <p className="max-w-auto text-sm leading-relaxed">
            Based on the{' '}
            <strong className="text-secondary italic">Geometry</strong> and{' '}
            <strong className="text-secondary italic">Rock Mechanics</strong>{' '}
            supplied, Nicholas' numerical logic isolates this approach to
            maximize underground extraction viability.
          </p>

          {isSurfaceMoreViable && (
            <div className="max-w-auto gap-4 border border-border bg-surface-muted p-4">
              <p className="font-mono text-xxs leading-relaxed">
                <strong className="">SURFACE COMPARISON:</strong> Note that{' '}
                <span className="text-foreground italic">Open Pit</span> scored
                higher overall technical viability ({absoluteBest.total} pts).
                It is maintained in the selection matrix as a baseline for
                surface-transition comparisons.
              </p>
            </div>
          )}
        </div>

        <Button
          variant="icon"
          onClick={onOpenDetails}
          className="absolute top-4 right-4"
          title="View Full Calculation Matrix"
        >
          <ListTree className="size-10" />
        </Button>
      </div>
    </>
  );
});

export default CardResult;
