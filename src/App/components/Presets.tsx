import { useRef } from 'react';
import { motion } from 'motion/react';
import type { RawMethodInput } from '../../types';
import { useNicholasContext } from '../../state/calculator';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const moveBlobRef = useRef<(target: HTMLButtonElement) => void>(() => {});
  const hideBlobRef = useRef<() => void>(() => {});

  const activeId = PRESETS.find((p) => inputsMatch(input, p.data))?.id;

  useGSAP(
    (_, contextSafe : any) => {
      const moveBlob = contextSafe((target: HTMLButtonElement) => {
        const blob = blobRef.current;
        const wrap = wrapperRef.current;
        if (!blob || !wrap) return;
        const rect = target.getBoundingClientRect();
        const nav = wrap.getBoundingClientRect();
        gsap.to(blob, {
          left: rect.left - nav.left - 2,
          top: rect.top - nav.top - 2,
          width: rect.width + 4,
          height: rect.height + 4,
          duration: 0.5,
          ease: 'back.out(0.8)',
        });
      });

      const hideBlob = contextSafe(() => {
        if (blobRef.current) {
          gsap.to(blobRef.current, { autoAlpha: 0, duration: 0.1});
        }
      });

      moveBlobRef.current = moveBlob;
      hideBlobRef.current = hideBlob;

      const activeBtn = wrapperRef.current?.querySelector<HTMLButtonElement>(
        '[data-active="true"]'
      );
      const blob = blobRef.current;
      const wrap = wrapperRef.current;
      if (activeBtn && blob && wrap) {
        const rect = activeBtn.getBoundingClientRect();
        const nav = wrap.getBoundingClientRect();
        gsap.set(blob, {
          autoAlpha: 1,
          left: rect.left - nav.left - 2,
          top: rect.top - nav.top - 2,
          width: rect.width + 4,
          height: rect.height + 4,
        });
      } else {
        hideBlob();
      }
    },
    { scope: wrapperRef, dependencies: [activeId] }
  );

  return (
    <div className="pb-4">
      <h3 className="mb-3 text-[15px]">
        Predefined Geological Scenarios (1-Click)
      </h3>

      <div
        ref={wrapperRef}
        onMouseLeave={() => {
          const activeBtn =
            wrapperRef.current?.querySelector<HTMLButtonElement>(
              '[data-active="true"]'
            );
          if (activeBtn) moveBlobRef.current(activeBtn);
          else hideBlobRef.current();
        }}
        className="relative px-2"
      >
        <span
          ref={blobRef}
          className="pointer-events-none absolute inset-auto z-0 rounded-lg border border-quaternary bg-secondary opacity-0"
        />

        <div className="relative z-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PRESETS.map((preset) => {
            const isActive = inputsMatch(input, preset.data);
            return (
              <motion.button
                key={preset.id}
                type="button"
                data-active={isActive || undefined}
                onMouseEnter={(e) => moveBlobRef.current(e.currentTarget)}
                onClick={(e) => {
                  setInputValues(preset.data);
                  moveBlobRef.current(e.currentTarget);
                }}
                whileTap={{ scale: 0.97 }}
                className="relative flex flex-col items-start rounded-lg  p-3 text-left "
              >
                <div className="mb-2 flex items-center gap-2 font-boldonse">
                  <span className="text-[9px]">{preset.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {preset.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-1 py-0.5 pl-1 text-[12px]"
                    >
                      <span className="font-bold">- {badge.label} :</span>
                      {badge.value}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
