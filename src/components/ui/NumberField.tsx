import React from 'react';

interface NumberFieldProps {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  placeholder?: string;
  note?: string;
  derivedLabel?: string;
  unit?: string;
}

export default function NumberField({ label, value, onChange, placeholder, note, derivedLabel, unit }: NumberFieldProps) {
  return (
    <div className="group mb-4">
      <div className="flex justify-between items-baseline mb-2">
        <label className="block text-[10px] uppercase text-[#A3A3A3] tracking-tighter">{label}</label>
        {derivedLabel && (
          <span className="text-[9px] uppercase font-mono tracking-[0.1em] bg-[#1a1a1a] border border-[#D4AF37]/40 text-[#D4AF37] px-1.5 py-0.5">
            {derivedLabel}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center bg-[#1a1a1a] border border-[#333] group-hover:border-[#D4AF37]/50 transition-colors relative mb-2 focus-within:border-[#D4AF37]">
        <input 
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="block w-full bg-transparent text-sm font-mono text-[#E5E5E5] px-3 py-3 outline-none z-10 focus:text-[#D4AF37]"
        />
        {unit && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3A3A3] text-xs font-mono">{unit}</div>}
      </div>
      {note && (
        <p className="text-[9px] sm:text-[10px] text-[#A3A3A3] font-sans leading-snug border-l-2 border-[#333] pl-2 mt-1 py-0.5">
          {note}
        </p>
      )}
    </div>
  );
}
