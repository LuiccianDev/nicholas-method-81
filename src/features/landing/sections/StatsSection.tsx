import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { SCROLL_TRIGGER_DEFAULTS } from '../gsapConfig';
import CounterDisplay from '../components/CounterDisplay';
import { STATS_DATA } from './landingContent';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        ...SCROLL_TRIGGER_DEFAULTS,
        onEnter: () => setActive(true),
        onLeaveBack: () => setActive(false),
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      aria-labelledby="stats-section-heading"
      data-section="stats-section"
      className="overflow-hidden bg-background py-24"
    >
      <div ref={containerRef} className="px-10">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-6 font-sans text-[20px] font-medium italic">
          <span className="tracking-wide uppercase">By the numbers</span>
          <span className="tracking-wide uppercase">NM-04</span>
        </div>

        <h2 id="stats-section-heading" className="sr-only">
          Nicholas Method 81 — Key Statistics
        </h2>

        {/* Ghost text */}
        <div className="relative">
          <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-12 pt-4">
            {STATS_DATA.map((stat, index) => {
              const isOdd = index % 2 === 0;
              return (
                <div
                  key={stat.label}
                  className={isOdd ? 'text-left' : 'text-right'}
                >
                  <CounterDisplay
                    value={stat.value}
                    suffix={stat.suffix}
                    active={active}
                  />
                  <p className="mt-1 font-sans text-[13px] tracking-wide text-text-primary/40 uppercase">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
