import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { WHY } from '../aboutContent';

export default function WhySection() {
  return (
    <section
      data-section="about-why"
      aria-labelledby="about-why-heading"
      className="overflow-hidden bg-background pt-5"
    >
      <div className="mx-auto w-full max-w-425 px-4 md:px-8">
        <Eyebrow label={WHY.label} code={WHY.sectionCode} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2
                id="about-why-heading"
                className="font-boldonse text-[clamp(2.8rem,7vw,3.5rem)] leading-[0.92] tracking-tight text-text-primary"
              >
                {WHY.headlineTop}
                <br />
                <span className="text-primary">{WHY.headlineAccent}</span>
                <br />
                {WHY.headlineBottom}
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end gap-6 md:col-span-5">
            {WHY.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.05 * i}>
                <p className="font-prompt text-sm leading-relaxed text-text-primary/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal y={48} className="mt-16">
          <figure className="overflow-hidden rounded-sm">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src="/Underground_Portada.jpeg"
                alt="Underground mining deposit used as a visual reference for the Nicholas Method 81"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
            <figcaption className="flex items-center justify-between border-t border-text-primary/10 bg-background px-4 py-3 font-mono text-[10px] tracking-widest text-text-primary/50 uppercase">
              <span>NM-01 · deposit model</span>
              <span>Underground · Nicholas 81</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
