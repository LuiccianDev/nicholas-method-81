import FormField from './FormField';

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
    <FormField label={label} note={note}>
      <div className="relative flex min-w-0 items-center justify-between border border-border bg-surface-muted transition-colors group-hover:border-primary/50 focus-within:border-primary">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="z-10 block w-full cursor-pointer appearance-none bg-transparent px-3 py-2.5 text-sm font-medium text-foreground italic outline-none focus:text-primary"
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
    </FormField>
  );
}
