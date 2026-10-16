import type { ReactNode } from 'react';
import Tooltip from './Tooltip';

interface FormFieldProps {
  label: string;
  note?: string;
  derivedLabel?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  note,
  derivedLabel,
  children,
}: FormFieldProps) {
  return (
    <div className="group mb-3 min-w-0">
      <div className="mb-1.5 flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <label className="block font-prompt text-[11px] font-semibold tracking-wider text-text-primary uppercase">
            {label}
          </label>
          {note && <Tooltip content={note} />}
        </div>
        {derivedLabel && (
          <span className="shrink-0 border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-text-primary uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
