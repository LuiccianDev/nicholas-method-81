import { type ScoredMethod } from '../../types';

export default function MethodRecommendation({
  bestMethod,
  absoluteBest,
}: {
  bestMethod?: ScoredMethod;
  absoluteBest?: ScoredMethod;
}) {
  const isSurfaceMoreViable =
    absoluteBest?.method === 'Open Pit' &&
    absoluteBest.total > (bestMethod?.total || 0);

  return (
    <div className="relative mb-8 flex flex-col border border-t-2 border-[#333] border-t-[#D4AF37] bg-[#1a1a1a] p-8">
      <div className="mb-auto">
        <p className="font-serif text-[48px] leading-none wrap-break-word text-[#D4AF37] italic drop-shadow-sm sm:text-[64px] md:text-[80px]">
          {bestMethod?.method || 'None.'}
        </p>
        <p className="mt-2 text-xl font-light tracking-tight text-[#A3A3A3] md:text-3xl">
          Optimal Underground Method
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <p className="max-w-2xl text-sm leading-relaxed text-[#bbb]">
          Based on the{' '}
          <span className="text-white italic underline">Geometry</span> and{' '}
          <span className="text-white italic underline">Rock Mechanics</span>{' '}
          supplied, Nicholas' numerical logic isolates this approach to maximize
          underground extraction viability.
        </p>

        {isSurfaceMoreViable && (
          <div className="mt-4 flex max-w-2xl items-start gap-4 border border-[#333] bg-[#141414] p-4">
            <span className="mt-0.5 font-mono text-sm text-[#A3A3A3]">↳</span>
            <p className="font-mono text-[11px] leading-relaxed text-[#A3A3A3]">
              <strong className="text-[#ddd]">SURFACE COMPARISON:</strong> Note
              that <span className="text-[#E5E5E5] italic">Open Pit</span>{' '}
              scored higher overall technical viability ({absoluteBest.total}{' '}
              pts). It is maintained in the selection matrix as a baseline for
              surface-transition comparisons.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
          <div className="border-l-2 border-[#D4AF37] pl-4">
            <p className="text-[10px] text-[#A3A3A3] uppercase">Total Score</p>
            <p className="font-mono text-lg tracking-tighter text-white">
              {bestMethod?.total || 0}
            </p>
          </div>
          <div className="border-l-2 border-[#D4AF37] pl-4">
            <p className="text-[10px] text-[#A3A3A3] uppercase">
              Geo Component
            </p>
            <p className="font-mono text-lg tracking-tighter text-[#D4AF37] opacity-90">
              {bestMethod?.geometryScore || 0}
            </p>
          </div>
          <div className="hidden border-l-2 border-[#B87333] pl-4 sm:block">
            <p className="text-[10px] text-[#A3A3A3] uppercase">
              Rock Component
            </p>
            <p className="font-mono text-lg tracking-tighter text-[#B87333]">
              {bestMethod?.rockTotal || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 hidden sm:flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37] text-xl text-[#D4AF37]/50">
          ↘
        </div>
      </div>
    </div>
  );
}
