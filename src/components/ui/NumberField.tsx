interface NumberFieldProps {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  placeholder?: string;
  note?: string;
  derivedLabel?: string;
  unit?: string;
}

export default function NumberField({
  label,
  value,
  onChange,
  placeholder,
  note,
  derivedLabel,
  unit,
}: NumberFieldProps) {
  return (
    <div className="group mb-4">
      <div className="mb-2 flex items-baseline justify-between">
        <label className="block text-[10px] tracking-tighter text-foreground-muted uppercase">
          {label}
        </label>
        {derivedLabel && (
          <span className="border border-primary/40 bg-surface-muted px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-primary uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      <div className="relative mb-2 flex items-center justify-between border border-border bg-surface-muted transition-colors group-hover:border-primary/50 focus-within:border-primary">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="z-10 block w-full bg-transparent px-3 py-3 font-mono text-sm text-foreground outline-none focus:text-primary"
        />
        {unit && (
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-foreground-muted">
            {unit}
          </div>
        )}
      </div>
      {note && (
        <p className="mt-1 border-l-2 border-border-strong py-0.5 pl-2 font-sans text-[9px] leading-snug text-foreground-muted sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
