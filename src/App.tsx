import { useState, useMemo } from 'react';
import {type RawMethodInput, type ChartDataRow } from './types';
import { calculateScores, deriveMethodInput, getThicknessLabel, getPlungeLabel } from './lib/nicholasData';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SelectField from './components/ui/SelectField';
import NumberField from './components/ui/NumberField';
import RockMechanicsZone from './components/forms/RockMechanicsZone';
import MethodRecommendation from './components/results/MethodRecommendation';
import SelectionMatrix from './components/results/SelectionMatrix';

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

  const derivedInput = useMemo(() => deriveMethodInput(input), [input]);
  const results = useMemo(() => calculateScores(derivedInput), [derivedInput]);

  const updateInput = (key: keyof RawMethodInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const chartData: ChartDataRow[] = results.map(r => ({
    name: r.method,
    Geometry: Math.max(0, r.geometryScore),
    RockMechanics: Math.max(0, r.rockTotal),
    Total: r.total,
    isEliminated: r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0
  })).filter(r => !r.isEliminated);

  const absoluteBest = results.find(r => !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0));
  const bestUnderground = results.find(r => r.method !== 'Open Pit' && !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0));

  return (
    <div className="w-full min-h-screen bg-[#121212] text-[#E5E5E5] font-sans flex flex-col p-4 md:p-8 overflow-auto">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Input Column  */}
        <div className="lg:col-span-4 lg:border-r border-[#333] lg:pr-8 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scroll-elegant lg:pb-8">
          <h2 className="text-sm uppercase tracking-widest text-[#aaa] mb-6 font-bold">01 / Analysis Inputs</h2>
          
          <div className="mb-8">
            <h3 className="text-[10px] uppercase tracking-widest text-[#A3A3A3] font-mono mb-4 border-b border-[#333] pb-2">Geometry & Grade</h3>
            <div className="space-y-4">
              <SelectField 
                label="General Shape" 
                value={input.shape} 
                onChange={(v) => updateInput('shape', v)}
                options={[
                  { value: 'M', label: 'Equi-dimensional (Massive)' },
                  { value: 'TP', label: 'Platy / Tabular' },
                  { value: 'I', label: 'Irregular' }
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
                  { value: 'E', label: 'Erratic' }
                ]}
                note="Uniform: Grade is consistent with no significant variations. Gradational: Grades display distinct zonal characteristics, transitioning smoothly. Erratic: Grades fluctuate inconsistently with no discernible pattern."
              />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-[#A3A3A3] font-mono mb-4 border-b border-[#333] pb-2">Rock Mechanics</h3>
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
        <div className="lg:col-span-8 lg:px-4">
          <h2 className="text-sm uppercase tracking-widest text-[#aaa] mb-6 font-bold">02 / Method Recommendation</h2>
          
          <MethodRecommendation bestMethod={bestUnderground} absoluteBest={absoluteBest} />
          <SelectionMatrix chartData={chartData} results={results} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
