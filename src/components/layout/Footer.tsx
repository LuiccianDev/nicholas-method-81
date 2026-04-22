import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
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
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", 
          end: "bottom 95%", // End slightly before the absolute bottom
          scrub: 1.5, // Even smoother follow
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="mt-32 bg-[#121212] pt-28 px-8 lg:px-20 relative overflow-hidden flex flex-col font-sans border-t border-[#222]">
      
      {/* Top Grid - Contact & Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-32 relative z-20">
              {/* Right Columns - Project Description */}
        <div className="lg:col-span-8 flex flex-col justify-end lg:pl-16">
          <h4 className="text-[#D4AF37] font-serif italic text-3xl lg:text-5xl mb-8 tracking-tight leading-tight">
            Mining Underground
          </h4>
          <p className="text-[#A3A3A3] text-[15px] leading-loose max-w-3xl font-sans mb-12">
            A numerical decision system for selecting the most suitable mining method. It evaluates the technical compatibility of various methods by comparing the characteristics of your deposit with the requirements of each.
          </p>
          <div className="flex flex-col sm:flex-row gap-12 border-t border-[#333] pt-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[#B87333] font-mono text-[11px] uppercase tracking-[0.15em] opacity-80">Core Algorithm</span>
              <span className="text-[#E5E5E5] text-sm font-medium tracking-wide">Nicholas Approach</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[#B87333] font-mono text-[11px] uppercase tracking-[0.15em] opacity-80">Discipline</span>
              <span className="text-[#E5E5E5] text-sm font-medium tracking-wide">Rock Mechanics</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[#B87333] font-mono text-[11px] uppercase tracking-[0.15em] opacity-80">Status</span>
              <span className="text-[#D4AF37] text-sm font-medium tracking-wide">Engine Active</span>
            </div>
          </div>
        </div>
        
        {/* Left Column - Social Links */}
        <div className="lg:col-span-4 flex flex-col space-y-10">
          <div className="flex flex-col space-y-6">
            <h4 className="text-[#B87333] font-mono text-[11px] uppercase tracking-[0.2em] opacity-80">Network</h4>
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white font-serif italic text-2xl lg:text-3xl hover:text-[#D4AF37] transition-all duration-300 w-fit">
                Instagram
              </a>
              <a href="#" className="text-white font-serif italic text-2xl lg:text-3xl hover:text-[#D4AF37] transition-all duration-300 w-fit">
                LinkedIn
              </a>
              <a href="#" className="text-white font-serif italic text-2xl lg:text-3xl hover:text-[#D4AF37] transition-all duration-300 w-fit">
                GitHub
              </a>
            </div>
          </div>
        </div>


      </div>

 
      {/* Giant Reveal Text Container */}
      <div className="w-full flex justify-center items-end overflow-hidden" style={{ perspective: '1000px' }}>
        <span 
          ref={textRef}
          className="block w-full text-center text-[18vw] font-black font-sans tracking-tight text-[#D4AF37] leading-[0.8] whitespace-nowrap"
          style={{ transform: 'translateY(100%)' }} // Matched with GSAP start
        >
          LUICCIAN
        </span>
      </div>

    </footer>
  );
}
