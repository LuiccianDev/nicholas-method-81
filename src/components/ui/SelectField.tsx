
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  note?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  note,
}: SelectFieldProps) {
  return (
    <div className="group mb-4">
      <label className="text-foreground-muted mb-2 block text-[10px] tracking-tighter uppercase">
        {label}
      </label>
      <div className="border-border bg-surface-muted group-hover:border-primary/50 focus-within:border-primary relative mb-2 flex items-center justify-between border transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-foreground focus:text-primary z-10 block w-full cursor-pointer appearance-none bg-transparent px-3 py-3 text-sm font-medium italic outline-none"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-surface text-foreground py-2 not-italic"
            >
              {o.label}
            </option>
          ))}
        </select>
        <div className="text-foreground-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs">
          ▼
        </div>
      </div>
      {note && (
        <p className="border-border-strong text-foreground-muted mt-1 border-l-2 py-0.5 pl-2 font-sans text-[9px] leading-snug sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
