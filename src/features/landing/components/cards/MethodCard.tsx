import type { MethodCard as MethodCardData } from '../../content';

// ─── Placeholder images (rotated until real method assets arrive) ─────────────
const PUBLIC_IMAGES = [
  '/Underground_Portada.jpeg',
  '/Underground.jpeg',
  '/Underground_Potada_2.jpeg',
];
const getImg = (i: number) => PUBLIC_IMAGES[i % PUBLIC_IMAGES.length];

type MethodCardProps = {
  method: MethodCardData;
  index: number;
};

export default function MethodCard({ method, index }: MethodCardProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className="method-card group flex w-56 shrink-0 flex-col gap-0 md:w-68"
      aria-label={`Mining method: ${method.name}`}
    >
      {/* Image — compact, 3/4 aspect */}
      <div className="relative overflow-hidden rounded-xl bg-text-primary">
        <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
          <img
            src={getImg(index)}
            alt={`${method.name} mining method`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* gradient */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

          {/* index badge */}
          <span className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-widest text-white/60 uppercase">
            {num}
          </span>

          {/* method code overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <span className="font-boldonse text-[11px] leading-tight tracking-widest text-white/85 uppercase">
              {method.code}
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 px-0.5 pt-2.5 pb-1">
        <h3 className="font-boldonse text-[14px] leading-snug tracking-tight text-text-primary">
          {method.name}
        </h3>
        <p className="font-prompt text-[12px] leading-relaxed text-text-primary/50">
          {method.descriptor}
        </p>
      </div>
    </article>
  );
}
