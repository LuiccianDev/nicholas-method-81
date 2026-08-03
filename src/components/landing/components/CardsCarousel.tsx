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

        // Card 1 (Soil): entrada conservada, reposa abajo en y:320
        gsap.fromTo(
          soilRef.current,
          { opacity: 0, y: 400 },
          { opacity: 1, y: 100, duration: 0.5, delay: 1 }
        );

        // Card 2 (Canopy) y Card 3 (Water): inician debajo del viewport
        gsap.set(canopyRef.current, { y: 420, opacity: 0, scale: 0.92 });
        gsap.set(waterRef.current, { y: 420, opacity: 0, scale: 0.92 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
        });

        // Beat 1: Card 1 sube al centro
        tl.to(
          soilRef.current,
          { y: 0, duration: 0.4, ease: 'power2.out' },
          0.1
        );

        // Beat 2: Card 1 sale, Card 2 entra al centro
        tl.to(
          canopyRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.53, ease: 'power3.out' },
          0.9
        );
        tl.to(
          soilRef.current,
          {
            y: -120,
            opacity: 0,
            scale: 0.94,
            duration: 0.35,
            ease: 'power2.in',
          },
          1.25
        );
        tl.call(() => setActiveIndex(1), undefined, 1.4);

        // Beat 3: Card 2 sale, Card 3 entra al centro
        tl.to(
          waterRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
          1.9
        );
        tl.to(
          canopyRef.current,
          {
            y: -120,
            opacity: 0,
            scale: 0.94,
            duration: 0.35,
            ease: 'power2.in',
          },
          2.25
        );
        tl.call(() => setActiveIndex(2), undefined, 2.4);
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
