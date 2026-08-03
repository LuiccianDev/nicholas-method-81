import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { motion } from 'motion/react';
import Cards from './components/Cards';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Scroll triger usando gsap para hreflind
        gsap.fromTo(
          taglineRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 20px',
              end: '+=20',
              scrub: true,
              markers: false,
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(40% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 30px',
              end: '+=20',
              scrub: 1,
              pin: true,
              markers: false,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="h-svh w-full px-5"
      data-purpose="hero-visual"
    >
      <div className="relative h-full overflow-hidden">
        <div
          ref={taglineRef}
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-6 pt-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto my-10 max-w-70 text-sm leading-relaxed font-medium tracking-tight text-black uppercase"
          >
            AI analyzes site data and predicts environmental risk — <br />
            before a single tree comes down
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="px-2 text-7xl leading-tight font-extrabold tracking-tighter text-black"
          >
            <span>See the impact before you break ground</span>
          </motion.h1>
        </div>

        <div ref={imageWrapperRef} className="absolute inset-0 overflow-hidden">
          <motion.img
            ref={imageRef}
            alt="Environmental field background"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: 'inset(40% 0 0 0)' }}
            src="/dashboard_bg.jpg"
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(40% 0 0 0)' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </div>
        <Cards />
      </div>
    </main>
  );
}
