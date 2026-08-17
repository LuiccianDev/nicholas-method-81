import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { METHODS_DATA, type MethodCard } from './landingContent';

// Unsplash images mapped to each mining method (used until real assets arrive)
const METHOD_IMAGES: Record<string, string> = {
  'Open Pit':
    'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=600&q=80',
  'Block Caving':
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'Sublevel Stoping':
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
  'Sublevel Caving':
    'https://images.unsplash.com/photo-1590593162201-f67611a18b87?w=600&q=80',
  Longwall:
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
  'Room & Pillar':
    'https://images.unsplash.com/photo-1565793979748-85b2ef7e3636?w=600&q=80',
  'Shrinkage Stoping':
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
  'Cut & Fill':
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  'Top Slicing':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
  'Square Set':
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
};

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

type MethodsGridProps = {
  methods?: MethodCard[];
};

function MethodCard({ method, index }: { method: MethodCard; index: number }) {
  const imgSrc = METHOD_IMAGES[method.name] ?? method.image;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={cardVariants}
      className="group flex flex-col gap-0"
      aria-label={`Mining method: ${method.name}`}
    >
      {/* Image block */}
      <div className="relative overflow-hidden rounded-xl bg-text-primary/5">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '3/4' }}
        >
          <img
            src={imgSrc}
            alt={`${method.name} mining method`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

          {/* Index badge — top left */}
          <span className="absolute top-3 left-3 font-mono text-[11px] font-bold tracking-widest text-white/70 uppercase">
            {num}
          </span>

          {/* Method code — bottom overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <span className="font-boldonse text-[13px] leading-tight tracking-wide text-white/90 uppercase">
              {method.code}
            </span>
          </div>
        </div>
      </div>

      {/* Text block */}
      <div className="flex flex-col gap-0.5 px-0.5 pt-3 pb-1">
        <h3 className="font-boldonse text-[16px] leading-snug tracking-tight text-text-primary">
          {method.name}
        </h3>
        <p className="font-prompt text-[12px] leading-relaxed text-text-primary/55">
          {method.descriptor}
        </p>
      </div>
    </motion.article>
  );
}

export default function MethodsGrid({
  methods = METHODS_DATA,
}: MethodsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headInView = useInView(headRef, {
    once: true,
    margin: '0px 0px -80px 0px',
  });
  const gridInView = useInView(gridRef, {
    once: true,
    margin: '0px 0px -60px 0px',
  });

  return (
    <section
      id="methods-mining"
      ref={sectionRef}
      aria-labelledby="methods-grid-heading"
      data-section="methods-grid"
      className="overflow-hidden bg-background py-24"
    >
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        {/* Top rule + label */}
        <div className="mb-12 flex items-center gap-6 border-t border-text-primary/10 pt-6 font-mono text-[11px] font-medium tracking-widest uppercase">
          <span>Methods evaluated</span>
          <span className="ml-auto text-text-primary/40">NM-03</span>
        </div>

        {/* Headline block */}
        <motion.div
          ref={headRef}
          variants={headlineVariants}
          initial="hidden"
          animate={headInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
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
        </motion.div>

        {/* Methods grid — 2 cols mobile, 5 cols desktop */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {methods.map((method, index) => (
            <MethodCard key={method.name} method={method} index={index} />
          ))}
        </motion.div>

        {/* Bottom rule */}
        <div className="mt-16 flex items-center justify-between border-t border-text-primary/10 pt-6 font-mono text-[11px] tracking-widest text-text-primary/40 uppercase">
          <span>Nicholas 1981</span>
          <span>10 / 10</span>
        </div>
      </div>
    </section>
  );
}
