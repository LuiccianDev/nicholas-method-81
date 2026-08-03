import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { motion } from 'motion/react';
import CounterDisplay from './CounterDisplay';

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);




  return (
    <div ref={containerRef} className="relative h-[600px] w-full">
      <motion.div
        ref={overlayTextRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
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
      </motion.div>

      <motion.div
        className="absolute right-0 bottom-40 left-0 flex justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
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
      </motion.div>
    </div>
  );
}
