

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  note?: string;
}

export default function SelectField({ label, value, onChange, options, note }: SelectFieldProps) {
  return (
    <div className="group mb-4">
      <label className="block text-[10px] uppercase text-[#A3A3A3] mb-2 tracking-tighter">{label}</label>
      <div className="flex justify-between items-center bg-[#1a1a1a] border border-[#333] group-hover:border-[#D4AF37]/50 transition-colors relative mb-2 focus-within:border-[#D4AF37]">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full bg-transparent text-sm font-medium italic text-[#E5E5E5] px-3 py-3 outline-none appearance-none cursor-pointer z-10 focus:text-[#D4AF37]"
        >
          {options.map(o => (
            <option key={o.value} value={o.value} className="bg-[#121212] text-white not-italic py-2">{o.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3A3A3] text-xs">▼</div>
      </div>
      {note && (
        <p className="text-[9px] sm:text-[10px] text-[#A3A3A3] font-sans leading-snug border-l-2 border-[#333] pl-2 mt-1 py-0.5">
          {note}
        </p>
      )}
    </div>
  );
}
