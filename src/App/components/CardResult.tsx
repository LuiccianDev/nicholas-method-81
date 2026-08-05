import { memo } from 'react';
import { type ScoredMethod } from '../../types';
import { ListTree } from 'lucide-react';

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
      <h2 className="font-boldonse text-[10px] tracking-widest uppercase">
        02 / Method Recommendation
      </h2>
      <div className="relative flex min-h-72 w-full flex-col rounded-xl bg-secondary p-6 sm:p-8">
        <div className="mb-auto space-y-3">
          <p className="font-boldonse text-[clamp(2rem,4vw,2.6rem)] italic">
            {bestMethod?.method || 'None.'}
          </p>
          <p className="font-roboto text-2xl tracking-tight">
            Optimal Underground Method
          </p>
        </div>

        <div className="mt-4 grid gap-4">
          <p className="max-w-auto text-[15px] leading-relaxed">
            Based on the{' '}
            <strong className="text-quaternary italic">Geometry</strong> and{' '}
            <strong className="text-quaternary italic">Rock Mechanics</strong>{' '}
            supplied, Nicholas' numerical logic isolates this approach to
            maximize underground extraction viability.
          </p>

          {isSurfaceMoreViable && (
            <div className="max-w-auto gap-4 rounded-xl border border-border bg-background/80 p-4">
              <p className="font-monserrate text-[12px] leading-relaxed">
                <strong>SURFACE COMPARISON:</strong> Note that{' '}
                <span className="italic">Open Pit</span> scored higher overall
                technical viability ({absoluteBest.total} pts). It is maintained
                in the selection matrix as a baseline for surface-transition
                comparisons.
              </p>
            </div>
          )}
        </div>

        <div
          onClick={onOpenDetails}
          className="absolute top-4 right-4 cursor-pointer"
          title="View Full Calculation Matrix"
        >
          <ListTree className="size-8" />
        </div>
      </div>
    </>
  );
});

export default CardResult;
