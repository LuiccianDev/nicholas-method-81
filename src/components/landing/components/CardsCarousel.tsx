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

  // un ref por card, explícito, sin array/map
  const soilRef = useRef<HTMLDivElement>(null);
  const canopyRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!sectionRef.current) return;

        // Card 1 (Soil): entrada conservada, reposa abajo en y:100
        gsap.set(soilRef.current, { y: 105, opacity: 0 });
        gsap.to(soilRef.current, {
          y: 100,
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
        });

        // Card 2 y 3: inician debajo del viewport
        gsap.set(canopyRef.current, { y: 420, opacity: 0, scale: 1 });
        gsap.set(waterRef.current, { y: 420, opacity: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
        });

        // --- Beat 1: Soil sube al centro ---
        tl.call(() => setActiveIndex(0), undefined, 0);
        tl.fromTo(
          soilRef.current,
          { y: 100 },
          { y: -50, duration: 0.4, ease: 'circ.out' },
          0
        );

        // --- Transición 1→2: Soil sale mientras Canopy entra (crossfade sincronizado) ---
        tl.to(
          soilRef.current,
          { y: -100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'circ.out' },
          0.6
        );
        tl.to(
          canopyRef.current,
          { y: -50, opacity: 1, scale: 1, duration: 0.4, ease: 'circ.out' },
          0.6
        );
        tl.call(() => setActiveIndex(1), undefined, 1.0);

        // --- Beat 2: Canopy descansa visible en el centro ---
        // (sin tweens aquí — se mantiene con los valores del beat anterior hasta el siguiente)

        // --- Transición 2→3: Canopy sale mientras Water entra (crossfade sincronizado) ---
        tl.to(
          canopyRef.current,
          { y: -100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'circ.out' },
          1.6
        );
        tl.to(
          waterRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
          1.6
        );
        tl.call(() => setActiveIndex(2), undefined, 2.0);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(soilRef.current, { opacity: 1, y: 320 });
        gsap.set(canopyRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(waterRef.current, { opacity: 1, y: 0, scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [pinTrigger] }
  );

  return (
    <div ref={sectionRef} className="absolute inset-0 mx-auto w-full max-w-2xl">
      {/* Card 1 — Soil stability */}
      <div
        ref={soilRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Card
          label="Soil stability"
          value={87}
          suffix="%"
          decimals={0}
          status="Low Risk"
          size="h-56 w-full max-w-md"
          active={activeIndex === 0}
        />
      </div>

      {/* Card 2 — Tree canopy loss */}
      <div
        ref={canopyRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Card
          label="Tree canopy loss"
          value={12}
          suffix="%"
          decimals={0}
          status="Projected"
          size="h-56 w-full max-w-md"
          active={activeIndex === 1}
        />
      </div>

      {/* Card 3 — Water table */}
      <div
        ref={waterRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Card
          label="Water table"
          value={3.2}
          suffix=""
          decimals={1}
          status="Flag"
          isFlag
          prefixText="Detected at"
          unit="m"
          size="h-48 w-full max-w-xl"
          active={activeIndex === 2}
        />
      </div>
    </div>
  );
}
