interface DropdownSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  note?: string;
}

export default function DropdownSelect({
  label,
  value,
  onChange,
  options,
  note,
}: DropdownSelectProps) {
  return (
    <div className="group mb-4">
      <label className="mb-2 block text-[10px] tracking-tighter text-foreground-muted uppercase">
        {label}
      </label>
      <div className="relative mb-2 flex items-center justify-between border border-border bg-surface-muted transition-colors group-hover:border-primary/50 focus-within:border-primary">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="z-10 block w-full cursor-pointer appearance-none bg-transparent px-3 py-3 text-sm font-medium text-foreground italic outline-none focus:text-primary"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-surface py-2 text-foreground not-italic"
            >
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-foreground-muted">
          ▼
        </div>
      </div>
      {note && (
        <p className="mt-1 border-l-2 border-border-strong py-0.5 pl-2 font-sans text-[9px] leading-snug text-foreground-muted sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
