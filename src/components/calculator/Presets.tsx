import { Sparkles, Layers, Pickaxe, ShieldAlert } from 'lucide-react';
import type { RawMethodInput } from '../../types';
import { useNicholasContext } from '../../context/NicholasContext';

interface PresetOption {
  id: string;
  name: string;
  description: string;
  icon: typeof Sparkles;
  data: RawMethodInput;
}

const PRESETS: PresetOption[] = [
  {
    id: 'narrow-vein',
    name: 'Deep Narrow Vein',
    description: 'Steeply dipping vein (70°), 3m thickness, high rock mass strength.',
    icon: Pickaxe,
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
  },
  {
    id: 'porphyry-mass',
    name: 'Massive Porphyry Body',
    description:
      'Deep massive deposit (65m thickness), moderate to weak rock strength.',
    icon: Layers,
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
  },
  {
    id: 'shallow-mantle',
    name: 'Competent Shallow Bed',
    description:
      'Flat/tabular deposit (15° plunge), highly competent rock mass.',
    icon: ShieldAlert,
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
  },
];

export default function Presets() {
  const { setInputValues } = useNicholasContext();

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
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setInputValues(preset.data)}
              className="group flex flex-col items-start rounded-xl border border-border/80 bg-card p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-md active:translate-y-0"
            >
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-foreground group-hover:text-primary">
                <Icon className="size-3.5 text-primary" />
                <span>{preset.name}</span>
              </div>
              <p className="line-clamp-2 text-xs leading-tight text-foreground-muted">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
