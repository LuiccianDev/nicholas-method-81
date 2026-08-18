import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { WHY } from '../aboutContent';

export default function WhySection() {
  return (
    <section
      data-section="about-why"
      aria-labelledby="about-why-heading"
      className="overflow-hidden bg-background pt-24"
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
      </div>
    </section>
  );
}
