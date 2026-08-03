// CardsCarousel.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type RefObject, useRef, useState } from 'react';
import Card from './Card';

gsap.registerPlugin(ScrollTrigger);

type CardsCarouselProps = {
  pinTrigger: RefObject<HTMLDivElement | null>;
};

export default function CardsCarousel({ pinTrigger }: CardsCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // un ref por GRUPO, no por card individual
  const group1Ref = useRef<HTMLDivElement>(null); // 3 cards (grid)
  const group2Ref = useRef<HTMLDivElement>(null); // 1 card
  const group3Ref = useRef<HTMLDivElement>(null); // 2 cards (grid)

  const [activeGroup, setActiveGroup] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!sectionRef.current) return;

        gsap.to(group1Ref.current, {
          y: 110,
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
        });

        // Grupo 2 y 3: inician debajo del viewport
        /*      gsap.set(group2Ref.current, { y: 0, opacity: 0, scale: 1 });
        gsap.set(group3Ref.current, { y: 0, opacity: 0, scale: 1 }); */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
        });

        // --- Beat 1: Grupo 1 sube al centro ---
        tl.call(() => setActiveGroup(0), undefined, 0);
        tl.fromTo(
          group1Ref.current,
          { y: 110 },
          { y: -50, duration: 0.4, ease: 'circ.out' },
          0
        );

        // --- Transición 1→2: Grupo 1 sale mientras Grupo 2 entra ---
        tl.to(
          group1Ref.current,
          { y: -100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'circ.out' },
          0.6
        );
        tl.to(
          group2Ref.current,
          { y: -50, opacity: 1, scale: 1, duration: 0.4, ease: 'circ.out' },
          0.6
        );
        tl.call(() => setActiveGroup(1), undefined, 1.0);

        // --- Beat 2: Grupo 2 descansa visible en el centro (hold 0.6→1.6) ---

        // --- Transición 2→3: Grupo 2 sale mientras Grupo 3 entra ---
        tl.to(
          group2Ref.current,
          { y: -100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'circ.out' },
          1.6
        );
        tl.to(
          group3Ref.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
          1.6
        );
        tl.call(() => setActiveGroup(2), undefined, 2.0);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(group1Ref.current, { opacity: 1, y: 320 });
        gsap.set(group2Ref.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(group3Ref.current, { opacity: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [pinTrigger] }
  );

  return (
    <div ref={sectionRef} className="absolute inset-0 mx-auto w-full max-w-2xl">
      {/* Grupo 1 — 3 cards en grid (2 arriba + 1 abajo) */}
      <div
        ref={group1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{ opacity: 0, transform: 'translateY(50px)' }}
      >
        <div className="grid w-full max-w-lg grid-cols-2 gap-2">
          <Card
            label="Soil stability"
            value={87}
            suffix="%"
            decimals={0}
            status="Low Risk"
            size="h-40 w-full max-w-sm"
            active={activeGroup === 0}
          />
          <Card
            label="Tree canopy loss"
            value={12}
            suffix="%"
            decimals={0}
            status="Projected"
            size="h-40 w-full max-w-sm"
            active={activeGroup === 0}
          />
        </div>
        <Card
          label="Water table"
          value={3.2}
          suffix=""
          decimals={1}
          status="Flag"
          size="h-50 w-full max-w-lg"
          active={activeGroup === 0}
        />
      </div>

      {/* Grupo 2 — 1 card sola */}
      <div
        ref={group2Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, transform: 'translateY(400px)' }}
      >
        <Card
          label="Landslide risk"
          value={74}
          suffix="%"
          decimals={0}
          status="Elevated"
          size="h-56 w-full max-w-md"
          active={activeGroup === 1}
        />
      </div>

      {/* Grupo 3 — 2 cards en grid */}
      <div
        ref={group3Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, transform: 'translateY(400px)' }}
      >
        <div className="grid w-full max-w-lg grid-cols-2 gap-4">
          <Card
            label="Air quality"
            value={91}
            suffix="%"
            decimals={0}
            status="Good"
            size="h-56 w-full max-w-md"
            active={activeGroup === 2}
          />
          <Card
            label="Erosion rate"
            value={3.8}
            suffix=""
            decimals={1}
            status="Within limits"
            size="h-56 w-full max-w-md"
            active={activeGroup === 2}
          />
        </div>
      </div>
    </div>
  );
}
