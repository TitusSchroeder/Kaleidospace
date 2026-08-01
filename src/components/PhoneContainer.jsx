import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export const PhoneContainer = ({ children }) => {
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);

  const currentTime = new Date().toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 select-none relative font-sans">
      
      {/* Top Device View Toggle Bar */}
      <div className="hidden sm:flex items-center gap-3 mb-4 z-50">
        <span className="text-xs font-mono font-bold text-slate-400">Layout-Modus:</span>
        <button
          onClick={() => setUseDeviceFrame(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            useDeviceFrame
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Handy-Rahmen</span>
        </button>

        <button
          onClick={() => setUseDeviceFrame(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !useDeviceFrame
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Volle Breite</span>
        </button>
      </div>

      {/* SMARTPHONE FRAME OR FLUID MOBILE VIEW */}
      {useDeviceFrame ? (
        <div className="relative w-full max-w-[420px] h-[100vh] sm:h-[840px] bg-white text-slate-900 sm:rounded-[48px] shadow-2xl border-0 sm:border-[12px] border-slate-800 overflow-hidden flex flex-col justify-between">
          
          {/* Phone Top Status Bar */}
          <div className="w-full bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between z-40 flex-shrink-0">
            <span className="text-xs font-mono font-bold tracking-tight">{currentTime}</span>

            {/* Dynamic Island / Notch Simulation */}
            <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-800" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Signal className="w-3 h-3 text-slate-300" />
              <Wifi className="w-3 h-3 text-slate-300" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Phone Display Content Window */}
          <div className="flex-1 overflow-y-auto bg-[#fafaf8] text-slate-900 relative">
            {children}
          </div>

          {/* Bottom Phone Home Indicator */}
          <div className="w-full bg-slate-900 py-2 flex items-center justify-center z-40 flex-shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>
      ) : (
        <div className="w-full max-w-md min-h-screen bg-[#fafaf8] text-slate-900 shadow-2xl relative">
          {children}
        </div>
      )}

    </div>
  );
};
