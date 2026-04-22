export default function Header() {
  return (
    <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#333] pb-6 md:flex-row md:items-end">
      <div className="max-w-xl">
        <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
          Mining Method Advisor
        </p>
        <h1 className="font-serif text-4xl leading-none font-bold tracking-tight text-white italic md:text-6xl">
          Nicholas Selector<span className="text-[#D4AF37]">.</span>
        </h1>
      </div>
      <div className="text-left md:text-right">
        <p className="font-mono text-xs text-[#A3A3A3]">
          REF: DAVID E. NICHOLAS / OPTIMIZATION ENGINE
        </p>
        <p className="font-mono text-xs text-[#A3A3A3]">
          EST. 1981 / ROCK MECHANICS
        </p>
      </div>
    </header>
  );
}
