import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !footerRef.current) return;

    gsap.fromTo(
      textRef.current,
      {
        y: '100%',
        opacity: 0,
        rotateX: -15, // Slightly less aggressive tilt
        scale: 0.98, // Subtle scale
      },
      {
        y: '5%', // Keep it slightly cut off at the end for the "urban" look
        opacity: 1,
        rotateX: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom 95%', // End slightly before the absolute bottom
          scrub: 1.5, // Even smoother follow
        },
      }
    );
  }, [footerRef]);

  return (
    <footer
      ref={footerRef}
      className="relative mt-32 flex flex-col overflow-hidden border-t border-[#222] bg-[#121212] px-8 pt-28 font-sans lg:px-20"
    >
      {/* Top Grid - Contact & Links */}
      <div className="relative z-20 mb-32 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Right Columns - Project Description */}
        <div className="flex flex-col justify-end lg:col-span-8 lg:pl-16">
          <h4 className="mb-8 font-serif text-3xl leading-tight tracking-tight text-[#D4AF37] italic lg:text-5xl">
            Mining Underground
          </h4>
          <p className="mb-12 max-w-3xl font-sans text-[15px] leading-loose text-[#A3A3A3]">
            A numerical decision system for selecting the most suitable mining
            method. It evaluates the technical compatibility of various methods
            by comparing the characteristics of your deposit with the
            requirements of each.
          </p>
          <div className="flex flex-col gap-12 border-t border-[#333] pt-10 sm:flex-row">
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[#B87333] uppercase opacity-80">
                Core Algorithm
              </span>
              <span className="text-sm font-medium tracking-wide text-[#E5E5E5]">
                Nicholas Approach
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[#B87333] uppercase opacity-80">
                Discipline
              </span>
              <span className="text-sm font-medium tracking-wide text-[#E5E5E5]">
                Rock Mechanics
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[#B87333] uppercase opacity-80">
                Status
              </span>
              <span className="text-sm font-medium tracking-wide text-[#D4AF37]">
                Engine Active
              </span>
            </div>
          </div>
        </div>

        {/* Left Column - Social Links */}
        <div className="flex flex-col space-y-10 lg:col-span-4">
          <div className="flex flex-col space-y-6">
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-[#B87333] uppercase opacity-80">
              Network
            </h4>
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="w-fit font-serif text-2xl text-white italic transition-all duration-300 hover:text-[#D4AF37] lg:text-3xl"
              >
                Instagram
              </a>
              <a
                href="#"
                className="w-fit font-serif text-2xl text-white italic transition-all duration-300 hover:text-[#D4AF37] lg:text-3xl"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="w-fit font-serif text-2xl text-white italic transition-all duration-300 hover:text-[#D4AF37] lg:text-3xl"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Reveal Text Container */}
      <div
        className="flex w-full items-end justify-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <span
          ref={textRef}
          className="block w-full text-center font-sans text-[18vw] leading-[0.8] font-black tracking-tight whitespace-nowrap text-[#D4AF37]"
          style={{ transform: 'translateY(100%)' }} // Matched with GSAP start
        >
          LUICCIAN
        </span>
      </div>
    </footer>
  );
}
