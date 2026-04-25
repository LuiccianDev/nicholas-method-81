import { Suspense, lazy, useMemo, useState } from 'react';
import { type RawMethodInput, type ChartDataRow } from '../../types';
import { calculateScores, deriveMethodInput } from '../../lib/nicholasData';
import ParametersForm from '../calculator/ParametersForm';
import AnalysisDashboard from '../calculator/AnalysisDashboard';

const ScoringMatrixModal = lazy(
  () => import('../calculator/ScoringMatrixModal')
);

const DEFAULT_INPUT: RawMethodInput = {
  shape: 'M',
  thickness: 20,
  plunge: 45,
  depth: 500,
  grade: 'U',
  oreSubStr: 10,
  oreFracSpac: 12,
  oreFracStr: 'M',
  hwSubStr: 10,
  hwFracSpac: 12,
  hwFracStr: 'M',
  fwSubStr: 10,
  fwFracSpac: 12,
  fwFracStr: 'M',
};

export default function Main() {
  const [input, setInput] = useState<RawMethodInput>(DEFAULT_INPUT);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const updateInput = (key: keyof RawMethodInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const derivedInput = useMemo(() => deriveMethodInput(input), [input]);
  const results = useMemo(() => calculateScores(derivedInput), [derivedInput]);

  const chartData: ChartDataRow[] = results
    .map((r) => ({
      name: r.method,
      Geometry: Math.max(0, r.geometryScore),
      RockMechanics: Math.max(0, r.rockTotal),
      Total: r.total,
      isEliminated: r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0,
    }))
    .filter((r) => !r.isEliminated);

  const absoluteBest = results.find(
    (r) => !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0)
  );
  const bestUnderground = results.find(
    (r) =>
      r.method !== 'Open Pit' &&
      !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0)
  );

  return (
    <main className="flex grow flex-col">
      <div className="grid grow grid-cols-1 gap-x-8 lg:grid-cols-12">
        {/* Input Column */}
        <ParametersForm input={input} updateInput={updateInput} />

        {/* Results Column */}
        <AnalysisDashboard
          bestUnderground={bestUnderground}
          absoluteBest={absoluteBest}
          chartData={chartData}
          results={results}
          onOpenDetails={() => setIsDetailsOpen(true)}
        />
      </div>

      {/* Details Modal */}
      <Suspense fallback={null}>
        <ScoringMatrixModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          results={results}
        />
      </Suspense>
    </main>
  );
}
