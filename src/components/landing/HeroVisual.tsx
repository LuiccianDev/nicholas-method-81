import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  EASINGS,
  DURATIONS,
  DISTANCES,
  SCROLL_TRIGGER_DEFAULTS,
} from './animations';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingSpanRef = useRef<HTMLSpanElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: EASINGS.smoothSlow },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          taglineRef.current,
          { y: DISTANCES.fadeUp, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.heroLine }
        )
          .fromTo(
            headingSpanRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: DURATIONS.heroLine },
            `-=${DURATIONS.heroStagger}`
          )
          .fromTo(
            overlayTextRef.current?.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: EASINGS.smooth,
            },
            '-=0.6'
          )
          .fromTo(
            cardsRef.current?.children,
            { y: 30, opacity: 0, scale: 1 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: DURATIONS.cardStagger,
              ease: EASINGS.smooth,
            },
            '-=0.3'
          );

        gsap.to(gradientRef.current, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(40% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 30px',
              end: '+=20',
              scrub: 1,
              pin: true,
              markers: true
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="w-full px-4  pb-4 sm:px-6 lg:px-8"
      data-purpose="hero-visual"
    >
      <div className="relative h-svh overflow-hidden border">
        <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center px-6 pt-12 text-center">
          <p
            ref={taglineRef}
            className="mx-auto mb-6 max-w-70 text-sm leading-relaxed font-medium tracking-tight text-black uppercase"
          >
            AI analyzes site data and predicts environmental risk — <br />
            before a single tree comes down
          </p>
          <h1 className="px-2 text-7xl leading-tight font-extrabold tracking-tighter text-black">
            <span ref={headingSpanRef} className="block">
              See the impact before you break ground
            </span>
          </h1>
        </div>

        <div ref={imageWrapperRef} className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            alt="Environmental field background"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: 'inset(20% 0 0 0)' }}
            src="/dashboard_bg.jpg"
          />
        </div>
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20 opacity-0"
        />

        <div ref={overlayTextRef}>
          <div className="absolute top-1/2 left-12 max-w-30 -translate-y-1/2">
            <p className="text-xl leading-tight font-bold text-white">
              Drone + sensor fusion
            </p>
          </div>
          <div className="absolute top-1/2 right-12 max-w-35 -translate-y-1/2 text-right">
            <p className="text-xl leading-tight font-bold text-white">
              Risk flagged automatically
            </p>
          </div>
        </div>

        <div className="absolute right-0 bottom-8 left-0 flex justify-center px-4">
          <div ref={cardsRef} className="flex w-full max-w-lg flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase opacity-80">
                  Soil stability
                </p>
                <CounterDisplay
                  start={0}
                  end={87}
                  suffix="%"
                  containerRef={containerRef}
                />
                <p className="text-[8px] font-bold tracking-widest uppercase opacity-60">
                  Low Risk
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase opacity-80">
                  Tree canopy loss
                </p>
                <CounterDisplay
                  start={0}
                  end={12}
                  suffix="%"
                  containerRef={containerRef}
                />
                <p className="text-[8px] font-bold tracking-widest uppercase opacity-60">
                  Projected
                </p>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase opacity-80">
                  Water table
                </p>
                <span className="rounded-full border border-white/30 px-2 py-0.5 text-[8px] font-bold uppercase">
                  Flag
                </span>
              </div>
              <div className="text-2xl font-bold">
                Detected at{' '}
                <CounterDisplay
                  start={0}
                  end={3.2}
                  suffix=""
                  containerRef={containerRef}
                  decimals={1}
                />
                m
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CounterDisplay({
  start,
  end,
  suffix,
  containerRef,
  decimals = 0,
}: {
  start: number;
  end: number;
  suffix: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  decimals?: number;
}) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const obj = { value: start };
      gsap.to(obj, {
        value: end,
        duration: DURATIONS.counter,
        ease: EASINGS.smoothSlow,
        onUpdate: () =>
          setValue(
            decimals > 0
              ? parseFloat(obj.value.toFixed(decimals))
              : Math.round(obj.value)
          ),
        scrollTrigger: {
          trigger: containerRef.current,
          start: SCROLL_TRIGGER_DEFAULTS.start,
        },
      });
    },
    { scope: ref, dependencies: [end] }
  );

  return (
    <div ref={ref} className="mb-1 text-4xl font-bold">
      {value}
      {suffix}
    </div>
  );
}
