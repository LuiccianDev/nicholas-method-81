import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { EASINGS, DURATIONS, DISTANCES } from './animations';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingSpanRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: EASINGS.smoothSlow } });

      tl.fromTo(
        taglineRef.current,
        { y: DISTANCES.fadeUp, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATIONS.heroLine },
      )
        .fromTo(
          headingSpanRef.current,
          { y: DISTANCES.fadeUp, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.heroLine },
          `-=${DURATIONS.heroStagger}`,
        );

      gsap.to(containerRef.current, {
        opacity: 0,
        y: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'top top',
          scrub: 1,
          markers: false,
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <header
      ref={containerRef}
      className="bg-white pt-12 pb-16 px-6 text-center overflow-hidden"
      data-purpose="hero-text"
    >
      <p
        ref={taglineRef}
        className="text-[11px] font-medium text-gray-600 mb-8 max-w-[280px] mx-auto leading-relaxed uppercase tracking-tight"
      >
        AI analyzes site data and predicts environmental risk — <br />
        before a single tree comes down
      </p>
      <h1 className="text-[44px] font-extrabold text-[#111111] leading-tight px-2 tracking-tighter">
        <span ref={headingSpanRef} className="block">See the impact before you break ground</span>
      </h1>
    </header>
  );
}
