import { memo } from 'react';
import { type RawMethodInput } from '@/types';
import {
  getThicknessLabel,
  getPlungeLabel,
} from '@/lib/nicholas/categorizeInput';
import DropdownSelect from './ui/DropdownSelect';
import NumericInput from './ui/NumericInput';
import GeotechnicalInput from './GeotechnicalInput';
import Presets from './Presets';
import { motion } from 'motion/react';
import ExpandableDetails from './ui/ExpandableDetails';

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
      <div className="mb-4 flex items-center justify-between border-b border-text-primary/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="border border-text-primary/20 bg-background px-2 py-0.5 font-mono text-[10px] tracking-wider text-text-primary uppercase">
            NM-01
          </span>
          <h2 className="font-boldonse text-xs tracking-widest text-text-primary uppercase">
            Analysis Inputs
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-wide text-text-primary/60 uppercase">
          Geotechnical & Geometry
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <motion.div
          className="overflow-hidden py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ExpandableDetails
            title="A. Deposit Geometry"
            defaultOpen
            summaryClassName="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-2 font-mono text-[13px] tracking-wide uppercase"
          >
            <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-1 2xl:grid-cols-2">
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block font-prompt text-[11px] font-semibold tracking-wider text-text-primary uppercase">
                    General Shape
                  </label>
                  <span className="font-mono text-[9px] font-bold text-primary uppercase">
                    {input.shape === 'M'
                      ? 'Massive [Selected]'
                      : input.shape === 'TP'
                        ? 'Tabular [Selected]'
                        : 'Irregular [Selected]'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateInput('shape', 'M')}
                    className={`h-8 border px-2 text-center font-mono text-[11px] font-bold uppercase transition-all ${
                      input.shape === 'M'
                        ? 'border-primary bg-primary text-text-primary'
                        : 'border-border/70 bg-background text-text-primary/70 hover:border-border hover:bg-primary/5'
                    }`}
                  >
                    Massive
                  </button>
                  <button
                    type="button"
                    onClick={() => updateInput('shape', 'TP')}
                    className={`h-8 border px-2 text-center font-mono text-[11px] font-bold uppercase transition-all ${
                      input.shape === 'TP'
                        ? 'border-primary bg-primary text-text-primary'
                        : 'border-border/70 bg-background text-text-primary/70 hover:border-border hover:bg-primary/5'
                    }`}
                  >
                    Tabular
                  </button>
                  <button
                    type="button"
                    onClick={() => updateInput('shape', 'I')}
                    className={`h-8 border px-2 text-center font-mono text-[11px] font-bold uppercase transition-all ${
                      input.shape === 'I'
                        ? 'border-primary bg-primary text-text-primary'
                        : 'border-border/70 bg-background text-text-primary/70 hover:border-border hover:bg-primary/5'
                    }`}
                  >
                    Irregular
                  </button>
                </div>
              </div>

              <NumericInput
                label="Ore Thickness"
                value={input.thickness}
                onChange={(v) => updateInput('thickness', v)}
                unit="m"
                derivedLabel={getThicknessLabel(input.thickness)}
                note="Narrow: <10m • Intermediate: 10–30m • Thick: 30–100m • Very Thick: >100m"
              />
              <NumericInput
                label="Plunge"
                value={input.plunge}
                onChange={(v) => updateInput('plunge', v)}
                unit="°"
                derivedLabel={getPlungeLabel(input.plunge)}
                note="Flat: <20° • Intermediate: 20°–55° • Steep: >55°"
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
                note="Uniform: Constant grade • Gradational: Smooth zonal transitions • Erratic: High fluctuation."
              />
            </div>
          </ExpandableDetails>
        </motion.div>

        <motion.div
          className="py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <ExpandableDetails
            title="B. Rock Mechanics (Geomechanics)"
            defaultOpen
            summaryClassName="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border pb-2 font-mono text-[13px] tracking-wide uppercase"
          >
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
          </ExpandableDetails>
        </motion.div>
      </div>
    </div>
  );
});

export default ParametersForm;
