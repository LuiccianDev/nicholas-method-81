import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function MethodOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
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
      aria-labelledby="method-overview-heading"
      data-section="method-overview"
      className="overflow-hidden bg-white py-24"
    >
      <div ref={containerRef} className="mx-auto px-10">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-6">
          <span className="font-sans text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
            Designed for systematic selection
          </span>
          <span className="font-sans text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
            NM-81
          </span>
        </div>

        {/* Main layout — asymmetric grid */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left — headline + meta (col 1-6) */}
          <div className="relative z-10 flex flex-col justify-between md:col-span-6">
            <h2
              id="method-overview-heading"
              ref={headlineRef}
              className="font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-black tracking-tight text-black opacity-0"
            >
              Nicholas
              <br />
              <span className="text-black/20">1981</span>
              <br />
              Underground
              <br />
              Mining
            </h2>

            <div ref={metaRef} className="mt-16 opacity-0">
              <p className="max-w-sm font-sans text-sm leading-relaxed text-black/50">
                Published in 1981, the Nicholas methodology evaluates ten
                underground mining methods using geometric and geomechanical
                parameters — delivering a ranked, quantitative recommendation in
                seconds.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black/30" />
                <span className="font-sans text-xs tracking-[0.15em] text-black/40 uppercase">
                  Method Selection
                </span>
              </div>
            </div>
          </div>

          {/* Right — image floating (col 7-12) */}
          <div className="relative z-10 md:col-span-6">
            <div
              ref={imageRef}
              className="relative ml-auto w-full max-w-md overflow-hidden rounded-2xl opacity-0 md:w-[90%]"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src="/dashboard_bg.jpg"
                alt="Nicholas Method dashboard overview"
                className="h-full w-full object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom — counter row */}
        <div className="mt-16 flex items-center gap-12 border-t border-black/10 pt-8">
          <div>
            <p className="font-sans text-3xl font-black text-black">10</p>
            <p className="font-sans text-xs tracking-[0.15em] text-black/40 uppercase">
              Methods
            </p>
          </div>
          <div>
            <p className="font-sans text-3xl font-black text-black">6</p>
            <p className="font-sans text-xs tracking-[0.15em] text-black/40 uppercase">
              Parameters
            </p>
          </div>
          <div>
            <p className="font-sans text-3xl font-black text-black">1981</p>
            <p className="font-sans text-xs tracking-[0.15em] text-black/40 uppercase">
              Origin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
