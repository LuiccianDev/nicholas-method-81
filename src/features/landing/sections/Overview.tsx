import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
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
      className="overflow-hidden bg-background pt-10"
    >
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-425 px-4 py-4 md:px-8 md:py-6"
      >
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-center gap-6 border-t border-black/10 pt-6 font-mono text-[11px] font-medium">
          <span className="tracking-wide uppercase">
            Designed for systematic selection
          </span>
          <span className="ml-auto tracking-wide uppercase">NM-81</span>
        </div>

        {/* Main layout — asymmetric grid */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left — headline + meta (col 1-6) */}
          <div className="relative z-10 flex flex-col justify-between gap-y-10 md:col-span-6">
            <h2
              id="method-overview-heading"
              ref={headlineRef}
              className="text-center font-boldonse text-[clamp(2.5rem,5vw,4rem)] leading-[1.2] tracking-tight"
            >
              Nicholas
              <br />
              <span className="text-primary">1981</span>
              <br />
              Underground
              <br />
              Mining
            </h2>

            <div ref={metaRef} className="mt-16 text-center">
              <p className="mx-auto max-w-sm text-sm leading-relaxed">
                Published in 1981, the Nicholas methodology evaluates ten mining
                methods using geometric and geomechanical inputs — delivering a
                ranked, quantitative recommendation in seconds.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="font-mono text-[15px] font-bold tracking-[0.15em] uppercase italic">
                  Method Selection
                </span>
              </div>
            </div>
          </div>

          {/* Right — image floating (col 7-12) */}
          <div className="relative z-10 md:col-span-6">
            <div
              ref={imageRef}
              className="relative ml-auto w-full overflow-hidden rounded-2xl opacity-0"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src="/Underground_Portada.jpeg"
                alt="Nicholas Method dashboard overview"
                className="h-full w-full"
              />
              {/* Subtle overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom — counter row */}
        <div className="mt-16 flex items-center justify-center gap-12 border-t border-black/20 pt-8 font-mono">
          <div>
            <p className="text-3xl font-black">10</p>
            <p className="text-[11px] tracking-[0.15em] uppercase">Methods</p>
          </div>
          <div>
            <p className="text-3xl font-black">13</p>
            <p className="text-[11px] tracking-[0.15em] uppercase">
              Parameters
            </p>
          </div>
          <div>
            <p className="text-3xl font-black">1981</p>
            <p className="text-[11px] tracking-[0.15em] uppercase">Origin</p>
          </div>
        </div>
      </div>
    </section>
  );
}
