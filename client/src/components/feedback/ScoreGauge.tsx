import React from 'react';
import { Award, ShieldAlert } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  label?: string;
  summaryQuote?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label = "Overall Coaching Score",
  summaryQuote = "Solid structure with clear delivery. Your highest opportunity is expanding vocal pitch modulation."
}) => {
  // SVG circular gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreBadge = (val: number) => {
    if (val >= 85) return { text: 'Exemplary Delivery', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-950/30' };
    if (val >= 70) return { text: 'Proficient & Articulate', color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-950/30' };
    if (val >= 55) return { text: 'Developing Competence', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-950/30' };
    return { text: 'Needs Calibration', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-950/30' };
  };

  const badge = getScoreBadge(score);

  return (
    <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
      {/* Background subtle glowing radial light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-6">
        {/* SVG Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background circle track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#27272a"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress filled arc */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gaugeGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Score Number */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">{score}</span>
            <span className="text-[10px] uppercase font-mono text-zinc-400">/ 100</span>
          </div>
        </div>

        {/* Evaluation Summary & Label */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">{label}</span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${badge.bg} ${badge.border} ${badge.color}`}>
              {badge.text}
            </span>
          </div>
          <p className="text-sm text-zinc-300 italic max-w-lg leading-relaxed font-sans">
            "{summaryQuote}"
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Weighted across 9 acoustic & linguistic dimensions
          </div>
        </div>
      </div>

      {/* Accuracy & Coaching Disclaimer */}
      <div className="max-w-xs p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed font-mono">
        <div className="flex items-center gap-1.5 text-zinc-300 font-semibold mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> AI Coaching Metric
        </div>
        Calculated as a training estimate based on acoustic pitch dynamics and structured reasoning. Not a clinical assessment.
      </div>
    </div>
  );
};
