import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  forwardRef,
  type RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import StatCard from '../../components/cards/StatCard';
import StatementCard from '../../components/cards/StatementCard';
import FeaturedStatCard from '../../components/cards/FeaturedStatCard';

gsap.registerPlugin(ScrollTrigger);

type HeroCarouselProps = {
  pinTrigger: RefObject<HTMLDivElement | null>;
  onBeatChange?: (index: number) => void;
};

export type HeroCarouselHandle = {
  addRevealTo: (tl: gsap.core.Timeline, position?: number) => void;
};

type GroupRef = RefObject<HTMLDivElement | null>;

function addGroupTransition(
  tl: gsap.core.Timeline,
  from: GroupRef,
  to: GroupRef,
  atTime: number,
  toY: number,
  onEnter: () => void
) {
  tl.call(onEnter, undefined, atTime);

  tl.to(
    from.current,
    { y: -100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'circ.out' },
    atTime
  );

  tl.to(
    to.current,
    {
      y: toY,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'circ.out',
    },
    atTime
  );

  tl.set(to.current, { filter: 'none' }, atTime + 0.4);
}

const HeroCarousel = forwardRef<HeroCarouselHandle, HeroCarouselProps>(
  function HeroCarousel({ pinTrigger, onBeatChange }, ref) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const group1Ref = useRef<HTMLDivElement>(null);
    const group2Ref = useRef<HTMLDivElement>(null);
    const group3Ref = useRef<HTMLDivElement>(null);

    const [activeGroup, setActiveGroup] = useState(0);

    const goToBeat = (index: number) => {
      setActiveGroup(index);
      onBeatChange?.(index);
    };

    // El entrance de group1 ya NO corre en un timeline propio. Se expone
    // aquí para que Hero lo inyecte en SU MISMO timeline maestro,
    // junto al clipPath de la imagen — mismo reloj, cero desincronización.
    useImperativeHandle(ref, () => ({
      addRevealTo(tl, position = 0) {
        tl.fromTo(
          group1Ref.current,
          { opacity: 0, y: 110, filter: 'blur(36px)' },
          { opacity: 1, y: 110, duration: 0.6 },
          position
        ).fromTo(
          group1Ref.current,
          { filter: 'blur(36px)' },
          { filter: 'blur(0px)', duration: 0.7 },
          position
        );

        tl.set(group1Ref.current, { filter: 'none' }, position + 0.7);
      },
    }));

    useGSAP(
      () => {
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          if (!sectionRef.current) return;

          gsap.set(group2Ref.current, { filter: 'blur(20px)' });
          gsap.set(group3Ref.current, { filter: 'blur(20px)' });

          // Timeline de scrub — NO pinea (el pin es responsabilidad exclusiva
          // del ScrollTrigger dedicado en Hero.tsx). Mismo trigger y mismo
          // end (HERO_PIN_DISTANCE) para que avancen en paralelo.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinTrigger.current,
              start: 'top top',
              end: '+=190%',
              scrub: 0.5,
            },
          });

          tl.call(() => goToBeat(0), undefined, 0);
          tl.fromTo(
            group1Ref.current,
            { y: 110 },
            { y: -50, duration: 0.4, ease: 'circ.out' },
            0
          );

          addGroupTransition(tl, group1Ref, group2Ref, 0.6, -50, () =>
            goToBeat(1)
          );
          addGroupTransition(tl, group2Ref, group3Ref, 1.6, 0, () =>
            goToBeat(2)
          );

          tl.to({}, { duration: 0.6 });
        });

        mm.add('(prefers-reduced-motion: reduce)', () => {
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
      <div
        ref={sectionRef}
        className="absolute inset-0 mx-auto w-full max-w-3xl"
      >
        <div
          ref={group1Ref}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{
            opacity: 0,
            transform: 'translateY(50px)',
          }}
        >
          <div className="grid w-full grid-cols-2 gap-2">
            <StatCard
              eyebrow="Deposit parameters"
              value={13}
              suffix="params"
              decimals={0}
              status="Geometry · grade · geomechanics"
              size="h-50 w-full max-w-sm"
              active={activeGroup === 0}
              delay={0.9}
            />
            <StatCard
              eyebrow="Rock zones"
              value={3}
              suffix="zones"
              decimals={0}
              status="Ore · hanging-wall · footwall"
              size="h-50 w-full max-w-sm"
              active={activeGroup === 0}
              delay={0.9}
            />
          </div>
          <StatementCard
            eyebrow="Describe the deposit"
            statement="Your geology in ranked results out"
            status="A short form, not a full study"
            size="h-50 w-full "
            active={activeGroup === 0}
            delay={0.9}
          />
        </div>

        <div
          ref={group2Ref}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: 0,
            transform: 'translateY(400px)',
            filter: 'blur(28px)',
          }}
        >
          <FeaturedStatCard
            eyebrow="Ranked objectively"
            value={10}
            suffix="methods"
            decimals={0}
            status="Nicholas 1981 methodology"
            size="h-100 w-full"
            active={activeGroup === 1}
            delay={0.45}
            tags={[
              'Open pit',
              'Block caving',
              'Cut & fill',
              'Sublevel stoping',
              'Room & pillar',
              '+5 more',
            ]}
          />
        </div>

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
            <StatementCard
              eyebrow="Shortlist"
              statement="Keep the top picks"
              status="Highest-ranked methods"
              size="h-80 w-full "
              active={activeGroup === 2}
              delay={0.45}
            />
            <StatCard
              eyebrow="Decision"
              value={1}
              suffix="winner"
              decimals={0}
              status="Refine by cost with the AI"
              size="h-80 w-full "
              active={activeGroup === 2}
              delay={0.45}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default HeroCarousel;
