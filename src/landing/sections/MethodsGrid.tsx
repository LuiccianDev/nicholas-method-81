import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {
  DISTANCES,
  DURATIONS,
  EASINGS,
  SCROLL_TRIGGER_DEFAULTS,
} from '../animations';
import { METHODS_DATA, type MethodCard } from './data';

gsap.registerPlugin(ScrollTrigger);

type MethodsGridProps = {
  methods?: MethodCard[];
};

export default function MethodsGrid({
  methods = METHODS_DATA,
}: MethodsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: DISTANCES.fadeUp },
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.section,
            ease: EASINGS.smooth,
            stagger: DURATIONS.cardStagger / 2,
            scrollTrigger: {
              trigger: containerRef.current,
              ...SCROLL_TRIGGER_DEFAULTS,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      aria-labelledby="methods-grid-heading"
      data-section="methods-grid"
      className="overflow-hidden bg-white py-24"
    >
      <div ref={containerRef} className="px-10">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-6 font-sans text-[20px] font-medium italic">
          <span className="tracking-wide uppercase">Methods evaluated</span>
          <span className="tracking-wide uppercase">NM-03</span>
        </div>

        {/* Headline + ghost */}
        <div className="relative mb-16">
          <div className="relative z-10">
            <h2
              id="methods-grid-heading"
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-black tracking-tight"
            >
              10 Mining
              <br />
              Methods
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-primary/80">
              Every method evaluated by the Nicholas 1981 algorithm.
            </p>
          </div>
        </div>

        {/* Methods grid */}
        <div className="grid grid-cols-2 gap-px border border-black/10 bg-secondary/30 md:grid-cols-4">
          {methods.map((method, index) => (
            <div
              key={method.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="flex flex-col gap-1 bg-background p-5 font-monserrate opacity-0"
            >
              <span className="text-[0.65rem] font-medium tracking-[0.15em] text-black/30 uppercase">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[18px] font-black tracking-tight">
                {method.name}
              </span>
              <span className="text-[13px] leading-relaxed text-text-primary/60">
                {method.descriptor}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
