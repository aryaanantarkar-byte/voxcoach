import React from 'react';
import { IPauseEvent } from '../../types';

interface PauseChartProps {
  pauseEvents: IPauseEvent[];
  totalDurationSec: number;
}

export const PauseChart: React.FC<PauseChartProps> = ({ pauseEvents, totalDurationSec }) => {
  return (
    <div className="w-full space-y-4 font-sans">
      {/* Visual Speech Timeline Bar with mapped pause intervals */}
      <div className="relative w-full h-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 p-1 flex items-center">
        {/* Baseline timeline */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full relative">
          {pauseEvents.map((pause, index) => {
            const leftPercent = Math.min(100, Math.max(0, (pause.startSec / totalDurationSec) * 100));
            const widthPercent = Math.min(100 - leftPercent, Math.max(1.5, (pause.durationSec / totalDurationSec) * 100));
            const isDeliberate = pause.type === 'deliberate';

            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 h-4 rounded cursor-pointer transition-transform hover:scale-125 ${
                  isDeliberate ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-amber-500 shadow-sm shadow-amber-500/50'
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
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Deliberate Rhetorical Pause (0.5s - 2.0s)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Hesitation Silence (&gt;2.0s)
          </span>
        </div>
        <span>Total: {pauseEvents.length} pauses</span>
      </div>

      {/* Pause Breakdown Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {pauseEvents.map((event, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg border text-xs flex items-center justify-between font-mono ${
              event.type === 'deliberate'
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-800/40 text-amber-300'
            }`}
          >
            <span>{Math.round(event.startSec)}s - {Math.round(event.endSec)}s</span>
            <span className="font-semibold">{event.durationSec.toFixed(1)}s</span>
          </div>
        ))}
      </div>
    </div>
  );
};
