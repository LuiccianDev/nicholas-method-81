import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import {
  EASINGS,
  DURATIONS,
  DISTANCES,
  SCROLL_TRIGGER_DEFAULTS,
} from '../animations';

export default function CounterDisplay({
  start,
  end,
  suffix,
  containerRef,
  decimals = 0,
}: {
  start: number;
  end: number;
  suffix: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  decimals?: number;
}) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const obj = { value: start };
      gsap.to(obj, {
        value: end,
        duration: 0.5,
        ease: EASINGS.smoothSlow,
        onUpdate: () =>
          setValue(
            decimals > 0
              ? parseFloat(obj.value.toFixed(decimals))
              : Math.round(obj.value)
          ),
        scrollTrigger: {
          trigger: containerRef.current,
          start: SCROLL_TRIGGER_DEFAULTS.start,
        },
      });
    },
    { scope: ref, dependencies: [end] }
  );

  return (
    <div ref={ref} className="mb-1 w-full text-center text-4xl font-bold tabular-nums">
      {value}
      {suffix}
    </div>
  );
}
