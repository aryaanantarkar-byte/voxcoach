import React from 'react';
import { IPauseEvent } from '../../types';

interface PauseChartProps {
  pauseEvents: IPauseEvent[];
  totalDurationSec: number;
}

export const PauseChart: React.FC<PauseChartProps> = ({ pauseEvents, totalDurationSec }) => {
  return (
    <div className="w-full space-y-4 font-sans p-4 bg-white border-2 border-black rounded-xl shadow-neo-sm">
      {/* Visual Speech Timeline Bar with mapped pause intervals */}
      <div className="relative w-full h-10 bg-[#F7F4EB] rounded-xl overflow-hidden border-2 border-black p-1 flex items-center shadow-neo-sm">
        {/* Baseline timeline */}
        <div className="w-full h-2 bg-zinc-300 rounded-full relative">
          {pauseEvents.map((pause, index) => {
            const leftPercent = Math.min(100, Math.max(0, (pause.startSec / totalDurationSec) * 100));
            const widthPercent = Math.min(100 - leftPercent, Math.max(2, (pause.durationSec / totalDurationSec) * 100));
            const isDeliberate = pause.type === 'deliberate';

            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 h-5 rounded border border-black cursor-pointer transition-transform hover:scale-125 ${
                  isDeliberate ? 'bg-[#69D2E7]' : 'bg-[#FFE600]'
                }`}
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
                title={`${pause.type.toUpperCase()}: ${pause.durationSec}s at ${Math.round(pause.startSec)}s`}
              />
            );
          })}
        </div>
      </div>

      {/* Legend & Events List */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-black font-mono font-bold gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#69D2E7] border border-black" /> Deliberate Rhetorical Pause (0.5s - 2.0s)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#FFE600] border border-black" /> Hesitation Silence (&gt;2.0s)
          </span>
        </div>
        <span>Total: {pauseEvents.length} pauses</span>
      </div>

      {/* Pause Breakdown Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {pauseEvents.map((event, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg border-2 border-black text-xs flex items-center justify-between font-mono font-bold text-black ${
              event.type === 'deliberate' ? 'bg-[#69D2E7]' : 'bg-[#FFE600]'
            }`}
          >
            <span>{Math.round(event.startSec)}s - {Math.round(event.endSec)}s</span>
            <span>{event.durationSec.toFixed(1)}s</span>
          </div>
        ))}
      </div>
    </div>
  );
};

