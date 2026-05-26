interface NumericInputProps {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  placeholder?: string;
  note?: string;
  derivedLabel?: string;
  unit?: string;
}

export default function NumericInput({
  label,
  value,
  onChange,
  placeholder,
  note,
  derivedLabel,
  unit,
}: NumericInputProps) {
  return (
    <div className="group mb-3 min-w-0">
      <div className="mb-1.5 flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1">
          <label className="block text-[10px] tracking-tighter text-foreground-muted uppercase">
            {label}
          </label>
          {note && (
            <div className="group/tooltip relative inline-block min-w-0">
              <span className="cursor-help px-1 font-mono text-[10px] text-foreground-muted transition-colors select-none hover:text-primary">
                ⓘ
              </span>
              <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card p-3 font-sans text-[10px] leading-relaxed tracking-normal text-foreground-muted normal-case not-italic opacity-0 shadow-xl transition-opacity duration-200 group-hover/tooltip:opacity-100">
                {note}
              </div>
            </div>
          )}
        </div>
        {derivedLabel && (
          <span className="shrink-0 border border-primary/40 bg-surface-muted px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-primary uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      <div className="relative flex min-w-0 items-center justify-between border border-border bg-surface-muted transition-colors group-hover:border-primary/50 focus-within:border-primary">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="z-10 block w-full bg-transparent px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:text-primary"
        />
        {unit && (
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-foreground-muted">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
