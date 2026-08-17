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
      className={`flex flex-col justify-between gap-3 rounded-xl border border-white/20 bg-black/10 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] md:p-6 ${size}`}
    >
      <p className="text-center text-base font-medium md:text-lg">{eyebrow}</p>
      <CounterDisplay
        value={value}
        suffix={suffix}
        decimals={decimals}
        active={active}
        delay={delay}
      />
      <p className="text-center text-xs font-medium">{status}</p>
    </div>
  );
}
