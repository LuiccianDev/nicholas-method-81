import { motion } from 'motion/react';
import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { TECH_STACK } from '../aboutContent';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const groupVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

export default function TechStackSection() {
  return (
    <section
      data-section="about-tech"
      aria-labelledby="about-tech-heading"
      className="overflow-hidden bg-background pt-24"
    >
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        <Eyebrow label={TECH_STACK.label} code={TECH_STACK.sectionCode} />

        <Reveal>
          <h2
            id="about-tech-heading"
            className="font-boldonse text-[clamp(2.8rem,7vw,3rem)] leading-[0.92] tracking-tight text-text-primary"
          >
            {TECH_STACK.headlineTop}
            <br />
            <span className="text-primary">{TECH_STACK.headlineAccent}</span>
            <br />
            {TECH_STACK.headlineBottom}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK.groups.map((group) => (
            <motion.div
              key={group.name}
              className="flex flex-col gap-4"
              variants={groupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            >
              <span className="font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">
                {group.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={chipVariants}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="cursor-default rounded-sm border border-text-primary/15 px-3 py-1.5 font-mono text-[10px] tracking-widest text-text-primary/70 uppercase transition-colors duration-300 hover:border-primary/70 hover:bg-primary"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
