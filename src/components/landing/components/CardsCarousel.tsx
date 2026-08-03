// CardsCarousel.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type RefObject, useRef } from 'react';
import { motion } from 'motion/react';
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!sectionRef.current) return;

        const containerHeight = sectionRef.current.offsetHeight;
        const startOffsetY = containerHeight/ 2  ;

        const cards = [soilRef.current, canopyRef.current, waterRef.current].filter(
          (c): c is HTMLDivElement => c !== null
        );



        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger.current,
            start: '51% center',
            end: '+=150%',
            scrub: 1,
            markers : true
          },
        });

        tl.to(soilRef.current, { y: 0, duration: 1, ease: 'power2.out' }, 0);
        tl.to(canopyRef.current, { y: 0, duration: 1, ease: 'power2.out' }, 1.2);
        tl.to(waterRef.current, { y: 0, duration: 1, ease: 'power2.out' }, 2.4);

        gsap.fromTo(
          soilRef.current,{opacity : 0, y : 400},
          {opacity : 1,
            y : 320,
            duration : 0.5,
            delay : 1
          }
        )
        gsap.fromTo(
          canopyRef.current,{opacity : 0,y : 600},
          {opacity : 1,
          }
        )
        gsap.to(
          waterRef.current,
          {opacity : 0,
          }
        )



      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [pinTrigger] }
  );

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-2xl mx-auto"
    >
        {/* Card 1 — Water table */}
        <div ref={soilRef} className="w-full flex items-center justify-center">
          <Card
            label="Soil stability"
            value={87}
            suffix="%"
            decimals={0}
            status="Low Risk"
            size="h-56 w-full max-w-md"
            active
          />
        </div>


        {/* Card 2 — Water table */}
        <div ref={canopyRef} className="w-full flex items-center justify-center">
          <Card
            label="Tree canopy loss"
            value={12}
            suffix="%"
            decimals={0}
            status="Projected"
            size="h-56 w-full max-w-md"
          />
        </div>


      {/* Card 3 — Water table */}

        <div ref={waterRef} className="w-full flex items-center justify-center">
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
          />
        </div>

    </div>
  );
}