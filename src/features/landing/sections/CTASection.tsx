import { motion, useReducedMotion } from 'motion/react';
import { CTA_HEADLINE } from './landingContent';

export default function CTASection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-section-heading"
      data-section="cta-section"
      className="overflow-hidden bg-white py-24"
    >
      <div className="px-10">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-6 font-sans text-[20px] font-medium tracking-wide italic">
          <span className="uppercase">Get started</span>
          <span className="uppercase">NM-05</span>
        </div>

        {/* Ghost text */}
        <div className="relative">
          <motion.div
            className="relative z-10"
            initial={{
              opacity: prefersReduced ? 1 : 0,
              y: prefersReduced ? 0 : 30,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              id="cta-section-heading"
              className="mb-12 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-black tracking-tight"
            >
              {CTA_HEADLINE}
            </h2>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {/* Primary CTA */}
              <a
                href="/calculator"
                className="rounded-sm bg-black px-6 py-3 font-sans text-sm font-black tracking-[0.15em] text-white uppercase hover:bg-tertiary"
              >
                Use the Calculator
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
