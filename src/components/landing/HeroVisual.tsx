// HeroVisual.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { motion } from 'motion/react';
import BlurText from './components/BlurText';
import CardsCarousel from './components/CardsCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLVideoElement>(null);
  const pinTriggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
            },
          }
        );

        // Pin del hero: crea el espacio de scroll que activa las cards
        ScrollTrigger.create({
          trigger: pinTriggerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-svh w-full px-5"
      data-purpose="hero-visual"
    >
      <div ref={pinTriggerRef} className="relative h-full overflow-hidden">
        <div
          ref={taglineRef}
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-6 pt-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto my-10 max-w-70 text-sm leading-relaxed font-medium tracking-tight text-black uppercase"
          >
            AI analyzes site data and predicts environmental risk — <br />
            before a single tree comes down
          </motion.p>
          <BlurText text="See the impact before you break ground" />
        </div>

        <div ref={imageWrapperRef} className="absolute inset-0 overflow-hidden">
          <motion.video
            ref={imageRef}
            autoPlay
            muted
            loop
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: 'inset(40% 0 0 0)' }}
            src="/video-test.mp4"
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(40% 0 0 0)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <CardsCarousel pinTrigger={pinTriggerRef} />
        </div>
      </div>
    </div>
  );
}
