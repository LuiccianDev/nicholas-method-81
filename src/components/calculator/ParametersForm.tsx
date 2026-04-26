import { memo } from 'react';
import { type RawMethodInput } from '../../types';
import { getThicknessLabel, getPlungeLabel } from '../../lib/nicholasData';
import DropdownSelect from '../ui/DropdownSelect';
import NumericInput from '../ui/NumericInput';
import GeotechnicalInput from '../ui/GeotechnicalInput';

interface ParametersFormProps {
  input: RawMethodInput;
  updateInput: (key: keyof RawMethodInput, value: string | number) => void;
}

const ParametersForm = memo(function ParametersForm({
  input,
  updateInput,
}: ParametersFormProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 01. Section Title - Outside of scroll */}
      <div className="mb-4 flex-none">
        <h2 className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
          01 / Analysis Inputs
        </h2>
      </div>

      {/* Scrollable Form Content */}
      <div className="scroll-elegant flex-1 overflow-y-auto border-border lg:border-r lg:pr-8 lg:pb-8">
        {/* Geometry & Grade */}
        <section className="mb-8">
          <h3 className="mb-4 ml-2 border-l border-border-strong pb-0.5 pl-2 font-mono text-[10px] tracking-widest text-foreground-muted uppercase">
            Geometry &amp; Grade
          </h3>
          <div className="space-y-4 pl-3">
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
        </section>

        {/* Rock Mechanics */}
        <section>
          <h3 className="mb-4 ml-2 border-l border-border-strong pb-0.5 pl-2 font-mono text-[10px] tracking-widest text-foreground-muted uppercase">
            Rock Mechanics
          </h3>
          <div className="space-y-6">
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
        </section>
      </div>
    </div>
  );
});

export default ParametersForm;
