import React from 'react';
import { ICoachingScores } from '../../types';
import { Volume2, Activity, Gauge, PauseCircle, Ban, Sparkles, LayoutList, BookOpen, BrainCircuit } from 'lucide-react';

interface CategoryBreakdownProps {
  scores: ICoachingScores['breakdown'];
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ scores }) => {
  const categories = [
    { key: 'voiceModulation', label: 'Voice Modulation', score: scores.voiceModulation, icon: Volume2, weight: '10%' },
    { key: 'pitchVariation', label: 'Pitch Variation', score: scores.pitchVariation, icon: Activity, weight: '10%' },
    { key: 'speakingPace', label: 'Speaking Pace', score: scores.speakingPace, icon: Gauge, weight: '12%' },
    { key: 'pauses', label: 'Pauses & Rhythm', score: scores.pauses, icon: PauseCircle, weight: '10%' },
    { key: 'fillerWords', label: 'Filler Word Control', score: scores.fillerWords, icon: Ban, weight: '12%' },
    { key: 'clarity', label: 'Clarity & Flow', score: scores.clarity, icon: Sparkles, weight: '12%' },
    { key: 'structure', label: 'Speech Structure', score: scores.structure, icon: LayoutList, weight: '12%' },
    { key: 'vocabulary', label: 'Lexical Richness', score: scores.vocabulary, icon: BookOpen, weight: '10%' },
    { key: 'contentReasoning', label: 'Reasoning & Depth', score: scores.contentReasoning, icon: BrainCircuit, weight: '12%' },
  ];

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 70) return 'bg-teal-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const barColor = getBarColor(cat.score);

        return (
          <div
            key={cat.key}
            className="p-4 rounded-xl bg-[#121215] border border-[#27272a] hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-zinc-200">{cat.label}</span>
              </div>
              <span className="text-xs font-mono font-bold text-white">{cat.score}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full ${barColor} transition-all duration-700 rounded-full`}
                style={{ width: `${cat.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Weight: {cat.weight}</span>
              <span>{cat.score >= 75 ? 'Optimal Range' : 'Target For Growth'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
