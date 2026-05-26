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
    <div className="group mb-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <label className="block text-[10px] tracking-tighter text-foreground-muted uppercase">
            {label}
          </label>
          {note && (
            <div className="relative group/tooltip inline-block">
              <span className="cursor-help text-foreground-muted hover:text-primary transition-colors text-[10px] font-mono px-1 select-none">
                ⓘ
              </span>
              <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-72 bg-card border border-border p-3 text-[10px] leading-relaxed text-foreground-muted shadow-xl rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50 normal-case tracking-normal not-italic font-sans">
                {note}
              </div>
            </div>
          )}
        </div>
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
    </div>
  );
}
