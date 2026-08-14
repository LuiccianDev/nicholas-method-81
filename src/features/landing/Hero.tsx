// HeroVisual.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import BlurText from './components/BlurText';
import CardsCarousel from './components/CardsCarousel';
import { HERO_PIN_DISTANCE } from './gsapConfig';

gsap.registerPlugin(ScrollTrigger);

const HERO_CAPTIONS = [
  { left: 'Geometry · Grade · Geomechanics', right: 'Ranked in seconds' },
  {
    left: 'Every method scored the same way',
    right: 'Nicholas 1981 methodology',
  },
  { left: 'From ten candidates to one', right: 'Refine by cost with the AI' },
] as const;

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLVideoElement>(null);
  const captionLeftRef = useRef<HTMLParagraphElement>(null);
  const captionRightRef = useRef<HTMLParagraphElement>(null);
  const captionBottomRef = useRef<HTMLDivElement>(null);
  const isFirstBeat = useRef(true);
  const [activeBeat, setActiveBeat] = useState(0);

  useGSAP(
    () => {
      if (!captionLeftRef.current || !captionRightRef.current) return;
      if (isFirstBeat.current) {
        isFirstBeat.current = false;
        return;
      }

      gsap
        .timeline()
        .to([captionLeftRef.current, captionRightRef.current], {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: 'power2.out',
        })
        .call(() => {
          if (captionLeftRef.current)
            captionLeftRef.current.textContent = HERO_CAPTIONS[activeBeat].left;
          if (captionRightRef.current)
            captionRightRef.current.textContent =
              HERO_CAPTIONS[activeBeat].right;
        })
        .fromTo(
          [captionLeftRef.current, captionRightRef.current],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
        )
    },
    { dependencies: [activeBeat], scope: containerRef }
  );

  useGSAP(
    () => {
      // Reveal inicial del video — corre siempre al montar, sin depender del
      // scroll ni de prefers-reduced-motion (igual que la versión anterior
      // con Framer Motion). clipPath y opacity quedan 100% en manos de GSAP
      // acá: antes Framer Motion también los controlaba vía initial/animate
      // en <motion.video>, y al re-renderizar Hero (por el cambio de
      // activeBeat) Framer reafirmaba su valor y pisaba el progreso del
      // scroll — eso causaba el recorte incorrecto al llegar al 2do grupo.
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(35% 0 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }
      );

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
              start: 'top top',
              end: '+=20%',
              scrub: 0.3,
            },
          }
        );

        // Continúa el clip que empezó el reveal de arriba, ahora atado al
        // scroll. Mismo elemento, mismo propietario (GSAP) de principio a fin.
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(35% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=20%',
              scrub: 0.3,
            },
          }
        );

        // Pin del hero — dedicado, sin animación propia. El rango debe
        // coincidir con el end del scroll-timeline de CardsCarousel para
        // que ambos avancen sobre la misma distancia (de ahí la constante
        // compartida HERO_PIN_DISTANCE en vez de repetir el string).
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: HERO_PIN_DISTANCE,
          pin: true,
          pinSpacing: true,
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
              className="mx-auto my-5 max-w-70 text-sm leading-relaxed font-medium tracking-tight text-balance text-black uppercase"
            >
              Rank all ten mining methods from the deposit's <br />
              geometry, grade, and geomechanics — in seconds.
            </motion.p>
            <BlurText text="The right method, ranked in seconds" />
          </div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <div className="absolute top-1/2 left-12 z-10 max-w-60 -translate-y-1/2">
              <p
                ref={captionLeftRef}
                className="text-3xl leading-tight font-bold text-white"
              >
                {HERO_CAPTIONS[0].left}
              </p>
            </div>
            <div className="absolute top-1/2 right-12 z-10 max-w-60 -translate-y-1/2 text-right">
              <p
                ref={captionRightRef}
                className="text-3xl leading-tight font-bold text-white"
              >
                {HERO_CAPTIONS[0].right}
              </p>
            </div>
          </motion.div>

          <div  className="absolute bottom-20 z-10 flex justify-center items-center mx-auto w-full text-center"
          >
            <p ref={captionBottomRef} style={{ opacity: 0 }} className="text-9xl leading-tight font-bold text-center text-white">
            Enginierrinf Descicion 
            </p>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={imageRef}
              autoPlay
              muted
              loop
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              src="/video-test.mp4"
            />
            <CardsCarousel
              pinTrigger={containerRef}
              onBeatChange={setActiveBeat}
            />
            <div className="absolute right-0 bottom-0 left-0 z-49 min-h-5 flex-col bg-white font-sans"></div>
          </div>
        </div>
      </div>
    </>
  );
}
