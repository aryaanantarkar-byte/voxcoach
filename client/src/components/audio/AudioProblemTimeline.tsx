import React from 'react';
import { IPitchIssue, IPauseEvent } from '../../types';
import { Volume2, ArrowUpRight } from 'lucide-react';

interface AudioProblemTimelineProps {
  durationSec: number;
  pitchIssues: IPitchIssue[];
  pauseEvents: IPauseEvent[];
  fastSections: Array<{ startSec: number; endSec: number; wpm: number }>;
  fillerCount: number;
  onSeekToTime?: (timeSec: number) => void;
}

export const AudioProblemTimeline: React.FC<AudioProblemTimelineProps> = ({
  durationSec,
  pitchIssues,
  pauseEvents,
  fastSections,
  fillerCount,
  onSeekToTime,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeekToTime || durationSec <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = Math.min(1, Math.max(0, clickX / rect.width));
    onSeekToTime(percent * durationSec);
  };

  return (
    <div className="w-full bg-white border-2 border-black rounded-2xl p-6 shadow-neo space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 block">Empirical Detection Timeline</span>
          <h3 className="text-base font-black text-black">Visual Delivery & Audio Problem Map</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono font-bold text-black flex-wrap">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#69D2E7] border border-black" /> Uneven Pitch ({pitchIssues.length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#4ECCD3] border border-black" /> Pace Rush ({fastSections.length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FFE600] border border-black" /> Hesitation ({pauseEvents.filter(p => p.type === 'hesitation').length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FF6B6B] border border-black" /> Fillers ({fillerCount})</span>
        </div>
      </div>

      {/* Visual Timeline Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-600 px-1">
          <span>00:00</span>
          <span>{formatTime(durationSec / 2)}</span>
          <span>{formatTime(durationSec)}</span>
        </div>

        <div
          onClick={handleTimelineClick}
          className="relative w-full h-12 bg-[#F7F4EB] border-2 border-black rounded-xl cursor-pointer overflow-hidden shadow-neo-sm p-1 flex items-center group"
          title="Click anywhere on the timeline to seek audio"
        >
          {/* Base track line */}
          <div className="w-full h-2 bg-zinc-300 rounded-full relative">
            {/* Pitch issues */}
            {pitchIssues.map((issue) => {
              const left = Math.min(100, Math.max(0, (issue.timestampStartSec / durationSec) * 100));
              const width = Math.min(100 - left, Math.max(3, ((issue.timestampEndSec - issue.timestampStartSec) / durationSec) * 100));
              return (
                <div
                  key={issue.id}
                  onClick={(e) => { e.stopPropagation(); onSeekToTime?.(issue.timestampStartSec); }}
                  className="absolute top-1/2 -translate-y-1/2 h-6 bg-[#69D2E7] border-2 border-black rounded-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-10"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`Uneven Pitch: ${issue.formattedTimestamp}`}
                />
              );
            })}

            {/* Fast Pace Sections */}
            {fastSections.map((sec, idx) => {
              const left = Math.min(100, Math.max(0, (sec.startSec / durationSec) * 100));
              const width = Math.min(100 - left, Math.max(3, ((sec.endSec - sec.startSec) / durationSec) * 100));
              return (
                <div
                  key={`fast-${idx}`}
                  onClick={(e) => { e.stopPropagation(); onSeekToTime?.(sec.startSec); }}
                  className="absolute top-1/2 -translate-y-1/2 h-6 bg-[#4ECCD3] border-2 border-black rounded-md cursor-pointer transition-transform hover:scale-110 z-10"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`Fast Pace (${sec.wpm} WPM): ${formatTime(sec.startSec)}`}
                />
              );
            })}

            {/* Hesitation Pauses */}
            {pauseEvents.filter(p => p.type === 'hesitation').map((p, idx) => {
              const left = Math.min(100, Math.max(0, (p.startSec / durationSec) * 100));
              const width = Math.min(100 - left, Math.max(2, (p.durationSec / durationSec) * 100));
              return (
                <div
                  key={`pause-${idx}`}
                  onClick={(e) => { e.stopPropagation(); onSeekToTime?.(p.startSec); }}
                  className="absolute top-1/2 -translate-y-1/2 h-6 bg-[#FFE600] border-2 border-black rounded-md cursor-pointer transition-transform hover:scale-110 z-10"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`Hesitation Pause (${p.durationSec.toFixed(1)}s): ${formatTime(p.startSec)}`}
                />
              );
            })}
          </div>
        </div>

        <p className="text-[11px] font-mono font-bold text-zinc-600 text-right">
          Click any highlighted section or timestamp to seek audio player
        </p>
      </div>

      {/* Timestamp Issue Jump Cards */}
      {pitchIssues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {pitchIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSeekToTime?.(issue.timestampStartSec)}
              className="p-4 bg-[#69D2E7]/20 border-2 border-black rounded-xl hover:bg-[#69D2E7]/40 cursor-pointer transition-all flex items-start justify-between gap-3 shadow-neo-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-black flex-shrink-0" />
                  <span className="text-xs font-black text-black">{issue.title}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#69D2E7] border border-black text-black">
                    {issue.formattedTimestamp}
                  </span>
                </div>
                <p className="text-xs font-medium text-zinc-800 leading-snug">{issue.whatHappened}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-black flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
