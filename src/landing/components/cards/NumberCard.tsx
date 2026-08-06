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
      className={`rounded-sm border border-white/25 bg-white/10 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${size}`}
    >
      <p className="mb-3 pb-2 text-xl font-medium text-white/70">{eyebrow}</p>
      <CounterDisplay
        value={value}
        suffix={suffix}
        decimals={decimals}
        active={active}
        delay={delay}
      />
      <p className="mt-1 text-sm font-medium tracking-wide text-white/50">
        {status}
      </p>
    </div>
  );
}
