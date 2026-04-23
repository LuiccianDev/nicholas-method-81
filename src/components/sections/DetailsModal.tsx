import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { type ScoredMethod } from '../../types';
import ResultsTable from '../results/ResultsTable';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ScoredMethod[];
}

export default function DetailsModal({
  isOpen,
  onClose,
  results,
}: DetailsModalProps) {
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h3 className="font-serif text-2xl text-primary italic">
                  Result Matrix
                </h3>
                <p className="font-mono text-[10px] tracking-widest text-foreground-muted uppercase">
                  Numerical Breakdown / Nicholas Optimization
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="scroll-elegant overflow-y-auto p-6">
              <ResultsTable results={results} />
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-border bg-surface-muted p-4">
              <button
                onClick={onClose}
                className="bg-border px-6 py-2 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-border-strong"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
