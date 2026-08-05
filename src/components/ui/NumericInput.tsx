import FormField from './FormField';

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
    <FormField label={label} note={note} derivedLabel={derivedLabel}>
      <div className="relative flex items-center justify-between border border-border">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="z-10 block px-3 py-2 font-mono text-sm outline-none"
        />
        {unit && (
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs">
            {unit}
          </div>
        )}
      </div>
    </FormField>
  );
}
