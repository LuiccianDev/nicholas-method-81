import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { METHODS_DATA, type MethodCard } from './landingContent';

gsap.registerPlugin(ScrollTrigger);

// ─── Placeholder images (rotated until real method assets arrive) ─────────────
const PUBLIC_IMAGES = [
  '/Underground_Portada.jpeg',
  '/Underground.jpeg',
  '/dashboard_bg.jpg',
];
const getImg = (i: number) => PUBLIC_IMAGES[i % PUBLIC_IMAGES.length];

// ─── Single method card ───────────────────────────────────────────────────────
function MethodCard({ method, index }: { method: MethodCard; index: number }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className="method-card group flex w-56 shrink-0 flex-col gap-0 md:w-68"
      aria-label={`Mining method: ${method.name}`}
    >
      {/* Image — compact, 3/4 aspect */}
      <div className="relative overflow-hidden rounded-xl bg-text-primary">
        <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
          <img
            src={getImg(index)}
            alt={`${method.name} mining method`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* gradient */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

          {/* index badge */}
          <span className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-widest text-white/60 uppercase">
            {num}
          </span>

          {/* method code overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <span className="font-boldonse text-[11px] leading-tight tracking-widest text-white/85 uppercase">
              {method.code}
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 px-0.5 pt-2.5 pb-1">
        <h3 className="font-boldonse text-[14px] leading-snug tracking-tight text-text-primary">
          {method.name}
        </h3>
        <p className="font-prompt text-[12px] leading-relaxed text-text-primary/50">
          {method.descriptor}
        </p>
      </div>
    </article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
type MethodsGridProps = {
  methods?: MethodCard[];
};

export default function MethodsGrid({
  methods = METHODS_DATA,
}: MethodsGridProps) {
  // The outer wrapper is what we pin
  const sectionRef = useRef<HTMLElement>(null);
  // The headline block animates in Y on scroll-enter
  const headRef = useRef<HTMLDivElement>(null);
  // The inner horizontal rail (this is what moves in X)
  const railRef = useRef<HTMLDivElement>(null);
  // Wrapper that clips the rail
  const viewportRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── 1. Headline fade-up on scroll enter ────────────────────────────
        gsap.fromTo(
          headRef.current,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headRef.current,
              start: 'top 85%',
              end: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // ── 2. Horizontal scroll — pin section, animate rail in X ──────────
        const rail = railRef.current;
        const viewport = viewportRef.current;
        if (!rail || !viewport) return;

        // Total X distance = total rail width minus what's already visible
        const getScrollDistance = () =>
          -(rail.scrollWidth - viewport.offsetWidth);

        const scrollTween = gsap.to(rail, {
          x: getScrollDistance,
          ease: 'none', // REQUIRED for containerAnimation + scrub
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            // pin for as long as the rail needs to travel (ratio: rail/viewport)
            end: () =>
              `+=${rail.scrollWidth - viewport.offsetWidth + window.innerHeight * 0.5}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ── 3. Each card fades-up triggered by containerAnimation ──────────
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
        gsap.set(headRef.current, { opacity: 1, y: 0 });
        gsap.set('.method-card', { opacity: 1, y: 0 });
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
      className="bg-white"
    >
      {/* ── Headline block (inside pin, scrolls away naturally) ────────────── */}
      <div className="mx-auto w-full max-w-425 px-4 pt-24 pb-12 md:px-8">
        {/* Top rule */}
        <div className="mb-12 flex items-center gap-6 border-t border-text-primary/10 pt-6 font-mono text-[11px] font-medium tracking-widest uppercase">
          <span>Methods evaluated</span>
          <span className="ml-auto text-text-primary/40">NM-03</span>
        </div>

        {/* Headline */}
        <div ref={headRef} style={{ opacity: 0 }}>
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
        </div>
      </div>

      {/* ── Horizontal rail viewport ────────────────────────────────────────── */}
      {/*
        Tailwind 4: max-w-425 = 425 × 0.25rem = 106.25rem = 1700px.
        The rail's paddingLeft mirrors mx-auto max-w-425 px-4 md:px-8:
          on wide screens  → (100vw - 1700px) / 2 + 32px
          on narrow screens → clamp floor of 16px (px-4)
      */}
      <div
        ref={viewportRef}
        className="w-full overflow-hidden pb-20"
        aria-label="Scroll to see all 10 mining methods"
      >
        {/* Rail — flex row of cards, wider than the viewport */}
        <div
          ref={railRef}
          className="flex gap-4 will-change-transform md:gap-6"
          style={{
            paddingLeft: 'max(1rem, calc((100vw - 1700px) / 2 + 2rem))',
          }}
        >
          {methods.map((method, index) => (
            <MethodCard key={method.name} method={method} index={index} />
          ))}
          {/* Trailing spacer — mirrors the left padding so the last card
              ends with the same margin as the right edge of max-w-425 */}
          <div
            className="shrink-0"
            style={{
              width: 'max(1rem, calc((100vw - 1700px) / 2 + 2rem))',
            }}
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
