type EyebrowProps = {
  label: string;
  code: string;
  className?: string;
};

export default function Eyebrow({ label, code, className = '' }: EyebrowProps) {
  return (
    <div
      className={`mb-12 flex items-center gap-6 border-t border-text-primary/10 pt-6 font-mono text-[11px] font-medium tracking-widest uppercase ${className}`}
    >
      <span>{label}</span>
      <span className="ml-auto text-text-primary/40">{code}</span>
    </div>
  );
}
