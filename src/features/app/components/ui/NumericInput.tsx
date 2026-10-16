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
  const handleDecrement = () => {
    const current = typeof value === 'number' ? value : 0;
    onChange(Math.max(0, current - 1));
  };

  const handleIncrement = () => {
    const current = typeof value === 'number' ? value : 0;
    onChange(current + 1);
  };

  return (
    <FormField label={label} note={note} derivedLabel={derivedLabel}>
      <div className="relative flex h-8 w-full items-center justify-between rounded-none border border-border/70 bg-background transition-colors focus-within:border-primary">
        <button
          type="button"
          onClick={handleDecrement}
          className="flex h-full w-8 items-center justify-center border-r border-border/40 font-mono text-sm font-bold text-text-primary/70 transition-colors hover:bg-primary/10 hover:text-text-primary active:scale-95"
          aria-label="Decrement value"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="w-full bg-transparent py-1 text-center font-mono text-[13px] font-semibold text-text-primary outline-none"
        />
        {unit && (
          <span className="pointer-events-none pr-1.5 font-mono text-[10px] text-text-primary/50 uppercase">
            {unit}
          </span>
        )}
        <button
          type="button"
          onClick={handleIncrement}
          className="flex h-full w-8 items-center justify-center border-l border-border/40 font-mono text-sm font-bold text-text-primary/70 transition-colors hover:bg-primary/10 hover:text-text-primary active:scale-95"
          aria-label="Increment value"
        >
          +
        </button>
      </div>
    </FormField>
  );
}
