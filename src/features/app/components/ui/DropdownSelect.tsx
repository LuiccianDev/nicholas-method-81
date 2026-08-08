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
      <div className="relative flex w-full items-center justify-between rounded-lg border border-border">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="z-20 block w-full cursor-pointer appearance-none bg-background px-3 py-2 text-sm outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="py-2">
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </FormField>
  );
}
