import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { FEATURES } from '../aboutContent';

export default function FeaturesSection() {
  return (
    <section
      data-section="about-features"
      aria-labelledby="about-features-heading"
      className="overflow-hidden bg-background pt-24"
    >
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        <Eyebrow label={FEATURES.label} code={FEATURES.sectionCode} />

        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="about-features-heading"
              className="font-boldonse text-[clamp(2.8rem,7vw,3rem)] leading-[0.92] tracking-tight text-text-primary"
            >
              {FEATURES.headlineTop}
              <br />
              <span className="text-primary">{FEATURES.headlineAccent}</span>
              <br />
              {FEATURES.headlineBottom}
            </h2>
            <p className="max-w-xs font-prompt text-[13px] leading-relaxed text-black/50 md:text-right">
              {FEATURES.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.items.map((item, i) => (
            <Reveal key={item.number} delay={0.05 * i}>
              <div className="relative flex h-full flex-col gap-3 border-t border-text-primary/15 pt-6">
                <span className="font-mono text-[10px] tracking-widest text-text-primary/40 uppercase">
                  Step {String(item.number).padStart(2, '0')}
                </span>
                <h3 className="font-boldonse text-[1.25rem] leading-snug tracking-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="font-prompt text-[12px] leading-relaxed text-text-primary/60">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
