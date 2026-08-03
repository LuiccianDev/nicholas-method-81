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
      className={`rounded-xl border p-4 text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${size}`}
    >
      {isFlag ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase opacity-80">
              {label}
            </p>
            <span className="rounded-full border border-white/30 px-2 py-0.5 text-[8px] font-bold uppercase">
              {status}
            </span>
          </div>
          <div className="text-2xl font-bold">
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
          <p className="mb-4 text-[10px] font-semibold uppercase opacity-80">
            {label}
          </p>
          <CounterDisplay
            start={0}
            end={value}
            suffix={suffix}
            decimals={decimals}
            active={active}
          />
          <p className="text-[8px] font-bold tracking-widest uppercase opacity-60">
            {status}
          </p>
        </>
      )}
    </div>
  );
}
