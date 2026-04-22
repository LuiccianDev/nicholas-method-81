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
      <label className="mb-2 block text-[10px] tracking-tighter text-[#A3A3A3] uppercase">
        {label}
      </label>
      <div className="relative mb-2 flex items-center justify-between border border-[#333] bg-[#1a1a1a] transition-colors group-hover:border-[#D4AF37]/50 focus-within:border-[#D4AF37]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="z-10 block w-full cursor-pointer appearance-none bg-transparent px-3 py-3 text-sm font-medium text-[#E5E5E5] italic outline-none focus:text-[#D4AF37]"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-[#121212] py-2 text-white not-italic"
            >
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#A3A3A3]">
          ▼
        </div>
      </div>
      {note && (
        <p className="mt-1 border-l-2 border-[#333] py-0.5 pl-2 font-sans text-[9px] leading-snug text-[#A3A3A3] sm:text-[10px]">
          {note}
        </p>
      )}
    </div>
  );
}
