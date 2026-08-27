import React, { useState } from 'react';
import { IAnalysisCategoryResult } from '../../types';
import { speakProfessionalReference, stopProfessionalReference, isSynthesisSupported } from '../../services/audioSynthesisService';
import { Play, Square, Volume2, X, ArrowRight, ShieldAlert } from 'lucide-react';

interface ResultCardDetailsModalProps {
  result: IAnalysisCategoryResult | null;
  onClose: () => void;
  onSeekToTime?: (timeSec: number) => void;
}

export const ResultCardDetailsModal: React.FC<ResultCardDetailsModalProps> = ({
  result,
  onClose,
  onSeekToTime,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  if (!result) return null;

  const handlePlayProfessional = () => {
    const textToSpeak = result.professionalExample?.professionalText || result.detailedAnalysis.howToImprove;
    if (isPlayingAudio) {
      stopProfessionalReference();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speakProfessionalReference(
      textToSpeak,
      { pitch: 0.95, rate: 0.92 },
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-neo-xl animate-in fade-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#69D2E7] border-2 border-black flex items-center justify-center font-mono font-black text-xl text-black shadow-neo-sm">
              {result.score}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#A78BFA] border border-black text-black">
                  {result.severity.toUpperCase()}
                </span>
                {result.formattedTimestamp && (
                  <button
                    onClick={() => result.timestampSec !== undefined && onSeekToTime?.(result.timestampSec)}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFE600] border border-black text-black hover:underline"
                  >
                    Timestamp: {result.formattedTimestamp}
                  </button>
                )}
              </div>
              <h2 className="text-xl font-black text-black tracking-tight">{result.title} Analysis</h2>
            </div>
          </div>

          <button
            onClick={() => { stopProfessionalReference(); onClose(); }}
            className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black font-black hover:bg-red-200 transition-colors shadow-neo-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Key Finding Summary */}
        <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl shadow-neo-sm space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-black block">Primary Diagnostic Finding</span>
          <p className="text-sm font-bold text-black leading-relaxed">{result.keyFinding}</p>
        </div>

        {/* Deep Analysis Sections */}
        <div className="space-y-4">
          <div className="p-4 bg-white border-2 border-black rounded-xl space-y-1">
            <h4 className="text-xs font-black uppercase text-black font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-black" />
              Why It Matters for Public Speaking
            </h4>
            <p className="text-xs font-medium text-zinc-800 leading-relaxed font-sans">{result.detailedAnalysis.whyItMatters}</p>
          </div>

          <div className="p-4 bg-white border-2 border-black rounded-xl space-y-1">
            <h4 className="text-xs font-black uppercase text-black font-mono flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4 text-black" />
              Actionable Coaching Recommendation
            </h4>
            <p className="text-xs font-medium text-zinc-800 leading-relaxed font-sans">{result.detailedAnalysis.howToImprove}</p>
          </div>
        </div>

        {/* Side-by-Side Audio Comparison: Your Recording vs Professional Example */}
        {result.hasProfessionalExample && (
          <div className="p-5 bg-white border-2 border-black rounded-2xl shadow-neo space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-black" />
                <h4 className="text-sm font-black text-black">Voice Delivery Comparison</h4>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#51CF66] border border-black text-black">
                Web Speech API Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Your Recording */}
              <div className="p-3.5 bg-[#F7F4EB] border-2 border-black rounded-xl space-y-2">
                <span className="text-[11px] font-black uppercase text-black font-mono block">Your Recording</span>
                <p className="text-xs font-mono font-medium text-zinc-800 italic">
                  "{result.professionalExample?.originalText || 'AI can basically scan thousands of documents in seconds.'}"
                </p>
                {result.formattedTimestamp && (
                  <button
                    onClick={() => result.timestampSec !== undefined && onSeekToTime?.(result.timestampSec)}
                    className="text-[11px] font-mono font-bold text-blue-700 hover:underline block"
                  >
                    ▶ Jump to {result.formattedTimestamp}
                  </button>
                )}
              </div>

              {/* Professional Example */}
              <div className="p-3.5 bg-[#69D2E7]/20 border-2 border-black rounded-xl space-y-2">
                <span className="text-[11px] font-black uppercase text-black font-mono block">Recommended Delivery</span>
                <p className="text-xs font-mono font-bold text-black">
                  "{result.professionalExample?.professionalText || result.detailedAnalysis.howToImprove}"
                </p>
                <p className="text-[10px] font-mono font-bold text-zinc-700">
                  Style: {result.professionalExample?.styleDescription || 'Controlled pitch, downward resolution & natural pacing'}
                </p>
              </div>
            </div>

            {/* Audio Synthesis Control Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-zinc-600">
                {isSynthesisSupported() ? 'Interactive Web Speech Synthesis' : 'Audio engine unavailable'}
              </span>

              <button
                onClick={handlePlayProfessional}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black font-black text-xs shadow-neo-sm transition-all ${
                  isPlayingAudio ? 'bg-[#FF6B6B] text-black' : 'bg-[#FFE600] text-black hover:bg-yellow-300'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-4 h-4 fill-black" />
                    <span>Stop Reference</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Hear Professional Example</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => { stopProfessionalReference(); onClose(); }}
            className="px-5 py-2 bg-zinc-200 border-2 border-black rounded-xl text-xs font-bold text-black hover:bg-zinc-300"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
