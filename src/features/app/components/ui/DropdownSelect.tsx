import FormField from './FormField';

interface DropdownSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  note?: string;
  derivedLabel?: string;
}

export default function DropdownSelect({
  label,
  value,
  onChange,
  options,
  note,
  derivedLabel,
}: DropdownSelectProps) {
  return (
    <FormField label={label} note={note} derivedLabel={derivedLabel}>
      <div className="relative flex h-8 w-full items-center justify-between rounded-none border border-border/70 bg-background transition-colors focus-within:border-primary">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="z-20 block h-full w-full cursor-pointer appearance-none bg-transparent px-3 py-1 font-mono text-[12px] font-semibold text-text-primary outline-none"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-background py-1.5 text-text-primary"
            >
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 font-mono text-[9px] text-text-primary/50">
          ▼
        </span>
      </div>
    </FormField>
  );
}
