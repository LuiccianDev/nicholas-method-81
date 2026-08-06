import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { type ScoredMethod } from '../../types';
import RankingTable from './RankingTable';

interface ScoringMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ScoredMethod[];
}

export default function ScoringMatrixModal({
  isOpen,
  onClose,
  results,
}: ScoringMatrixModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-t-4 border-border border-t-primary bg-card shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h3 className="font-serif text-2xl text-secondary italic">
                  Result Matrix
                </h3>
                <p className="text-xxs tracking-widest uppercase">
                  Numerical Breakdown / Nicholas Optimization
                </p>
              </div>
              <button onClick={onClose} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="scroll-elegant overflow-y-auto p-6">
              <RankingTable results={results} />
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-border p-4">
              <button onClick={onClose}>Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
