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
import { METHODS_DATA, type MethodCard } from './landingContent';

gsap.registerPlugin(ScrollTrigger);

type MethodsGridProps = {
  methods?: MethodCard[];
};

const PLACEHOLDER_GRADIENTS = [
  'from-secondary to-tertiary',
  'from-tertiary to-quaternary',
  'from-quaternary to-primary',
  'from-primary to-secondary',
];

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
      id="methods-mining"
      aria-labelledby="methods-grid-heading"
      data-section="methods-grid"
      className="overflow-hidden bg-white py-24"
    >
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-425 px-4 py-4 md:px-8 md:py-6"
      >
        {/* Top rule + label */}
        <div className="mb-12 flex items-center gap-6 border-t border-black/10 pt-6 font-mono text-[20px] font-medium italic">
          <span className="tracking-wide uppercase">Methods evaluated</span>
          <span className="tracking-wide uppercase">NM-03</span>
        </div>

        {/* Headline + ghost */}
        <div className="relative mb-16">
          <div className="relative z-10">
            <h2
              id="methods-grid-heading"
              className="text-center font-boldonse text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-black tracking-tight"
            >
              10 Mining
              <br />
              Methods
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-relaxed text-text-primary/80">
              Every method evaluated by the Nicholas 1981 algorithm.
            </p>
          </div>
        </div>

        {/* Methods grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {methods.map((method, index) => (
            <div
              key={method.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="flex flex-col gap-3 opacity-0"
            >
              {/* Image placeholder — replace with the real illustration */}
              <div
                aria-label={`${method.name} illustration placeholder`}
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/10 bg-linear-to-br ${PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]} p-3`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
                  <span className="font-boldonse text-lg leading-tight tracking-tight text-black/80 uppercase">
                    {method.code}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-black/50 uppercase">
                    img: {method.image}
                  </span>
                </div>
                <span className="absolute top-2 left-2 rounded-sm bg-black/25 px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-widest text-white uppercase">
                  placeholder
                </span>
                <span className="absolute right-2 bottom-2 font-mono text-[10px] font-bold text-black/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Card text */}
              <div className="flex flex-col gap-1">
                <span className="font-boldonse text-[18px] font-black tracking-tight">
                  {method.name}
                </span>
                <span className="text-[13px] leading-relaxed text-text-primary/60">
                  {method.descriptor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
