

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#333] pb-6 mb-8 gap-4">
      <div className="max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-2 font-mono">Mining Method Advisor</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none italic font-serif text-white">
          Nicholas Selector<span className="text-[#D4AF37]">.</span>
        </h1>
      </div>
      <div className="text-left md:text-right">
        <p className="text-xs font-mono text-[#A3A3A3]">REF: DAVID E. NICHOLAS / OPTIMIZATION ENGINE</p>
        <p className="text-xs font-mono text-[#A3A3A3]">EST. 1981 / ROCK MECHANICS</p>
      </div>
    </header>
  );
}
