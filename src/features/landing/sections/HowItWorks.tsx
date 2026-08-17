import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {
  DISTANCES,
  DURATIONS,
  EASINGS,
  SCROLL_TRIGGER_DEFAULTS,
} from '../gsapConfig';
import { STEPS_DATA } from './landingContent';

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
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      data-section="how-it-works"
      className="overflow-hidden bg-white py-24"
    >
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-425 px-4 py-4 md:px-8 md:py-6"
      >
        {/* Top rule + label */}
        <div className="mb-12 flex items-center gap-6 border-t border-black/10 pt-6 font-mono text-[20px] font-medium italic">
          <span className="tracking-wide uppercase">Process</span>
          <span className="tracking-wide uppercase">NM-02</span>
        </div>

        {/* Ghost text */}
        <div className="relative">
          <h2
            id="how-it-works-heading"
            className="relative z-10 mb-16 text-center font-boldonse text-[clamp(2.5rem,6vw,5rem)] leading-[1.2] tracking-tight"
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
                className="flex flex-col"
              >
                {/* Step number */}
                <span className="font-mono text-8xl font-black tracking-tight">
                  {String(step.number).padStart(2, '0')}
                </span>

                <hr className="my-4 border-black/10" />

                <h3 className="font-boldonse text-xl leading-snug font-black tracking-tight">
                  {step.headline}
                </h3>

                <p className="mt-3 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
