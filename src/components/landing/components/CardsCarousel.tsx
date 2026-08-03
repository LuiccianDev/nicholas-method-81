// CardsCarousel.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type RefObject, useRef } from 'react';
import Card from './Card';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { id: 'soil', label: 'Soil stability', value: 87, suffix: '%', decimals: 0, status: 'Low Risk', size: 'h-56 w-full max-w-md' },
  { id: 'canopy', label: 'Tree canopy loss', value: 12, suffix: '%', decimals: 0, status: 'Projected', size: 'h-56 w-full max-w-md' },
  { id: 'water', label: 'Water table', value: 3.2, suffix: '', decimals: 1, status: 'Flag', isFlag: true, prefixText: 'Detected at', unit: 'm', size: 'h-48 w-full max-w-xl' },
];

type CardsCarouselProps = {
  pinTrigger: RefObject<HTMLDivElement | null>;
};

export default function CardsCarousel({ pinTrigger }: CardsCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);

        gsap.set(cards, { opacity: 0, y: 0, scale: 0.95 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger.current,
            start: '20px 20px',
            end: '+=150%',
            scrub: 1,
            markers: true,
          },
        });

        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 5, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: 'power2.out' },
            i * 2 // separa la entrada de cada card en el timeline
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [pinTrigger] }
  );

  return (
    <div ref={sectionRef} className="absolute inset-0 flex flex-col items-center justify-center w-min-7xl">
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute "

        >
          <Card
            label={card.label}
            value={card.value}
            suffix={card.suffix}
            status={card.status}
            size={card.size}
            decimals={card.decimals}
            isFlag={card.isFlag}
            prefixText={card.prefixText}
            unit={card.unit}
          />
        </div>
      ))}
    </div>
  );
}