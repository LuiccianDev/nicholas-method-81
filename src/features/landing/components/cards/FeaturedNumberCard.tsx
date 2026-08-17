// FeaturedNumberCard.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import CounterDisplay from '../CounterDisplay';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type FeaturedNumberCardProps = {
  eyebrow: string;
  value: number;
  suffix: string;
  status: string;
  size: string;
  decimals?: number;
  active?: boolean;
  delay?: number;
  tags?: string[];
};

export default function FeaturedNumberCard({
  eyebrow,
  value,
  suffix,
  status,
  size,
  decimals = 0,
  active = false,
  delay = 0,
  tags = [],
}: FeaturedNumberCardProps) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!tagsRef.current) return;
      if (!active || prefersReducedMotion) return;

      const pills = tagsRef.current.querySelectorAll('[data-tag]');
      if (!pills.length) return;

      const tween = gsap.fromTo(
        pills,
        { opacity: 0, y: 6, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.35,
          delay: delay + 0.35,
          ease: 'power2.out',
        }
      );

      return () => tween.kill();
    },
    {
      scope: tagsRef,
      dependencies: [tags, active, delay, prefersReducedMotion],
    }
  );

  return (
    <div
      className={`relative flex items-center justify-between gap-8 overflow-hidden rounded-2xl border border-white/20 bg-black/10 p-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] md:p-10 ${size}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <p className="font-mono text-lg font-medium tracking-wide  uppercase md:text-xl">
          {eyebrow}
        </p>
        <CounterDisplay
          value={value}
          suffix={suffix}
          decimals={decimals}
          active={active}
          delay={delay}
          size="large"
        />
        <p className="text-lg font-medium tracking-wide ">
          {status}
        </p>
      </div>

      {tags.length > 0 && (
        <div
          ref={tagsRef}
          className="flex max-w-[45%] flex-wrap content-center justify-end gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              data-tag
              className="rounded-full border border-white/15 bg-black/10 px-3 py-1.5 font-mono text-xs font-medium tracking-wide "
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
