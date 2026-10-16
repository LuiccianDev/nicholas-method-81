import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NicholasProvider } from '@/state/NicholasContext';
import ParametersForm from './components/ParametersForm';
import CardResult from './components/CardResult';
import BarChart from './components/BarChart';
import ScoringMatrixView from './components/ScoringMatrixView';
import { useNicholasContext } from '@/state/NicholasContext';
import { downloadResultsCsv } from './exportCsv';

function CalculatorContent() {
  const {
    input,
    updateInput,
    results,
    chartData,
    absoluteBest,
    bestUnderground,
  } = useNicholasContext();

  const [showMatrix, setShowMatrix] = useState(false);

  const onOpenDetails = useCallback(() => setShowMatrix(true), []);
  const onCloseDetails = useCallback(() => setShowMatrix(false), []);
  const onExportCsv = useCallback(() => downloadResultsCsv(results), [results]);

  const shapeLabel =
    input.shape === 'M'
      ? 'Equi-dimensional (Massive)'
      : input.shape === 'TP'
        ? 'Platy / Tabular'
        : 'Irregular';

  return (
    <div className="mx-auto w-full max-w-425 px-4 pt-24 pb-12 md:px-8">
      {/* Telemetry Status Bar inspired by Stitch */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-border bg-background px-4 py-2 font-mono text-[11px] text-text-primary/70">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-text-primary">
            <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
            PROJECT: OD-81-OREBODY
          </span>
          <span className="text-border">|</span>
          <span>
            BENCHMARK:{' '}
            <strong className="text-text-primary">NICHOLAS (1981)</strong>
          </span>
          <span className="text-border">|</span>
          <span>
            SHAPE: <strong className="text-text-primary">{shapeLabel}</strong>
          </span>
          <span className="text-border">|</span>
          <span>
            THICKNESS:{' '}
            <strong className="text-text-primary">{input.thickness}m</strong>
          </span>
          <span className="text-border">|</span>
          <span>
            PLUNGE:{' '}
            <strong className="text-text-primary">{input.plunge}°</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            AUTO-COMPUTE:{' '}
            <span className="font-bold text-primary">SYNCHRONIZED</span>
          </span>
          <button
            type="button"
            onClick={onExportCsv}
            className="flex items-center gap-1.5 border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] font-bold text-text-primary uppercase transition-colors hover:border-primary hover:bg-primary/10 active:scale-95"
          >
            Export CSV
          </button>
        </div>
      </div>

      <motion.div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(22rem,0.85fr)_minmax(0,1.15fr)]">
        <ParametersForm input={input} updateInput={updateInput} />

        <AnimatePresence mode="wait">
          {!showMatrix ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <CardResult
                bestMethod={bestUnderground}
                absoluteBest={absoluteBest}
                onOpenDetails={onOpenDetails}
              />
              <BarChart chartData={chartData} />
            </motion.div>
          ) : (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ScoringMatrixView
                results={results}
                onBack={onCloseDetails}
                onExportCsv={onExportCsv}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function NicholasCalculator() {
  return (
    <NicholasProvider>
      <CalculatorContent />
    </NicholasProvider>
  );
}
