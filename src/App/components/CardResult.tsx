import { memo, useRef } from 'react';
import { type ScoredMethod } from '../../types';
import { ListTree, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
gsap.registerPlugin(useGSAP);

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
  const containerRef = useRef<HTMLDivElement>(null);

  const isSurfaceMoreViable =
    absoluteBest?.method === 'Open Pit' &&
    absoluteBest.total > (bestMethod?.total || 0);

  useGSAP(
    () => {
      if (!bestMethod?.method) return;
      gsap.fromTo(
        '.text',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
        }
      );
    },
    { scope: containerRef, dependencies: [bestMethod?.method] }
  );

  return (
    <>
      <motion.h2
        className="font-boldonse text-[10px] tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        02 / Method Recommendation
      </motion.h2>
      <motion.div
        ref={containerRef}
        className="relative flex min-h-72 w-full flex-col rounded-xl bg-secondary p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mb-auto space-y-3">
          <p className="text font-boldonse text-[clamp(2rem,4vw,2.6rem)] italic">
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
          className="absolute top-4 right-4 flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-black px-3.5 py-2 font-medium text-white transition-all hover:bg-quaternary active:scale-95"
          title="View Full Calculation Matrix"
        >
          <ArrowDown className="size-5" />
          <span className="">Matrix</span>
        </div>
      </motion.div>
    </>
  );
});

export default CardResult;
