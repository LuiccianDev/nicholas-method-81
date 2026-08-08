import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, SplitText);

type FlipBoardProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  active?: boolean;
  delay?: number;
};

export default function FlipBoard({
  value,
  suffix = '',
  decimals = 0,
  active = true,
  delay = 0,
}: FlipBoardProps) {
  const container = useRef<HTMLHeadingElement>(null);
  const text = `${value.toFixed(decimals)}${suffix}`;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useGSAP(
    () => {
      if (!container.current) return;
      if (!active || prefersReducedMotion) return;

      const split = SplitText.create(container.current, {
        type: 'chars',
        charsClass: 'letter',
      });

      const tween = gsap.from(split.chars, {
        rotationX: 90,
        transformOrigin: '50% 100%',
        opacity: 0,
        stagger: { each: 0.045, from: 'start' },
        duration: 0.3,
        delay,
        ease: 'power2.out',
      });

      return () => {
        tween.kill();
        split.revert();
      };
    },
    {
      scope: container,
      dependencies: [text, active],
      revertOnUpdate: true,
    }
  );

  return (
    <h3 ref={container} className="text text-6xl font-bold">
      {text}
    </h3>
  );
}
