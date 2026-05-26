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
      <div className="mb-2 flex items-center gap-1">
        <label className="block text-[10px] tracking-tighter text-foreground-muted uppercase">
          {label}
        </label>
        {note && (
          <div className="group/tooltip relative inline-block">
            <span className="cursor-help px-1 font-mono text-[10px] text-foreground-muted transition-colors select-none hover:text-primary">
              ⓘ
            </span>
            <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-72 rounded-lg border border-border bg-card p-3 font-sans text-[10px] leading-relaxed tracking-normal text-foreground-muted normal-case not-italic opacity-0 shadow-xl transition-opacity duration-200 group-hover/tooltip:opacity-100">
              {note}
            </div>
          </div>
        )}
      </div>
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
    </div>
  );
}
