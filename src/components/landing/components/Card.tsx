// Card.tsx
import CounterDisplay from './CounterDisplay';

type CardProps = {
  label: string;
  value: number;
  suffix: string;
  status: string;
  size: string;
  decimals?: number;
  active?: boolean;
};

export default function Card({
  label,
  value,
  suffix,
  status,
  size,
  decimals = 0,
  active = false,
}: CardProps) {
  return (
    <div
      className={`rounded-sm border border-white/10 bg-black/20 p-5 text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${size}`}
    >
      <p className="mb-3 pb-2 text-xl font-medium text-white/70">{label}</p>
      <CounterDisplay
        start={0}
        end={value}
        suffix={suffix}
        decimals={decimals}
        active={active}
      />
      <p className="mt-1 text-sm font-medium tracking-wide text-white/50">
        {status}
      </p>
    </div>
  );
}
