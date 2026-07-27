import { Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { RawMethodInput } from '../../types';
import { useNicholasContext } from '../../context/NicholasContext';

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
      depth: 850,
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
      { label: 'Depth', value: '850 m' },
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
      depth: 550,
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
      { label: 'Depth', value: '550 m' },
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
      depth: 220,
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
      { label: 'Depth', value: '220 m' },
      { label: 'Grade', value: 'Erratic' },
    ],
  },
];

export default function Presets() {
  const { input, setInputValues } = useNicholasContext();

  return (
    <div className="mb-6 rounded-2xl border border-border bg-surface-muted/40 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          Predefined Geological Scenarios (1-Click)
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {PRESETS.map((preset) => {
          const isActive = inputsMatch(input, preset.data);
          return (
            <motion.button
              key={preset.id}
              type="button"
              onClick={() => setInputValues(preset.data)}
              whileTap={{ scale: 0.97 }}
              className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200 ${
                isActive
                  ? 'border-primary/70 bg-primary/4 shadow-xs'
                  : 'border-border/80 bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-md'
              } active:translate-y-0`}
            >
              {isActive && (
                <span className="absolute right-1.5 bottom-1.5 text-primary">
                  <Check className="size-4" />
                </span>
              )}
              <div
                className={`mb-2 flex items-center gap-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-foreground group-hover:text-primary'
                }`}
              >
                <span>{preset.name}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {preset.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface/50 px-1.5 py-0.5 text-xxs text-foreground-muted"
                  >
                    <span className="font-medium text-foreground/70">
                      {badge.label}:
                    </span>
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
