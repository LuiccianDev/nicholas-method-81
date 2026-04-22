
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
        <label className="text-foreground-muted block text-[10px] tracking-tighter uppercase">
          {label}
        </label>
        {derivedLabel && (
          <span className="border-primary/40 bg-surface-muted text-primary border px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      <div className="border-border bg-surface-muted group-hover:border-primary/50 focus-within:border-primary relative mb-2 flex items-center justify-between border transition-colors">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="text-foreground focus:text-primary z-10 block w-full bg-transparent px-3 py-3 font-mono text-sm outline-none"
        />
        {unit && (
          <div className="text-foreground-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs">
            {unit}
          </div>
        )}
      </div>
      {note && (
        <p className="border-border-strong text-foreground-muted mt-1 border-l-2 py-0.5 pl-2 font-sans text-[9px] leading-snug sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
