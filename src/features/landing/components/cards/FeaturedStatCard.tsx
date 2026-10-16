import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import FlipBoard from '../FlipBoard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type FeaturedStatCardProps = {
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

export default function FeaturedStatCard({
  eyebrow,
  value,
  suffix,
  status,
  size,
  decimals = 0,
  active = false,
  delay = 0,
  tags = [],
}: FeaturedStatCardProps) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!tagsRef.current) return;
      if (!active || prefersReducedMotion || hasPlayedRef.current) return;

      hasPlayedRef.current = true;

      const pills = tagsRef.current.querySelectorAll('[data-tag]');
      if (!pills.length) return;

      gsap.fromTo(
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
    },
    {
      scope: tagsRef,
      dependencies: [tags, active, delay, prefersReducedMotion],
    }
  );

  return (
    <div
      className={`relative flex card-shell items-center justify-between gap-8 overflow-hidden p-8 md:p-10 ${size}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <p className="font-mono text-lg font-medium tracking-wide uppercase md:text-xl">
          {eyebrow}
        </p>
        <FlipBoard
          value={value}
          suffix={suffix}
          decimals={decimals}
          active={active}
          delay={delay}
          size="large"
        />
        <p className="text-lg font-medium tracking-wide">{status}</p>
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
              className="rounded-full border border-white/15 bg-black/10 px-3 py-1.5 font-mono text-xs font-medium tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
