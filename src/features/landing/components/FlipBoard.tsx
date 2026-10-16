import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, SplitText);

type FlipBoardProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  active?: boolean;
  delay?: number;
  size?: 'default' | 'large';
};

const NUMBER_SIZE = {
  default: 'text-6xl',
  large: 'text-8xl md:text-9xl',
};

const SUFFIX_SIZE = {
  default: 'text-lg',
  large: 'text-2xl md:text-3xl',
};

export default function FlipBoard({
  value,
  suffix = '',
  decimals = 0,
  active = true,
  delay = 0,
  size = 'default',
}: FlipBoardProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);
  const hasPlayedRef = useRef(false);
  const numberText = value.toFixed(decimals);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!numberRef.current) return;
      if (!active || prefersReducedMotion || hasPlayedRef.current) return;

      hasPlayedRef.current = true;

      const split = SplitText.create(numberRef.current, {
        type: 'chars',
        charsClass: 'letter',
      });

      const tl = gsap.timeline({ delay });

      tl.from(split.chars, {
        rotationX: 90,
        transformOrigin: '50% 100%',
        opacity: 0,
        stagger: { each: 0.045, from: 'start' },
        duration: 0.3,
        ease: 'power2.out',
      });

      if (suffixRef.current) {
        tl.from(
          suffixRef.current,
          { opacity: 0, y: 4, duration: 0.25, ease: 'power2.out' },
          '-=0.15'
        );
      }
    },
    {
      scope: numberRef,
      dependencies: [numberText, suffix, active, prefersReducedMotion],
    }
  );

  return (
    <h3 className="flex items-baseline justify-center gap-2">
      <span
        ref={numberRef}
        className={`font-mono font-bold tabular-nums ${NUMBER_SIZE[size]}`}
      >
        {numberText}
      </span>
      {suffix ? (
        <span ref={suffixRef} className={`font-medium ${SUFFIX_SIZE[size]}`}>
          {suffix}
        </span>
      ) : null}
    </h3>
  );
}
