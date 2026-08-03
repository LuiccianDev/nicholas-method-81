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
  const imageRef = useRef<HTMLVideoElement>(null);

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
          { clipPath: 'inset(35% 0 0 0)' },
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

        // Pin del hero: pina el contenedor completo
        ScrollTrigger.create({
          trigger: containerRef.current,
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
    <>
      <div
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
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto my-10 max-w-70 text-sm leading-relaxed font-medium tracking-tight text-black uppercase"
            >
              AI analyzes site data and predicts environmental risk — <br />
              before a single tree comes down
            </motion.p>
            <BlurText text="See the impact before you break ground" />
          </div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <div className="absolute top-1/2 left-12 z-10 max-w-60 -translate-y-1/2">
              <p className="text-3xl leading-tight font-bold text-white">
                Drone + sensor fusion
              </p>
            </div>
            <div className="absolute top-1/2 right-12 z-10 max-w-60 -translate-y-1/2 text-right">
              <p className="text-3xl leading-tight font-bold text-white">
                Risk flagged automatically
              </p>
            </div>
          </motion.div>

          <div className="absolute inset-0 overflow-hidden">
            <motion.video
              ref={imageRef}
              autoPlay
              muted
              loop
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: 'inset(35% 0 0 0)' }}
              src="/video-test.mp4"
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(35% 0 0 0)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <CardsCarousel pinTrigger={containerRef} />
            <div
              className="absolute right-0 bottom-0 left-0 z-49 min-h-5 flex-col bg-white font-sans"
            >
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
