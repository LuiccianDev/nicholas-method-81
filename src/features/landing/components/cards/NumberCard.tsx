// NumberCard.tsx
import CounterDisplay from '../CounterDisplay';

type NumberCardProps = {
  eyebrow: string;
  value: number;
  suffix: string;
  status: string;
  size: string;
  decimals?: number;
  active?: boolean;
  delay?: number;
};

export default function NumberCard({
  eyebrow,
  value,
  suffix,
  status,
  size,
  decimals = 0,
  active = false,
  delay = 0,
}: NumberCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/20 bg-black/10 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] md:p-5 ${size}`}
    >
      <p className="mb-2 text-base font-medium text-white/70 md:text-lg">
        {eyebrow}
      </p>
      <CounterDisplay
        value={value}
        suffix={suffix}
        decimals={decimals}
        active={active}
        delay={delay}
      />
      <p className="mt-1 text-xs font-medium tracking-wide text-white/50 md:text-sm">
        {status}
      </p>
    </div>
  );
}
