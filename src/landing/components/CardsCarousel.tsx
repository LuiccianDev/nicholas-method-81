// CardsCarousel.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type RefObject, useRef, useState } from 'react';
import NumberCard from './cards/NumberCard';
import TextCard from './cards/TextCard';

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

        const reveal = gsap.timeline({ delay: 0 });
        reveal.fromTo(
          group1Ref.current,
          { opacity: 0, y: 110, filter: 'blur(36px)' },
          { opacity: 1, y: 110, duration: 0.6, ease: 'power2.out' },
          0
        );
        reveal.fromTo(
          group1Ref.current,
          { filter: 'blur(36px)' },
          { filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
          0
        );
        reveal.set(group1Ref.current, { filter: 'none' }, 0.9);

        // Grupo 2 y 3: inician debajo del viewport y borrosos
        gsap.set(group2Ref.current, { filter: 'blur(20px)' });
        gsap.set(group3Ref.current, { filter: 'blur(20px)' });

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
          {
            y: -50,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'circ.out',
          },
          0.6
        );
        tl.set(group2Ref.current, { filter: 'none' }, 1.0);
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
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'power3.out',
          },
          1.6
        );
        tl.set(group3Ref.current, { filter: 'none' }, 2.0);
        tl.call(() => setActiveGroup(2), undefined, 2.0);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Solo el grupo 1 visible: se evita apilar los 3 grupos en simultáneo
        gsap.set(group1Ref.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'none',
        });
        gsap.set(group2Ref.current, { display: 'none' });
        gsap.set(group3Ref.current, { display: 'none' });
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
        style={{
          opacity: 0,
          transform: 'translateY(50px)',
          filter: 'blur(36px)',
        }}
      >
        <div className="grid w-full grid-cols-2 gap-2">
          <NumberCard
            eyebrow="Deposit parameters"
            value={13}
            suffix="params"
            decimals={0}
            status="Geometry · grade · geomechanics"
            size="h-40 w-full max-w-sm"
            active={activeGroup === 0}
            delay={1.3}
          />
          <NumberCard
            eyebrow="Rock zones"
            value={3}
            suffix="zones"
            decimals={0}
            status="Ore · hanging-wall · footwall"
            size="h-40 w-full max-w-sm"
            active={activeGroup === 0}
            delay={1.3}
          />
        </div>
        <TextCard
          eyebrow="Describe the deposit"
          statement="Your geology in — ranked results out"
          status="A short form, not a full study"
          size="h-50 w-full "
          active={activeGroup === 0}
        />
      </div>

      {/* Grupo 2 — 1 card sola */}
      <div
        ref={group2Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: 0,
          transform: 'translateY(400px)',
          filter: 'blur(28px)',
        }}
      >
        <NumberCard
          eyebrow="Ranked objectively"
          value={10}
          suffix="methods"
          decimals={0}
          status="Nicholas 1981 methodology"
          size="h-56 w-full"
          active={activeGroup === 1}
        />
      </div>

      {/* Grupo 3 — 2 cards en grid */}
      <div
        ref={group3Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: 0,
          transform: 'translateY(400px)',
          filter: 'blur(28px)',
        }}
      >
        <div className="grid w-full grid-cols-2 gap-4">
          <TextCard
            eyebrow="Shortlist"
            statement="Keep the top picks"
            status="Highest-ranked methods"
            size="h-56 w-full "
            active={activeGroup === 2}
          />
          <NumberCard
            eyebrow="Decision"
            value={1}
            suffix="winner"
            decimals={0}
            status="Refine by cost with the AI"
            size="h-56 w-full "
            active={activeGroup === 2}
          />
        </div>
      </div>
    </div>
  );
}
