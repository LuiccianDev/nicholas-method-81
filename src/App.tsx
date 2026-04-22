import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { type RawMethodInput, type ChartDataRow } from './types';
import {
  calculateScores,
  deriveMethodInput,
  getThicknessLabel,
  getPlungeLabel,
} from './lib/nicholasData';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SelectField from './components/ui/SelectField';
import NumberField from './components/ui/NumberField';
import RockMechanicsZone from './components/forms/RockMechanicsZone';
import MethodRecommendation from './components/results/MethodRecommendation';
import SelectionMatrix from './components/results/SelectionMatrix';
import ResultsTable from './components/results/ResultsTable';

const THEME_STORAGE_KEY = 'theme';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

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

export default function App() {
  const [input, setInput] = useState<RawMethodInput>(DEFAULT_INPUT);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme((currentTheme) =>
        currentTheme === 'light' ? 'dark' : 'light'
      );
      return;
    }

    document.startViewTransition(() => {
      setTheme((currentTheme) =>
        currentTheme === 'light' ? 'dark' : 'light'
      );
    });
  };

  const derivedInput = useMemo(() => deriveMethodInput(input), [input]);
  const results = useMemo(() => calculateScores(derivedInput), [derivedInput]);

  const updateInput = (key: keyof RawMethodInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

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
    <div className="flex min-h-screen w-full flex-col overflow-auto bg-surface p-4 font-sans text-foreground md:p-8">
      <Header toggleTheme={toggleTheme} theme={theme} />

      <div className="grid grow grid-cols-1 gap-x-8 lg:grid-cols-12">
        <div className="mb-4 lg:col-span-4">
          <h2 className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
            01 / Analysis Inputs
          </h2>
        </div>
        <div className="mb-4 lg:col-span-8 lg:px-6">
          <h2 className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
            02 / Method Recommendation
          </h2>
        </div>

        {/* Input Column  */}
        <div className="scroll-elegant border-border lg:sticky lg:top-8 lg:col-span-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:border-r lg:pr-8 lg:pb-8">
          <div className="mb-8">
            <h3 className="border-border-strong text-foreground-muted mb-4 ml-2 border-l pb-0.5 pl-2 font-mono text-[10px] tracking-widest uppercase">
              Geometry & Grade
            </h3>
            <div className="space-y-4 pl-3">
              <SelectField
                label="General Shape"
                value={input.shape}
                onChange={(v) => updateInput('shape', v)}
                options={[
                  { value: 'M', label: 'Equi-dimensional (Massive)' },
                  { value: 'TP', label: 'Platy / Tabular' },
                  { value: 'I', label: 'Irregular' },
                ]}
                note="Equi-dimensional: All dimensions are roughly equal. Platy/Tabular: Two dimensions are significantly larger than the thickness (usually < 100m). Irregular: Dimensions vary drastically over short distances."
              />
              <NumberField
                label="Ore Thickness"
                value={input.thickness}
                onChange={(v) => updateInput('thickness', v)}
                unit="m"
                derivedLabel={getThicknessLabel(input.thickness)}
                note="Narrow: < 10 m (< 30 ft) • Intermediate: 10 - 30 m (30 - 100 ft) • Thick: 30 - 100 m (100 - 325 ft) • Very Thick: > 100 m (> 325 ft)"
              />
              <NumberField
                label="Plunge"
                value={input.plunge}
                onChange={(v) => updateInput('plunge', v)}
                unit="°"
                derivedLabel={getPlungeLabel(input.plunge)}
                note="Flat: Dip is less than 20°. Intermediate: Dip is between 20° and 55°. Steep: Dip is greater than 55°."
              />
              <NumberField
                label="Depth Below Surface"
                value={input.depth}
                onChange={(v) => updateInput('depth', v)}
                unit="m"
                note="Provide actual depth. Contextual metric."
              />
              <SelectField
                label="Grade Distribution"
                value={input.grade}
                onChange={(v) => updateInput('grade', v)}
                options={[
                  { value: 'U', label: 'Uniform' },
                  { value: 'G', label: 'Gradational' },
                  { value: 'E', label: 'Erratic' },
                ]}
                note="Uniform: Grade is consistent with no significant variations. Gradational: Grades display distinct zonal characteristics, transitioning smoothly. Erratic: Grades fluctuate inconsistently with no discernible pattern."
              />
            </div>
          </div>

          <div>
            <h3 className="border-border-strong text-foreground-muted mb-4 ml-2 border-l pb-0.5 pl-2 font-mono text-[10px] tracking-widest uppercase">
              Rock Mechanics
            </h3>
            <div className="space-y-6">
              <RockMechanicsZone
                title="Ore Zone"
                prefix="ore"
                input={input}
                updateInput={updateInput}
              />
              <RockMechanicsZone
                title="Hanging Wall"
                prefix="hw"
                input={input}
                updateInput={updateInput}
              />
              <RockMechanicsZone
                title="Footwall"
                prefix="fw"
                input={input}
                updateInput={updateInput}
              />
            </div>
          </div>
        </div>

        {/* Result Column */}
        <div className="lg:col-span-8 lg:px-6">
          <MethodRecommendation
            bestMethod={bestUnderground}
            absoluteBest={absoluteBest}
            onOpenDetails={() => setIsDetailsOpen(true)}
          />
          <SelectionMatrix chartData={chartData} results={results} />
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isDetailsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="border-border bg-surface relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border shadow-2xl"
            >
              <div className="border-border flex items-center justify-between border-b p-6">
                <div>
                  <h3 className="text-primary font-serif text-2xl italic">
                    Result Matrix
                  </h3>
                  <p className="text-foreground-muted font-mono text-[10px] tracking-widest uppercase">
                    Numerical Breakdown / Nicholas Optimization
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="text-foreground-muted hover:bg-surface-muted hover:text-foreground p-2 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="scroll-elegant overflow-y-auto p-6">
                <ResultsTable results={results} />
              </div>
              <div className="border-border bg-surface-muted flex justify-end border-t p-4">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="bg-border text-foreground hover:bg-border-strong px-6 py-2 font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
