// Card.tsx
import { motion } from 'motion/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
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
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { label, value, suffix, status, size, decimals = 0, isFlag = false, prefixText, unit },
  ref
) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  return (
    <motion.div
      ref={localRef}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`rounded-xl border p-4 text-white backdrop-blur-md ${size}`}
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
              containerRef={localRef}
              decimals={decimals}
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
            containerRef={localRef}
            decimals={decimals}
          />
          <p className="text-[8px] font-bold tracking-widest uppercase opacity-60">
            {status}
          </p>
        </>
      )}
    </motion.div>
  );
});

export default Card;