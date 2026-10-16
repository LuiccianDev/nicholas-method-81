import { motion } from 'motion/react';
import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { CREATOR } from '../aboutContent';

export default function CreatorSection() {
  return (
    <section
      data-section="about-creator"
      aria-labelledby="about-creator-heading"
      className="overflow-hidden bg-background pt-24 pb-8"
    >
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        <Eyebrow label={CREATOR.label} code={CREATOR.sectionCode} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Reveal y={32}>
              <div className="relative flex aspect-square w-full max-w-80 flex-col items-center justify-center overflow-hidden rounded-sm bg-primary/10">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
                <img src="/Author_Page.jpeg" alt="William Guevara" />
                <span className="relative z-10 mt-4 font-mono text-[10px] tracking-widest text-text-primary/80 uppercase">
                  William Guevara
                </span>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 md:col-span-7">
            <Reveal delay={0.1}>
              <h2
                id="about-creator-heading"
                className="font-boldonse text-[clamp(2.5rem,6vw,3rem)] leading-[1.02] tracking-tight text-text-primary"
              >
                {CREATOR.headlineTop}
                <br />
                <span className="text-primary">{CREATOR.headlineAccent}</span>
                <br />
                {CREATOR.headlineBottom}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="max-w-xl font-prompt text-[13px] leading-relaxed text-text-primary/70">
                {CREATOR.bio}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">
                  Follow
                </span>
                <div className="flex flex-col gap-2">
                  {CREATOR.links.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-fit cursor-pointer text-[13px] transition-colors duration-300 hover:text-primary"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
