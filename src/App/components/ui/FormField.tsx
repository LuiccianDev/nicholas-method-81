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
        <div className="flex min-w-0 items-center gap-1">
          <label className="block text-xxs tracking-tighter text-foreground-muted uppercase">
            {label}
          </label>
          {note && <Tooltip content={note} />}
        </div>
        {derivedLabel && (
          <span className="shrink-0 border border-primary/40 bg-surface-muted px-1.5 py-0.5 font-mono text-xxxs tracking-widest text-primary uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
