import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import MethodCard from '../components/cards/MethodCard';
import { METHODS_DATA, type MethodCard as MethodCardData } from '../content';

gsap.registerPlugin(ScrollTrigger);

// max-w-425 = 1700px: mirrors the content column so the rail starts and ends
// under the same horizontal padding as the rest of the page.
const RAIL_PADDING = 'max(1rem, calc((100vw - 1700px) / 2 + 2rem))';

type MethodsRailProps = {
  methods?: MethodCardData[];
};

export default function MethodsRail({
  methods = METHODS_DATA,
}: MethodsRailProps) {
  // The outer wrapper is what we pin
  const sectionRef = useRef<HTMLElement>(null);
  // The inner horizontal rail (this is what moves in X)
  const railRef = useRef<HTMLDivElement>(null);
  // Wrapper that clips the rail
  const viewportRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rail = railRef.current;
        const viewport = viewportRef.current;
        if (!rail || !viewport) return;

        // Total X distance = total rail width minus what's already visible
        const railOverflow = () => rail.scrollWidth - viewport.offsetWidth;

        const scrollTween = gsap.to(rail, {
          x: () => -railOverflow(),
          ease: 'none', // REQUIRED for containerAnimation + scrub
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            // pin for as long as the rail needs to travel (ratio: rail/viewport)
            end: () => `+=${railOverflow() + window.innerHeight * 0.5}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Cards reveal as they scroll into view horizontally
        const cards = rail.querySelectorAll<HTMLElement>('.method-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: card,
                start: 'left 90%',
                end: 'left 40%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
        };
      });

      // Reduced-motion: no pin, no horizontal scroll
      mm.add('(prefers-reduced-motion: reduce)', () => {
        sectionRef.current
          ?.querySelectorAll('.method-card')
          .forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="methods-mining"
      ref={sectionRef}
      aria-labelledby="methods-grid-heading"
      data-section="methods-grid"
      className="bg-background"
    >
      {/* ── Headline block (inside pin, scrolls away naturally) ────────────── */}
      <div className="mx-auto w-full max-w-425 px-4 pt-24 pb-12 md:px-8">
        <Eyebrow label="Methods evaluated" code="NM-03" />

        {/* Headline */}
        <Reveal y={48} duration={0.8}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="methods-grid-heading"
              className="font-boldonse text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-tight text-text-primary"
            >
              10 Mining
              <br />
              <span className="text-primary">Methods</span>
            </h2>
            <p className="max-w-xs font-prompt text-[13px] leading-relaxed text-text-primary/55 md:text-right">
              Every method evaluated by the Nicholas&nbsp;1981 algorithm — from
              surface to deep underground.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Horizontal rail viewport ────────────────────────────────────────── */}
      <div
        ref={viewportRef}
        className="w-full overflow-hidden pb-20"
        aria-label="Scroll to see all 10 mining methods"
      >
        {/* Rail — flex row of cards, wider than the viewport */}
        <div
          ref={railRef}
          className="flex gap-4 will-change-transform md:gap-6"
          style={{ paddingLeft: RAIL_PADDING }}
        >
          {methods.map((method, index) => (
            <MethodCard key={method.name} method={method} index={index} />
          ))}
          {/* Trailing spacer — mirrors the left padding so the last card
              ends with the same margin as the right edge of max-w-425 */}
          <div
            className="shrink-0"
            style={{ width: RAIL_PADDING }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Bottom rule (outside pin scope so it doesn't block) ─────────────── */}
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        <div className="flex items-center justify-between border-t border-text-primary/10 py-6 font-mono text-[11px] tracking-widest text-text-primary/40 uppercase">
          <span>Nicholas 1981</span>
          <span>10 / 10</span>
        </div>
      </div>
    </section>
  );
}
