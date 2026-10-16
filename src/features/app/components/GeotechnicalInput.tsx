import { type RawMethodInput } from '@/types';
import DropdownSelect from './ui/DropdownSelect';
import NumericInput from './ui/NumericInput';
import ExpandableDetails from './ui/ExpandableDetails';
import {
  getSubStrLabel,
  getFracSpacLabel,
} from '@/lib/nicholas/categorizeInput';

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
    <ExpandableDetails
      title={title}
      className="overflow-hidden border border-border/60 bg-background/50 p-3 transition-colors hover:border-border"
      summaryClassName="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-[11px] font-bold tracking-wider text-text-primary uppercase"
    >
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <NumericInput
          label="Substance Strength Ratio"
          value={input[`${prefix}SubStr`]}
          onChange={(v) =>
            updateInput(`${prefix}SubStr` as keyof RawMethodInput, v)
          }
          unit="Ratio"
          derivedLabel={getSubStrLabel(input[`${prefix}SubStr`])}
          note="UCS / Overburden pressure • Weak: <8 • Moderate: 8–15 • Strong: >15"
        />
        <NumericInput
          label="Fracture Spacing"
          value={input[`${prefix}FracSpac`]}
          onChange={(v) =>
            updateInput(`${prefix}FracSpac` as keyof RawMethodInput, v)
          }
          unit="frac/m"
          derivedLabel={getFracSpacLabel(input[`${prefix}FracSpac`])}
          note="Very Close: >16/m (RQD <20%) • Close: 10–16/m • Wide: 3–10/m • Very Wide: <3/m (RQD >70%)"
        />
        <div className="min-w-0 sm:col-span-2">
          <DropdownSelect
            label="Fracture Strength"
            value={input[`${prefix}FracStr`]}
            onChange={(v) =>
              updateInput(`${prefix}FracStr` as keyof RawMethodInput, v)
            }
            options={[
              { value: 'W', label: 'Weak (Smooth joint / soft fill)' },
              { value: 'M', label: 'Moderate (Rough joint)' },
              { value: 'S', label: 'Strong (Hard fill ≥ rock strength)' },
            ]}
            note="Weak: Smooth joint / soft fill • Moderate: Rough joint • Strong: Hard fill (≥ rock strength)"
          />
        </div>
      </div>
    </ExpandableDetails>
  );
}
