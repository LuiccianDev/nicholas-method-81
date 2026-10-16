import { memo, useRef } from 'react';
import { type ScoredMethod } from '@/types';
import { ArrowDown } from 'lucide-react';
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
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between border-b border-text-primary/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="border border-text-primary/20 bg-background px-2 py-0.5 font-mono text-[10px] tracking-wider text-text-primary uppercase">
            NM-02
          </span>
          <h2 className="font-boldonse text-xs tracking-widest text-text-primary uppercase">
            Method Recommendation
          </h2>
        </div>
        <span className="border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold text-text-primary uppercase">
          Rank #1 Optimal
        </span>
      </div>

      <motion.div
        ref={containerRef}
        className="relative flex w-full flex-col justify-between overflow-hidden rounded-none border-2 border-primary bg-primary p-5 sm:p-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-text-primary/15 pb-2">
            <span className="font-mono text-[10px] font-bold tracking-wider text-text-primary/80 uppercase">
              Primary Extraction Approach
            </span>
            <span className="font-mono text-[9px] text-text-primary/70 uppercase">
              Nicholas (1981)
            </span>
          </div>

          <div className="overflow-hidden py-1">
            <h1 className="text font-boldonse text-2xl leading-snug tracking-wide text-text-primary uppercase sm:text-3xl lg:text-[2rem]">
              {bestMethod?.method || 'None.'}
            </h1>
          </div>

          <p className="font-prompt text-[13px] leading-relaxed text-text-primary/90">
            Numerical optimization isolates this method to maximize extraction
            viability and control ground dilution based on supplied geometry and
            rock strength.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="border border-text-primary/20 bg-background/90 px-2 py-2 text-center">
              <span className="block font-mono text-[8px] font-bold tracking-wider text-text-primary/60 uppercase">
                Global Rank
              </span>
              <span className="font-boldonse text-base leading-tight text-text-primary">
                #1
              </span>
            </div>
            <div className="border border-text-primary/20 bg-background/90 px-2 py-2 text-center">
              <span className="block font-mono text-[8px] font-bold tracking-wider text-text-primary/60 uppercase">
                Nicholas Score
              </span>
              <span className="font-mono text-sm font-bold text-text-primary">
                +{bestMethod?.total ?? 0}
              </span>
            </div>
            <div className="border border-text-primary/20 bg-background/90 px-2 py-2 text-center">
              <span className="block font-mono text-[8px] font-bold tracking-wider text-text-primary/60 uppercase">
                HW Caveability
              </span>
              <span className="font-mono text-[11px] font-bold text-text-primary">
                OPTIMAL
              </span>
            </div>
          </div>

          {isSurfaceMoreViable && (
            <div className="mt-1 border border-text-primary/20 bg-background p-2.5">
              <p className="font-prompt text-[11px] leading-relaxed text-text-primary">
                <strong>SURFACE BENCHMARK:</strong> Open Pit scored higher
                overall ({absoluteBest.total} pts) as a surface comparison
                baseline.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-text-primary/15 pt-3">
          <span className="font-mono text-[10px] text-text-primary/80 uppercase">
            Inspect weights & scoring breakdown
          </span>
          <button
            type="button"
            onClick={onOpenDetails}
            className="flex items-center gap-1.5 border border-text-primary bg-text-primary px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-background uppercase transition-all hover:bg-background hover:text-text-primary active:scale-95"
            title="View Full Calculation Matrix"
          >
            <span>Score Matrix</span>
            <ArrowDown className="size-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
});

export default CardResult;
