import { memo } from 'react';
import { type RawMethodInput } from '../../types';
import {
  getThicknessLabel,
  getPlungeLabel,
} from '../../lib/nicholas/categorizeInput';
import DropdownSelect from './ui/DropdownSelect';
import NumericInput from './ui/NumericInput';
import GeotechnicalInput from './GeotechnicalInput';
import Presets from './Presets';
import { motion } from 'motion/react';

interface ParametersFormProps {
  input: RawMethodInput;
  updateInput: (key: keyof RawMethodInput, value: string | number) => void;
}

const ParametersForm = memo(function ParametersForm({
  input,
  updateInput,
}: ParametersFormProps) {
  return (
    <div className="flex h-full flex-col">
      <Presets />
      <motion.h2
        className="mb-4 font-boldonse text-[10px] tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        01 / Analysis Inputs
      </motion.h2>

      <div className="flex-1 overflow-y-auto">
        <motion.details
          open
          className="overflow-hidden py-4 sm:py-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-2 font-mono text-[13px] tracking-wide uppercase">
            <span>Geometry &amp; Grade</span>
            <span className="tracking-widest">OPEN</span>
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
        </motion.details>

        <motion.details
          className="py-4 sm:py-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-3 font-mono text-[13px] tracking-wide uppercase">
            <span>Rock Mechanics</span>
            <span className="tracking-widest">TOGGLE</span>
          </summary>
          <div className="grid gap-4">
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
        </motion.details>
      </div>
    </div>
  );
});

export default ParametersForm;
