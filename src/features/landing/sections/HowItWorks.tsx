import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { STEPS_DATA } from './landingContent';

// ─── Animation variants ───────────────────────────────────────────────────────
const fromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const fromTop = {
  hidden: { opacity: 0, y: -48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};
const fromRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};
const fromBottom = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CARD_VARIANTS = [fromLeft, fromTop, fromRight];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -100px 0px',
  });

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      data-section="how-it-works"
      className="overflow-hidden bg-background py-5"
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-425 px-4 md:px-8">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={fromBottom}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-16 flex items-center gap-6 border-t border-black/10 pt-6 font-mono text-[11px] font-medium tracking-widest uppercase">
            <span>Process</span>
            <span className="ml-auto text-black/40">NM-02</span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="how-it-works-heading"
              className="font-boldonse text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-tight text-text-primary"
            >
              How It
              <br />
              <span className="text-primary">Works</span>
            </h2>
            <p className="max-w-xs font-prompt text-[13px] leading-relaxed text-black/50 md:text-right">
              Three steps from raw deposit data to a ranked, AI-validated mining
              method selection.
            </p>
          </div>
        </motion.div>

        {/* ── Desktop: asymmetric floating layout ────────────────────────── */}
        <div className="relative mt-16 hidden min-h-90 md:block">
          {/* Step 1 — left, lower */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="absolute top-40 left-0 w-[30%]"
          >
            <StepCard step={STEPS_DATA[0]} />
          </motion.div>

          {/* Step 2 — center, higher */}
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="absolute top-0 left-1/2 w-[30%] -translate-x-1/2"
          >
            <StepCard step={STEPS_DATA[1]} />
          </motion.div>

          {/* Step 3 — right, lower */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="absolute top-50 right-0 w-[30%]"
          >
            <StepCard step={STEPS_DATA[2]} />
          </motion.div>
        </div>

        {/* ── Mobile: stacked list ─────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-10 md:hidden">
          {STEPS_DATA.map((step, i) => (
            <motion.div
              key={step.number}
              variants={CARD_VARIANTS[i]}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <StepCard step={step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({ step }: { step: (typeof STEPS_DATA)[number] }) {
  return (
    <div className="relative flex flex-col gap-3 pt-6">
      {/* Ghost number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-0 font-boldonse text-[6rem] leading-none font-black tracking-tighter text-black/5 select-none"
      >
        *{step.number}
      </span>

      <div className="w-8 border-t-2 border-black/30" />

      <span className="font-mono text-[10px] tracking-widest text-black/35 uppercase">
        Step {String(step.number).padStart(2, '0')}
      </span>

      <h3 className="font-boldonse text-[1.05rem] leading-snug tracking-tight text-text-primary">
        {step.headline}
      </h3>

      <p className="font-prompt text-[12px] leading-relaxed text-black/55">
        {step.body}
      </p>
    </div>
  );
}
