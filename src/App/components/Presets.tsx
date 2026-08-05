import { motion } from 'motion/react';
import type { RawMethodInput } from '../../types';
import { useNicholasContext } from '../../state/calculator';

interface PresetOption {
  id: string;
  name: string;
  data: RawMethodInput;
  badges: { label: string; value: string }[];
}

function inputsMatch(a: RawMethodInput, b: RawMethodInput): boolean {
  return (Object.keys(a) as (keyof RawMethodInput)[]).every(
    (k) => a[k] === b[k]
  );
}

const PRESETS: PresetOption[] = [
  {
    id: 'narrow-vein',
    name: 'Deep Narrow Vein',
    data: {
      shape: 'I',
      thickness: 3,
      plunge: 70,
      grade: 'G',
      oreSubStr: 14,
      oreFracSpac: 16,
      oreFracStr: 'S',
      hwSubStr: 12,
      hwFracSpac: 14,
      hwFracStr: 'M',
      fwSubStr: 14,
      fwFracSpac: 15,
      fwFracStr: 'S',
    },
    badges: [
      { label: 'Shape', value: 'Irregular' },
      { label: 'Thickness', value: '3 m' },
      { label: 'Grade', value: 'Gradational' },
    ],
  },
  {
    id: 'porphyry-mass',
    name: 'Massive Porphyry Body',
    data: {
      shape: 'M',
      thickness: 65,
      plunge: 45,
      grade: 'U',
      oreSubStr: 8,
      oreFracSpac: 10,
      oreFracStr: 'M',
      hwSubStr: 8,
      hwFracSpac: 10,
      hwFracStr: 'W',
      fwSubStr: 10,
      fwFracSpac: 12,
      fwFracStr: 'M',
    },
    badges: [
      { label: 'Shape', value: 'Equi-dimensional' },
      { label: 'Thickness', value: '65 m' },
      { label: 'Grade', value: 'Uniform' },
    ],
  },
  {
    id: 'shallow-mantle',
    name: 'Competent Shallow Bed',
    data: {
      shape: 'TP',
      thickness: 12,
      plunge: 15,
      grade: 'E',
      oreSubStr: 16,
      oreFracSpac: 18,
      oreFracStr: 'S',
      hwSubStr: 15,
      hwFracSpac: 16,
      hwFracStr: 'S',
      fwSubStr: 16,
      fwFracSpac: 17,
      fwFracStr: 'S',
    },
    badges: [
      { label: 'Shape', value: 'Platy / Tabular' },
      { label: 'Thickness', value: '12 m' },
      { label: 'Grade', value: 'Erratic' },
    ],
  },
];

export default function Presets() {
  const { input, setInputValues } = useNicholasContext();

  return (
    <div className="pb-4">
      <h3 className="mb-3 text-[15px]">
        Predefined Geological Scenarios (1-Click)
      </h3>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {PRESETS.map((preset) => {
          const isActive = inputsMatch(input, preset.data);
          return (
            <motion.button
              key={preset.id}
              type="button"
              onClick={() => setInputValues(preset.data)}
              whileTap={{ scale: 0.97 }}
              className={`group relative flex flex-col items-start rounded-lg border border-border p-3 text-left transition-all duration-200 ${
                isActive
                  ? 'border-quaternary bg-quaternary/10'
                  : 'hover:border-tertiary'
              } active:translate-y-0`}
            >
              <div className="mb-2 flex items-center gap-2 font-roboto">
                <span className="text-[13px] font-bold">{preset.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                {preset.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1 py-0.5 pl-1 text-[12px]"
                  >
                    <span>- {badge.label} :</span>
                    {badge.value}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
