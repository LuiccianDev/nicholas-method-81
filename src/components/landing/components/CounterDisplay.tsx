import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { EASINGS, DURATIONS } from '../animations';

type CounterDisplayProps = {
  start: number;
  end: number;
  suffix: string;
  decimals?: number;
  active: boolean;
};

export default function CounterDisplay({
  start,
  end,
  suffix,
  decimals = 0,
  active,
}: CounterDisplayProps) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        setValue(active ? end : start);
        return;
      }
      if (!active) {
        setValue(start);
        return;
      }
      const obj = { value: start };
      const tween = gsap.to(obj, {
        value: end,
        duration: DURATIONS.counter,
        ease: EASINGS.smoothSlow,
        onUpdate: () =>
          setValue(
            decimals > 0
              ? parseFloat(obj.value.toFixed(decimals))
              : Math.round(obj.value)
          ),
      });
      return () => tween.kill();
    },
    { scope: ref, dependencies: [active, end] }
  );

  return (
    <div ref={ref} className="mb-1 w-full text-center text-5xl font-bold">
      {value}
      {suffix}
    </div>
  );
}
