// Card.tsx
import CounterDisplay from './CounterDisplay';

type CardProps = {
  label: string;
  value: number;
  suffix: string;
  status: string;
  size: string;
  decimals?: number;
  isFlag?: boolean;
  prefixText?: string;
  unit?: string;
  active?: boolean;
};

export default function Card({
  label,
  value,
  suffix,
  status,
  size,
  decimals = 0,
  isFlag = false,
  prefixText,
  unit,
  active = false,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-black/20 p-5 text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${size}`}
    >
      {isFlag ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-medium text-white/70">{label}</p>
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-semibold uppercase text-white/80">
              {status}
            </span>
          </div>
          <div className="text-2xl font-semibold">
            {prefixText}{' '}
            <CounterDisplay
              start={0}
              end={value}
              suffix={suffix}
              decimals={decimals}
              active={active}
            />
            {unit}
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 text-xs font-medium text-white/70">{label}</p>
          <CounterDisplay
            start={0}
            end={value}
            suffix={suffix}
            decimals={decimals}
            active={active}
          />
          <p className="mt-1 text-[10px] font-medium tracking-wide text-white/50">
            {status}
          </p>
        </>
      )}
    </div>
  );
}