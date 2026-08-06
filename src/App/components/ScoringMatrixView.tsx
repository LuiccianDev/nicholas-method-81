import { ArrowUp } from 'lucide-react';
import { type ScoredMethod } from '../../types';
import RankingTable from './RankingTable';
import { motion } from 'motion/react';

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
      <motion.h2
        className="pb-4 font-boldonse text-[10px] tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        04 / Result Matrix
      </motion.h2>
      <motion.div
        className="relative mb-15 flex min-h-72 w-full flex-col rounded-xl bg-secondary p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-monserrate text-[14px] font-bold tracking-widest uppercase">
            Numerical Breakdown / Nicholas Optimization
          </p>

          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white transition-all hover:bg-quaternary active:scale-95"
            title="Return to Summary view"
          >
            <ArrowUp className="size-5" />
            <span>Back to Summary</span>
          </button>
        </div>

        {/* Body */}
        <div className="scroll-elegant flex-1 overflow-y-auto">
          <RankingTable results={results} />
        </div>
      </motion.div>
    </>
  );
}
