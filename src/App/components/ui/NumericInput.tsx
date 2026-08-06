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
      <div className="relative flex w-full items-center justify-between rounded-lg border border-border">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="w-full py-2 pr-10 pl-3 font-mono text-sm outline-none"
        />
        {unit && (
          <div className="pointer-events-none absolute top-1/2 right-3 ml-2 -translate-y-1/2 font-mono text-[20px]">
            {unit}
          </div>
        )}
      </div>
    </FormField>
  );
}
