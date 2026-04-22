import React from 'react';
import { RawMethodInput } from '../../types';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { getSubStrLabel, getFracSpacLabel } from '../../lib/nicholasData';

interface RockMechanicsZoneProps {
  title: string;
  prefix: 'ore' | 'hw' | 'fw';
  input: RawMethodInput;
  updateInput: (k: keyof RawMethodInput, v: string | number) => void;
}

export default function RockMechanicsZone({ title, prefix, input, updateInput }: RockMechanicsZoneProps) {
  return (
    <div className="mb-6">
      <h4 className="text-[10px] uppercase text-[#A3A3A3] mb-3 ml-2 border-l border-[#444] pl-2">{title}</h4>
      <div className="pl-3">
        <NumberField 
          label="Substance Strength Ratio" 
          value={input[`${prefix}SubStr`]} 
          onChange={(v) => updateInput(`${prefix}SubStr` as keyof RawMethodInput, v)}
          unit="Ratio"
          derivedLabel={getSubStrLabel(input[`${prefix}SubStr`])}
          note="Ratio of uniaxial compressive strength to overburden pressure. Weak: Ratio < 8 • Moderate: Ratio between 8 and 15 • Strong: Ratio > 15"
        />
        <NumberField 
          label="Fracture Spacing" 
          value={input[`${prefix}FracSpac`]} 
          onChange={(v) => updateInput(`${prefix}FracSpac` as keyof RawMethodInput, v)}
          unit="frac/m"
          derivedLabel={getFracSpacLabel(input[`${prefix}FracSpac`])}
          note="Very Close: > 16 fractures/m (RQD 0-20%) • Close: 10-16 fractures/m (RQD 20-40%) • Wide: 3-10 fractures/m (RQD 40-70%) • Very Wide: < 3 fractures/m (RQD 70-100%)"
        />
        <SelectField 
          label="Fracture Strength" 
          value={input[`${prefix}FracStr`]} 
          onChange={(v) => updateInput(`${prefix}FracStr` as keyof RawMethodInput, v as string)}
          options={[
            { value: 'W', label: 'Weak' },
            { value: 'M', label: 'Moderate' },
            { value: 'S', label: 'Strong' }
          ]}
          note="Weak: Clean joint with a smooth surface or soft filling (strength < intact rock). Moderate: Clean joint with a rough surface. Strong: Filled with material ≥ intact rock strength."
        />
      </div>
    </div>
  );
}
