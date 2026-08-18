import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import BlurReveal from '../../components/BlurReveal';
import HeroCarousel, { type HeroCarouselHandle } from './HeroCarousel';
import { HERO_PIN_DISTANCE } from '../../animation';

gsap.registerPlugin(ScrollTrigger);

const HERO_CAPTIONS = [
  {
    left: 'Built for the ground truth, not the estimate',
    right: 'Rank all ten mining methods ',
    bottomPrimary: 'Engineering decisions',
    bottomSecondary: "your site can't take back",
  },
  {
    left: 'Every method scored the same way',
    right: 'Evaluates deposit characteristics objectively.',
    bottomPrimary: 'Objective scoring',
    bottomSecondary: 'backed by Nicholas 1981',
  },
  {
    left: 'From ten candidates to one',
    right: 'Refine by cost and technical ',
    bottomPrimary: 'Optimal selection',
    bottomSecondary: 'refined with intelligent AI',
  },
] as const;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const captionLeftRef = useRef<HTMLParagraphElement>(null);
  const captionRightRef = useRef<HTMLParagraphElement>(null);
  const captionBottomPrimaryRef = useRef<HTMLSpanElement>(null);
  const captionBottomSecondaryRef = useRef<HTMLSpanElement>(null);
  const captionBottomWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HeroCarouselHandle>(null);
  const isFirstBeat = useRef(true);
  const [activeBeat, setActiveBeat] = useState(0);

  useGSAP(
    () => {
      if (
        !captionLeftRef.current ||
        !captionRightRef.current ||
        !captionBottomPrimaryRef.current ||
        !captionBottomSecondaryRef.current
      )
        return;
      if (isFirstBeat.current) {
        isFirstBeat.current = false;
        return;
      }

      gsap
        .timeline()
        .to(
          [
            captionLeftRef.current,
            captionRightRef.current,
            captionBottomSecondaryRef.current,
          ],
          {
            opacity: 0,
            y: -8,
            duration: 0.2,
            ease: 'power2.out',
          }
        )
        .call(() => {
          if (captionLeftRef.current)
            captionLeftRef.current.textContent = HERO_CAPTIONS[activeBeat].left;
          if (captionRightRef.current)
            captionRightRef.current.textContent =
              HERO_CAPTIONS[activeBeat].right;
          if (captionBottomPrimaryRef.current)
            captionBottomPrimaryRef.current.textContent =
              HERO_CAPTIONS[activeBeat].bottomPrimary;
          if (captionBottomSecondaryRef.current)
            captionBottomSecondaryRef.current.textContent =
              HERO_CAPTIONS[activeBeat].bottomSecondary;
        })
        .fromTo(
          [
            captionLeftRef.current,
            captionRightRef.current,
            captionBottomSecondaryRef.current,
          ],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
    },
    { dependencies: [activeBeat], scope: containerRef }
  );

  useGSAP(
    () => {
      // Timeline maestro de entrada: la imagen (clipPath) y el reveal del
      // group1 de HeroCarousel corren aquí, en el MISMO timeline —
      // mismo reloj, sin posibilidad de desfase entre ambos archivos.
      const introTl = gsap.timeline();
      introTl.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(35% 0 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0
      );
      carouselRef.current?.addRevealTo(introTl, 0.5);

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline único: tagline, caption inferior e imagen comparten el mismo
        // scrollTrigger (0% -> 20%) para que avancen perfectamente sincronizados.
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=20%',
            scrub: 0.3,
          },
        });

        scrollTl
          .fromTo(
            taglineRef.current,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -300, ease: 'none' },
            0
          )
          .fromTo(
            captionBottomWrapperRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, ease: 'power2.out' },
            0
          )
          .fromTo(
            imageRef.current,
            { clipPath: 'inset(35% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', ease: 'none' },
            0
          );

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 2%',
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
        data-purpose="hero-visual "
      >
        <div className="relative h-full overflow-hidden">
          <div
            ref={taglineRef}
            className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-6 pt-10 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mb-10 max-w-90 text-sm leading-relaxed text-balance uppercase"
            >
              Rank all ten mining methods from the deposit's geometry, grade,
              and geomechanics in seconds.
            </motion.p>
            <BlurReveal text="The right method, ranked in seconds" />
          </div>
          <motion.div
            className="absolute inset-0 text-[25px] font-bold text-white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.55 }}
          >
            <div className="absolute top-1/2 left-10 z-10 max-w-80 -translate-y-1/2">
              <p ref={captionLeftRef}>{HERO_CAPTIONS[0].left}</p>
            </div>
            <div className="absolute top-1/2 right-10 z-10 max-w-80 -translate-y-1/2 text-right">
              <p ref={captionRightRef}>{HERO_CAPTIONS[0].right}</p>
            </div>
          </motion.div>

          <div
            ref={captionBottomWrapperRef}
            className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex flex-col items-center justify-center px-4 text-center text-5xl text-white select-none"
            style={{ opacity: 0 }}
          >
            <h2 className="flex flex-col items-center justify-center font-boldonse tracking-tight">
              <span ref={captionBottomPrimaryRef}>
                {HERO_CAPTIONS[0].bottomPrimary}
              </span>
              <span
                ref={captionBottomSecondaryRef}
                className="mt-5 font-boldonse tracking-tight italic shadow-xl"
              >
                {HERO_CAPTIONS[0].bottomSecondary}
              </span>
            </h2>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={imageRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              src="/Underground.jpeg"
            />
            <HeroCarousel
              ref={carouselRef}
              pinTrigger={containerRef}
              onBeatChange={setActiveBeat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
