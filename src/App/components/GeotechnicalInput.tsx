import { type RawMethodInput } from '../../types';
import DropdownSelect from './ui/DropdownSelect';
import NumericInput from './ui/NumericInput';
import {
  getSubStrLabel,
  getFracSpacLabel,
} from '../../lib/nicholas/categorizeInput';

interface GeotechnicalInputProps {
  title: string;
  prefix: 'ore' | 'hw' | 'fw';
  input: RawMethodInput;
  updateInput: (k: keyof RawMethodInput, v: string | number) => void;
}

export default function GeotechnicalInput({
  title,
  prefix,
  input,
  updateInput,
}: GeotechnicalInputProps) {
  return (
    <details className="overflow-hidden pt-4 pl-4">
      <summary className="iterms-center flex cursor-pointer list-none items-center justify-between gap-4 border-l-4 border-border py-1 pl-3 font-mono text-[12px] tracking-wide uppercase">
        <span>{title}</span>
        <span className="tracking-widest">DETAILS</span>
      </summary>
      <div className="mt-4 grid gap-3 xl:grid-cols-1 2xl:grid-cols-2">
        <NumericInput
          label="Substance Strength Ratio"
          value={input[`${prefix}SubStr`]}
          onChange={(v) =>
            updateInput(`${prefix}SubStr` as keyof RawMethodInput, v)
          }
          unit="Ratio"
          derivedLabel={getSubStrLabel(input[`${prefix}SubStr`])}
          note="Ratio of uniaxial compressive strength to overburden pressure. Weak: Ratio < 8 • Moderate: Ratio between 8 and 15 • Strong: Ratio > 15"
        />
        <NumericInput
          label="Fracture Spacing"
          value={input[`${prefix}FracSpac`]}
          onChange={(v) =>
            updateInput(`${prefix}FracSpac` as keyof RawMethodInput, v)
          }
          unit="frac/m"
          derivedLabel={getFracSpacLabel(input[`${prefix}FracSpac`])}
          note="Very Close: > 16 fractures/m (RQD 0-20%) • Close: 10-16 fractures/m (RQD 20-40%) • Wide: 3-10 fractures/m (RQD 40-70%) • Very Wide: < 3 fractures/m (RQD 70-100%)"
        />
        <div className="min-w-0 xl:col-span-1 2xl:col-span-2">
          <DropdownSelect
            label="Fracture Strength"
            value={input[`${prefix}FracStr`]}
            onChange={(v) =>
              updateInput(`${prefix}FracStr` as keyof RawMethodInput, v)
            }
            options={[
              { value: 'W', label: 'Weak' },
              { value: 'M', label: 'Moderate' },
              { value: 'S', label: 'Strong' },
            ]}
            note="Weak: Clean joint with a smooth surface or soft filling (strength < intact rock). Moderate: Clean joint with a rough surface. Strong: Filled with material ≥ intact rock strength."
          />
        </div>
      </div>
    </details>
  );
}
