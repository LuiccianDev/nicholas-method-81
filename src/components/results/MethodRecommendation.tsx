import React from 'react';
import { ScoredMethod } from '../../types';

export default function MethodRecommendation({ bestMethod, absoluteBest }: { bestMethod?: ScoredMethod, absoluteBest?: ScoredMethod }) {
  const isSurfaceMoreViable = absoluteBest?.method === 'Open Pit' && absoluteBest.total > (bestMethod?.total || 0);

  return (
    <div className="relative bg-[#1a1a1a] p-8 border border-[#333] mb-8 flex flex-col border-t-2 border-t-[#D4AF37]">
      <div className="mb-auto">
        <p className="text-[48px] sm:text-[64px] md:text-[80px] font-serif italic leading-none text-[#D4AF37] break-words drop-shadow-sm">
          {bestMethod?.method || 'None.'}
        </p>
        <p className="text-xl md:text-3xl font-light tracking-tight text-[#A3A3A3] mt-2">Optimal Underground Method</p>
      </div>
      
      <div className="mt-8 space-y-4">
        <p className="text-sm text-[#bbb] leading-relaxed max-w-2xl">
          Based on the <span className="text-white italic underline">Geometry</span> and <span className="text-white italic underline">Rock Mechanics</span> supplied, Nicholas' numerical logic isolates this approach to maximize underground extraction viability.
        </p>

        {isSurfaceMoreViable && (
          <div className="p-4 border border-[#333] bg-[#141414] mt-4 flex items-start gap-4 max-w-2xl">
            <span className="text-[#A3A3A3] font-mono text-sm mt-0.5">↳</span>
            <p className="text-[11px] font-mono text-[#A3A3A3] leading-relaxed">
              <strong className="text-[#ddd]">SURFACE COMPARISON:</strong> Note that <span className="text-[#E5E5E5] italic">Open Pit</span> scored higher overall technical viability ({absoluteBest.total} pts). It is maintained in the selection matrix as a baseline for surface-transition comparisons.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          <div className="border-l-2 border-[#D4AF37] pl-4">
            <p className="text-[10px] uppercase text-[#A3A3A3]">Total Score</p>
            <p className="text-lg font-mono tracking-tighter text-white">{bestMethod?.total || 0}</p>
          </div>
          <div className="border-l-2 border-[#D4AF37] pl-4">
            <p className="text-[10px] uppercase text-[#A3A3A3]">Geo Component</p>
            <p className="text-lg font-mono tracking-tighter text-[#D4AF37] opacity-90">{bestMethod?.geometryScore || 0}</p>
          </div>
          <div className="border-l-2 border-[#B87333] pl-4 hidden sm:block">
            <p className="text-[10px] uppercase text-[#A3A3A3]">Rock Component</p>
            <p className="text-lg font-mono tracking-tighter text-[#B87333]">{bestMethod?.rockTotal || 0}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 hidden sm:flex">
        <div className="w-12 h-12 border border-[#D4AF37] rounded-full flex items-center justify-center text-xl text-[#D4AF37]/50">↘</div>
      </div>
    </div>
  );
}
