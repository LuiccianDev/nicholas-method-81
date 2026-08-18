import Eyebrow from '../components/Eyebrow';
import Reveal from '../components/Reveal';
import { OVERVIEW_STATS } from '../content';

export default function Overview() {
  return (
    <section
      aria-labelledby="method-overview-heading"
      data-section="method-overview"
      className="overflow-hidden bg-background pt-10"
    >
      <div className="mx-auto w-full max-w-425 px-4 py-4 md:px-8 md:py-6">
        <Eyebrow
          label="Designed for systematic selection"
          code="NM-81"
          className="justify-center"
        />

        {/* Main layout — asymmetric grid */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left — headline + meta (col 1-6) */}
          <div className="relative z-10 flex flex-col justify-between gap-y-10 md:col-span-6">
            <Reveal y={40} delay={0.15}>
              <h2
                id="method-overview-heading"
                className="text-center font-boldonse text-[clamp(2.5rem,5vw,4rem)] leading-[1.2] tracking-tight"
              >
                Nicholas
                <br />
                <span className="text-primary">1981</span>
                <br />
                Underground
                <br />
                Mining
              </h2>
            </Reveal>

            <Reveal y={20} duration={0.6} delay={0.3} className="mt-16">
              <div className="text-center">
                <p className="mx-auto max-w-sm text-sm leading-relaxed">
                  Published in 1981, the Nicholas methodology evaluates ten
                  mining methods using geometric and geomechanical inputs —
                  delivering a ranked, quantitative recommendation in seconds.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="font-mono text-[15px] font-bold tracking-[0.15em] uppercase italic">
                    Method Selection
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — image floating (col 7-12) */}
          <div className="relative z-10 md:col-span-6">
            <Reveal
              y={30}
              scale={0.95}
              duration={0.8}
              delay={0.1}
              className="relative ml-auto w-full overflow-hidden rounded-2xl"
            >
              <div style={{ aspectRatio: '16/9' }}>
                <img
                  src="/Underground_Portada.jpeg"
                  alt="Nicholas Method dashboard overview"
                  className="h-full w-full"
                />
                {/* Subtle overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom — counter row */}
        <div className="mt-16 flex items-center justify-center gap-12 border-t border-black/20 pt-8 font-mono">
          {OVERVIEW_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
