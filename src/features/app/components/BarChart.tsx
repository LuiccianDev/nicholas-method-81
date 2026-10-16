import { memo } from 'react';
import { useNicholasContext } from '@/state/NicholasContext';
import { type ScoredMethod } from '@/types';
import { motion } from 'motion/react';

const METHOD_DESCRIPTORS: Record<string, string> = {
  'Sublevel Caving': 'RATING: HIGH CAVEABILITY // LOW STOPE SUPPORT COST',
  'Block Caving': 'FAVORABLE FOR MASSIVE GEOMETRY; HIGH UPFRONT CAPEX',
  'Sublevel Open Stoping': 'REQUIRES ARTIFICIAL SILL/PILLAR STABILIZATION',
  'Cut and Fill': 'HIGH OPEX // COST EXCEEDS THRESHOLD FOR COMMODITY GRADE',
  'Room and Pillar': 'DIP CONSTRAINT APPLIED // MAXIMUM GEOMETRIC LIMIT (15°)',
  'Shrinkage Stoping': 'HIGH DILUTION RISK IN VARIABLE BOUNDARIES',
  'Top Slicing': 'INTENSIVE TIMBERING AND HIGH SUPPORT REQUIREMENTS',
  'Square Set': 'VERY HIGH COST // RESERVED FOR HIGH GRADE POCKETS',
  'Longwall Mining': 'BEDDED HORIZONTAL DEPOSIT PREREQUISITE',
  'Open Pit': 'SURFACE TRANSITION BENCHMARK',
};

export default memo(function ViabilityIndexAnalysis() {
  const { results, bestUnderground } = useNicholasContext();

  // Filtrar y ordenar los métodos subterráneos
  const undergroundMethods = results.filter((r) => r.method !== 'Open Pit');
  const maxScore = Math.max(...undergroundMethods.map((m) => m.total), 1);

  return (
    <section className="space-y-4 rounded-none border border-border bg-background p-4 sm:p-5">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-border pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-text-primary uppercase">
            NM-03
          </span>
          <h2 className="font-boldonse text-xs tracking-widest text-text-primary uppercase sm:text-sm">
            Viability Index Analysis
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 border border-primary bg-primary" />
            Recommended (&gt;+30)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 bg-tertiary" />
            Viable (+10 to +30)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 bg-quaternary" />
            Disqualified (&lt;0)
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3 pt-1">
        {undergroundMethods
          .slice(0, 5)
          .map((method: ScoredMethod, idx: number) => {
            const isTop = method.method === bestUnderground?.method;
            const isEliminated = method.isEliminated || method.total < 0;
            const scorePercent = Math.max(
              0,
              Math.min(100, Math.round((method.total / maxScore) * 100))
            );
            const rankNum = String(idx + 1).padStart(2, '0');
            const descriptor =
              METHOD_DESCRIPTORS[method.method] ||
              'QUANTITATIVE SELECTION FACTOR';

            let statusLabel = 'Viable';
            let barBg = 'bg-tertiary';
            let badgeBg = 'bg-background text-text-primary border-border';

            if (isTop) {
              statusLabel = 'Highly Recommended';
              barBg = 'bg-primary border-r-2 border-primary';
              badgeBg = 'bg-primary text-text-primary border-primary font-bold';
            } else if (method.total >= 30) {
              statusLabel = 'Highly Recommended';
              barBg = 'bg-primary/80 border-r-2 border-primary';
            } else if (isEliminated) {
              statusLabel = 'Disqualified';
              barBg = 'bg-quaternary/40 border-r-2 border-quaternary';
              badgeBg =
                'bg-quaternary/20 text-quaternary border-quaternary font-semibold';
            }

            return (
              <motion.div
                key={method.method}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`relative flex flex-col justify-between gap-3 border p-3 md:flex-row md:items-center ${
                  isTop
                    ? 'border-2 border-primary bg-background'
                    : 'border-border/60 bg-background'
                } ${isEliminated ? 'opacity-85' : ''}`}
              >
                {/* Rank & Name */}
                <div className="flex min-w-[240px] items-center gap-3">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center font-mono text-xs font-bold ${
                      isTop
                        ? 'bg-primary text-text-primary'
                        : isEliminated
                          ? 'border border-quaternary bg-quaternary/20 text-quaternary'
                          : 'border border-border bg-background text-text-primary'
                    }`}
                  >
                    {rankNum}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-boldonse text-sm leading-tight tracking-tight uppercase ${
                          isEliminated
                            ? 'text-text-primary/50 line-through'
                            : 'text-text-primary'
                        }`}
                      >
                        {method.method}
                      </h3>
                      {isTop && (
                        <span className="py-0.2 border border-primary bg-primary/20 px-1.5 font-mono text-[9px] font-bold text-text-primary">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-mono text-[10px] ${
                        isEliminated
                          ? 'font-semibold text-quaternary'
                          : 'text-text-primary/60'
                      }`}
                    >
                      {isEliminated
                        ? 'DISQUALIFIED: DIP OR GEOMETRIC LIMIT'
                        : descriptor}
                    </span>
                  </div>
                </div>

                {/* Bar Visualizer */}
                <div className="flex flex-1 flex-col justify-center px-1">
                  <div className="relative flex h-6 w-full items-center overflow-hidden border border-border bg-text-primary/5">
                    <div
                      className={`h-full transition-all duration-500 ${barBg}`}
                      style={{ width: `${isEliminated ? 15 : scorePercent}%` }}
                    />
                    <span className="absolute right-3 z-10 font-mono text-[11px] font-bold text-text-primary">
                      {isEliminated
                        ? 'PENALIZED [NEGATIVE VIABILITY]'
                        : `${scorePercent}% RELATIVE SUITABILITY`}
                    </span>
                  </div>
                </div>

                {/* Suitability Category & Numeric Score */}
                <div className="flex min-w-[190px] items-center justify-between gap-3 md:justify-end">
                  <span
                    className={`border px-2 py-0.5 font-prompt text-[11px] uppercase ${badgeBg}`}
                  >
                    {statusLabel}
                  </span>
                  <span
                    className={`min-w-[4rem] text-right font-mono text-base font-bold ${
                      isEliminated
                        ? 'text-quaternary'
                        : isTop
                          ? 'text-text-primary'
                          : 'text-text-primary/80'
                    }`}
                  >
                    {method.total > 0 ? `+${method.total}` : method.total}
                  </span>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Methodology Callout Footer */}
      <div className="flex flex-col justify-between gap-2 border-t border-border pt-3 font-mono text-[11px] text-text-primary/60 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span>
            CALCULATION LOG: Σ (Ore Geometry Rank × 1.0) + (Ore Mechanics × 1.0)
            + (Wall Rock × 0.8)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>NORMALIZATION FACTOR: 1.000</span>
          <span className="font-bold text-text-primary">STATUS: CONVERGED</span>
        </div>
      </div>
    </section>
  );
});
