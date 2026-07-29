import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { EASINGS, DURATIONS, SCROLL_TRIGGER_DEFAULTS } from './animations';

gsap.registerPlugin(ScrollTrigger);

export default function VisualDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInnerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      entranceTl.fromTo(
        imageWrapperRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(60% 0 0 0)', duration: DURATIONS.imageReveal, ease: EASINGS.smoothSlowInOut },
      )
        .fromTo(
          imageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: DURATIONS.imageReveal, ease: EASINGS.smoothSlowInOut },
          0,
        )
        .fromTo(
          overlayTextRef.current?.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: EASINGS.smooth },
          '-=0.4',
        )
        .fromTo(
          cardsRef.current?.children,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: DURATIONS.cardStagger, ease: EASINGS.smooth },
          '-=0.2',
        );

      gsap.to(gradientRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo(imageWrapperRef.current, {
        clipPath: 'inset(100% 0 0 0)',
      }, {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '400px 500px',
          end: '+=800 20px',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="w-full px-4 sm:px-6 lg:px-8 pb-4"
      data-purpose="visual-container"
    >
      <div ref={containerInnerRef} className="w-full relative border overflow-hidden min-h-150 ">
        <div ref={imageWrapperRef} className="absolute inset-0 overflow-hidden" >
          <img
            ref={imageRef}
            alt="Environmental field background"
            className="absolute inset-0 w-full h-full object-cover "
            src="/dashboard_bg.jpg"
            
          />
        </div>
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20 opacity-0"
        />

        <div ref={overlayTextRef}>
          <div className="absolute top-[40%] left-12 max-w-30">
            <p className="text-white font-bold text-xl leading-tight">
              Drone + sensor fusion
            </p>
          </div>
          <div className="absolute top-[40%] right-12 text-right max-w-35">
            <p className="text-white font-bold text-xl leading-tight">
              Risk flagged automatically
            </p>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 flex justify-center">
          <div ref={cardsRef} className="w-full max-w-lg flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white"
              >
                <p className="text-[10px] uppercase font-semibold opacity-80 mb-4">Soil stability</p>
                <CounterDisplay start={0} end={87} suffix="%" containerRef={containerRef} />
                <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Low Risk</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white"
              >
                <p className="text-[10px] uppercase font-semibold opacity-80 mb-4">Tree canopy loss</p>
                <CounterDisplay start={0} end={12} suffix="%" containerRef={containerRef} />
                <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Projected</p>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] uppercase font-semibold opacity-80">Water table</p>
                <span className="text-[8px] font-bold uppercase px-2 py-0.5 border border-white/30 rounded-full">Flag</span>
              </div>
              <div className="text-2xl font-bold">
                Detected at <CounterDisplay start={0} end={3.2} suffix="" containerRef={containerRef} decimals={1} />m
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

  useGSAP(() => {
    const obj = { value: start };
    gsap.to(obj, {
      value: end,
      duration: DURATIONS.counter,
      ease: EASINGS.smoothSlow,
      onUpdate: () => setValue(decimals > 0 ? parseFloat(obj.value.toFixed(decimals)) : Math.round(obj.value)),
      scrollTrigger: {
        trigger: containerRef.current,
        start: SCROLL_TRIGGER_DEFAULTS.start,
      },
    });
  }, { scope: ref, dependencies: [end] });

  return (
    <div ref={ref} className="text-4xl font-bold mb-1">
      {value}{suffix}
    </div>
  );
}