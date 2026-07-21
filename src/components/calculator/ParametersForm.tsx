import { memo } from 'react';
import { type RawMethodInput } from '../../types';
import { getThicknessLabel, getPlungeLabel } from '../../lib/nicholasData';
import DropdownSelect from '../ui/DropdownSelect';
import NumericInput from '../ui/NumericInput';
import GeotechnicalInput from '../ui/GeotechnicalInput';
import Presets from './Presets';

interface ParametersFormProps {
  input: RawMethodInput;
  updateInput: (key: keyof RawMethodInput, value: string | number) => void;
}

const ParametersForm = memo(function ParametersForm({
  input,
  updateInput,
}: ParametersFormProps) {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col">
      <div className="mb-4 flex-none">
        <h2 className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
          01 / Analysis Inputs
        </h2>
      </div>

      <div className="scroll-elegant flex-1 overflow-x-hidden overflow-y-auto border border-border bg-card p-5 pr-1 sm:p-6 lg:pr-2">
        <Presets />

        <details
          open
          className="mb-5 overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 shadow-xs sm:p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-3 font-mono text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
            <span>Geometry &amp; Grade</span>
            <span className="text-[9px] tracking-[0.3em] text-primary">
              OPEN
            </span>
          </summary>
          <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-1 2xl:grid-cols-2">
            <DropdownSelect
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
            <NumericInput
              label="Ore Thickness"
              value={input.thickness}
              onChange={(v) => updateInput('thickness', v)}
              unit="m"
              derivedLabel={getThicknessLabel(input.thickness)}
              note="Narrow: < 10 m (< 30 ft) • Intermediate: 10 - 30 m (30 - 100 ft) • Thick: 30 - 100 m (100 - 325 ft) • Very Thick: > 100 m (> 325 ft)"
            />
            <NumericInput
              label="Plunge"
              value={input.plunge}
              onChange={(v) => updateInput('plunge', v)}
              unit="°"
              derivedLabel={getPlungeLabel(input.plunge)}
              note="Flat: Dip is less than 20°. Intermediate: Dip is between 20° and 55°. Steep: Dip is greater than 55°."
            />
            <NumericInput
              label="Depth Below Surface"
              value={input.depth}
              onChange={(v) => updateInput('depth', v)}
              unit="m"
              note="Provide actual depth. Contextual metric."
            />
            <DropdownSelect
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
        </details>

        <details className="overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 shadow-xs sm:p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-3 font-mono text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
            <span>Rock Mechanics</span>
            <span className="text-[9px] tracking-[0.3em] text-primary">
              TOGGLE
            </span>
          </summary>
          <div className="mt-4 grid min-w-0 gap-4">
            <GeotechnicalInput
              title="Ore Zone"
              prefix="ore"
              input={input}
              updateInput={updateInput}
            />
            <GeotechnicalInput
              title="Hanging Wall"
              prefix="hw"
              input={input}
              updateInput={updateInput}
            />
            <GeotechnicalInput
              title="Footwall"
              prefix="fw"
              input={input}
              updateInput={updateInput}
            />
          </div>
        </details>
      </div>
    </div>
  );
});

export default ParametersForm;
