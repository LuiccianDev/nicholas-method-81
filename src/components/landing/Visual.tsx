export default function VisualDashboard() {
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 pb-12" data-purpose="visual-container">
      <div className="w-full relative rounded-md overflow-hidden min-h-[600px] shadow-xl">
        <img 
          alt="Environmental field background" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="../../dashboard_bg.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
        
        <div className="absolute top-[40%] left-12 max-w-[120px]">
          <p className="text-white font-bold text-xl leading-tight">Drone + sensor fusion</p>
        </div>
        <div className="absolute top-[40%] right-12 text-right max-w-[140px]">
          <p className="text-white font-bold text-xl leading-tight">Risk flagged automatically</p>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 flex justify-center">
          <div className="w-full max-w-lg flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                <p className="text-[10px] uppercase font-semibold opacity-80 mb-4">Soil stability</p>
                <div className="text-4xl font-bold mb-1">87%</div>
                <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Low Risk</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                <p className="text-[10px] uppercase font-semibold opacity-80 mb-4">Tree canopy loss</p>
                <div className="text-4xl font-bold mb-1">12%</div>
                <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Projected</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] uppercase font-semibold opacity-80">Water table</p>
                <span className="text-[8px] font-bold uppercase px-2 py-0.5 border border-white/30 rounded-full">Flag</span>
              </div>
              <div className="text-2xl font-bold">Detected at 3.2m</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}