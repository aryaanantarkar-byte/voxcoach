import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IAnalysisCategoryResult } from '../../types';
import { ResultCardDetailsModal } from './ResultCardDetailsModal';
import { ArrowRight, Volume2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalResultsScrollProps {
  results: IAnalysisCategoryResult[];
  onSeekToTime?: (timeSec: number) => void;
}

export const HorizontalResultsScroll: React.FC<HorizontalResultsScrollProps> = ({
  results,
  onSeekToTime,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedResult, setSelectedResult] = useState<IAnalysisCategoryResult | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Group 10 result cards into 5 pairs (exactly 2 cards per scroll step)
  const pairedResults: IAnalysisCategoryResult[][] = [];
  for (let i = 0; i < results.length; i += 2) {
    pairedResults.push(results.slice(i, i + 2));
  }

  useEffect(() => {
    const target = targetRef.current;
    const container = containerRef.current;
    if (!target || !container || pairedResults.length === 0) return;

    // Respect prefers-reduced-motion. The native scroller remains available as a
    // low-motion fallback instead of hiding all result pairs behind the first one.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    const totalPairs = pairedResults.length;
    if (prefersReducedMotion || totalPairs <= 1) return;
    // Calculate total horizontal shift percentage based on number of 2-card slides
    // xPercent is relative to the track width (N slides), so one viewport is
    // 100 / N percent of that track.
    const xPercentShift = -((totalPairs - 1) * (100 / totalPairs));

    const st = gsap.to(container, {
      xPercent: xPercentShift,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        pin: true,
        scrub: 0.8,
        snap: 1 / (totalPairs - 1),
        end: () => `+=${target.offsetWidth * (totalPairs - 1)}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [results, pairedResults.length]);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black block">
            Awwwards-Style Horizontal Journey
          </span>
          <h2 className="text-xl font-black text-black">Deep Delivery & Content Assessment</h2>
        </div>
        <div className="px-3 py-1 bg-[#FFE600] border-2 border-black rounded-xl text-xs font-mono font-bold text-black flex items-center gap-1.5 shadow-neo-sm">
          <Sparkles className="w-4 h-4 text-black" />
          <span>2 Cards Revealed Per Scroll Step</span>
        </div>
      </div>

      {/* GSAP Pinned Horizontal Scroll Section */}
      <div ref={targetRef} className={`relative w-full min-h-[520px] rounded-2xl border-2 border-black bg-[#F7F4EB] p-6 shadow-neo ${reducedMotion ? 'overflow-x-auto snap-x snap-mandatory' : 'overflow-hidden'}`}>
        <div
          ref={containerRef}
          className="flex flex-nowrap h-full transition-transform duration-300 ease-out"
          style={{ width: `${pairedResults.length * 100}%` }}
        >
          {pairedResults.map((pair, slideIdx) => (
            <div
              key={`slide-${slideIdx}`}
              className="flex-shrink-0 grid grid-cols-2 gap-3 sm:gap-6 h-full items-stretch snap-start"
              style={{ width: `${100 / pairedResults.length}%` }}
            >
              {pair.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border-2 border-black rounded-2xl p-6 shadow-neo flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group"
                >
                  {/* Top Bar: Score & Severity Badge */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black font-mono text-black px-3 py-1 rounded-xl bg-[#69D2E7] border-2 border-black shadow-neo-sm">
                          {card.score}
                          <span className="text-xs font-normal text-zinc-700">/100</span>
                        </span>
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#A78BFA] border border-black text-black">
                          {card.severity}
                        </span>
                      </div>

                      {card.formattedTimestamp && (
                        <button
                          onClick={() => card.timestampSec !== undefined && onSeekToTime?.(card.timestampSec)}
                          className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#FFE600] border border-black text-black hover:underline"
                        >
                          {card.formattedTimestamp}
                        </button>
                      )}
                    </div>

                    {/* Title & Short Interpretation */}
                    <div>
                      <h3 className="text-lg font-black text-black group-hover:text-purple-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-bold text-zinc-700 font-mono mt-0.5">{card.shortInterpretation}</p>
                    </div>

                    {/* Key Finding Box */}
                    <div className="p-3.5 bg-[#F7F4EB] border-2 border-black rounded-xl text-xs font-medium text-zinc-800 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-black block">Key Finding</span>
                      <p className="leading-relaxed">{card.keyFinding}</p>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t-2 border-black flex items-center justify-between gap-2">
                    {card.hasProfessionalExample ? (
                      <span className="text-[10px] font-mono font-bold text-black flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-black" /> Professional Voice Available
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-zinc-500">
                        Detailed Analytics Ready
                      </span>
                    )}

                    <button
                      onClick={() => setSelectedResult(card)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFE600] border-2 border-black font-bold text-xs text-black shadow-neo-sm hover:bg-yellow-300 transition-all"
                    >
                      <span>View Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Index Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {pairedResults.map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full border border-black bg-zinc-300 transition-all duration-300 w-8"
            title={`2-Card Step ${i + 1}`}
          />
        ))}
      </div>

      {/* Expanded Modal Drawer */}
      <ResultCardDetailsModal
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
        onSeekToTime={onSeekToTime}
      />
    </div>
  );
};
