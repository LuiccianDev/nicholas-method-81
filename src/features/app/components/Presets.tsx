import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { RawMethodInput } from '@/types';
import { useNicholasContext } from '@/state/NicholasContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
      { label: 'S', value: 'Irregular' },
      { label: 'T', value: '3 m' },
      { label: 'G', value: 'Gradational' },
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
      { label: 'S', value: 'Equi-dimensional' },
      { label: 'T', value: '65 m' },
      { label: 'G', value: 'Uniform' },
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
      { label: 'S', value: 'Platy / Tabular' },
      { label: 'T', value: '12 m' },
      { label: 'G', value: 'Erratic' },
    ],
  },
];

const SPRING_TRANSITION = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};

export default function Presets() {
  const { input, setInputValues } = useNicholasContext();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeId = PRESETS.find((p) => inputsMatch(input, p.data))?.id;

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between border-b border-text-primary/10 pb-1.5">
        <span className="font-mono text-[10px] font-bold tracking-wider text-text-primary uppercase">
          Predefined Geological Scenarios (1-Click)
        </span>
        <span className="font-mono text-[9px] text-text-primary/50 uppercase">
          Quick Load
        </span>
      </div>

      <motion.div
        onMouseLeave={() => setHoveredId(null)}
        className="relative py-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => {
            const isActive = activeId === preset.id;
            const isHovered = hoveredId === preset.id;

            return (
              <motion.button
                key={preset.id}
                type="button"
                data-active={isActive || undefined}
                onMouseEnter={() => setHoveredId(preset.id)}
                onFocus={() => setHoveredId(preset.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => setInputValues(preset.data)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                className={`group relative flex cursor-pointer flex-col items-start border p-2.5 text-left transition-colors duration-300 ${
                  isActive
                    ? 'border-primary'
                    : 'border-border/60 bg-background/80 hover:border-primary/60'
                }`}
              >
                {/* Shared Hover Highlight Pill */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="preset-hover-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.2, ease: 'easeOut' }
                      }
                      className="pointer-events-none absolute inset-0 z-0 bg-primary/8"
                    />
                  )}
                </AnimatePresence>

                {/* Shared Active Selection Pill */}
                {isActive && (
                  <motion.span
                    layoutId="preset-active-bg"
                    transition={
                      prefersReducedMotion ? { duration: 0 } : SPRING_TRANSITION
                    }
                    className="pointer-events-none absolute inset-0 z-0 border border-primary bg-primary/20 shadow-[inset_0_0_0_1px_rgba(164,207,130,0.25)]"
                  />
                )}

                <div className="relative z-10 mb-1.5 flex w-full items-center justify-between gap-1">
                  <span className="font-boldonse text-[10px] tracking-wide text-text-primary uppercase transition-transform duration-200 group-hover:translate-x-0.5">
                    {preset.name}
                  </span>
                </div>

                <div className="relative z-10 flex flex-wrap gap-1">
                  {preset.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`inline-flex items-center gap-1 border px-1 py-0.5 font-mono text-[9px] text-text-primary/80 transition-colors duration-200 ${
                        isActive
                          ? 'border-primary/50 bg-background/95'
                          : 'border-border/40 bg-background group-hover:border-primary/30'
                      }`}
                    >
                      <span className="font-bold text-text-primary">
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
      </motion.div>
    </div>
  );
}
