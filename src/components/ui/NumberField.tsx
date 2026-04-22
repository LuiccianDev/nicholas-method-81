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
        <label className="block text-[10px] tracking-tighter text-[#A3A3A3] uppercase">
          {label}
        </label>
        {derivedLabel && (
          <span className="border border-[#D4AF37]/40 bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-[#D4AF37] uppercase">
            {derivedLabel}
          </span>
        )}
      </div>
      <div className="relative mb-2 flex items-center justify-between border border-[#333] bg-[#1a1a1a] transition-colors group-hover:border-[#D4AF37]/50 focus-within:border-[#D4AF37]">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="z-10 block w-full bg-transparent px-3 py-3 font-mono text-sm text-[#E5E5E5] outline-none focus:text-[#D4AF37]"
        />
        {unit && (
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-[#A3A3A3]">
            {unit}
          </div>
        )}
      </div>
      {note && (
        <p className="mt-1 border-l-2 border-[#333] py-0.5 pl-2 font-sans text-[9px] leading-snug text-[#A3A3A3] sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
