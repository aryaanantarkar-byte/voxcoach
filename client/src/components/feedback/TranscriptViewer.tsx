import React, { useState } from 'react';
import { ITranscriptSegment } from '../../types';
import { Filter, MessageSquareQuote, Check } from 'lucide-react';

interface TranscriptViewerProps {
  fullText: string;
  segments: ITranscriptSegment[];
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ fullText, segments }) => {
  const [highlightFillers, setHighlightFillers] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Spoken Transcript & Articulation Highlights</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHighlightFillers(!highlightFillers)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              highlightFillers
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Highlight Fillers</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
        </div>
      </div>

      {/* Styled Transcript Text with Highlight Badges */}
      <div className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-sm leading-relaxed text-zinc-300 font-sans selection:bg-emerald-500/30">
        {segments && segments.length > 0 ? (
          <div className="space-x-1">
            {segments.map((seg, idx) => {
              if (seg.isFiller && highlightFillers) {
                return (
                  <span
                    key={idx}
                    className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-medium font-mono text-xs shadow-sm shadow-rose-950/50"
                    title={`Filler word: "${seg.fillerWord}" at ${seg.startTimeSec.toFixed(1)}s`}
                  >
                    {seg.text}
                  </span>
                );
              }
              return (
                <span key={idx} className="hover:text-white transition-colors">
                  {seg.text}{' '}
                </span>
              );
            })}
          </div>
        ) : (
          <p>{fullText}</p>
        )}
      </div>

      {/* Timestamped Segment Timeline Accordion / List */}
      <div className="pt-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
          Segment Flow & Cadence
        </span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {segments.map((seg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-4 font-mono ${
                seg.isFiller
                  ? 'bg-rose-950/10 border-rose-900/30 text-rose-300'
                  : 'bg-zinc-900/40 border-zinc-800/40 text-zinc-400 hover:bg-zinc-900'
              }`}
            >
              <span className="text-[11px] text-zinc-500 flex-shrink-0">
                [{seg.startTimeSec.toFixed(1)}s - {seg.endTimeSec.toFixed(1)}s]
              </span>
              <span className="text-zinc-300 flex-1 truncate font-sans text-xs">{seg.text}</span>
              <span className="text-[11px] text-zinc-400 flex-shrink-0">{seg.wpm} WPM</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
