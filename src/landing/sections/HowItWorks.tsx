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
import { STEPS_DATA } from './data';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) stepsRef.current[index] = el;
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          stepsRef.current,
          { opacity: 0, y: DISTANCES.fadeUp },
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.section,
            ease: EASINGS.smooth,
            stagger: DURATIONS.cardStagger,
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
      aria-labelledby="how-it-works-heading"
      data-section="how-it-works"
      className="overflow-hidden bg-white py-24"
    >
      <div ref={containerRef} className="px-10">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-6">
          <span className="font-sans text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
            Process
          </span>
          <span className="font-sans text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
            NM-02
          </span>
        </div>

        {/* Ghost text */}
        <div className="relative">
          <h2
            id="how-it-works-heading"
            className="relative z-10 mb-16 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-black tracking-tight text-black"
          >
            How It
            <br />
            Works
          </h2>

          {/* Step cards grid */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS_DATA.map((step, index) => (
              <div
                key={step.number}
                ref={setStepRef(index)}
                data-step={step.number}
                className="flex flex-col opacity-0"
              >
                {/* Step number */}
                <span className="font-sans text-8xl font-black tracking-tight text-black">
                  {String(step.number).padStart(2, '0')}
                </span>

                <hr className="my-4 border-black/10" />

                <h3 className="font-sans text-xl leading-snug font-black tracking-tight text-black">
                  {step.headline}
                </h3>

                <p className="mt-3 font-sans text-sm leading-relaxed text-black/50">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
