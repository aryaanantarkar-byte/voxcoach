import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  History,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  Ban,
  Gauge,
  Activity,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export const ProgressHistoryPage: React.FC = () => {
  const { sessionsHistory } = useSession();

  // Reverse history so it graphs chronologically from past to present
  const chartData = [...sessionsHistory].reverse().map((s, idx) => ({
    name: `Sess ${idx + 1}`,
    score: s.overallScore,
    wpm: s.wpm,
    fillers: s.fillerCount,
    pitchVariation: s.pitchStdDev,
    date: s.date,
  }));

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Longitudinal Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Speaker Progress & Skill Trajectory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Measurable tracking across vocal modulation, pace stability, and filler word elimination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Next Topic</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Trend Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Overall Score Growth</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">64 → 81</div>
          <p className="text-xs text-emerald-400 font-mono mt-1">+26.5% overall gain</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Filler Reduction</span>
            <Ban className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">16 → 5 <span className="text-xs text-zinc-500">count</span></div>
          <p className="text-xs text-emerald-400 font-mono mt-1">-68.7% crutch word drop</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Cadence Calibration</span>
            <Gauge className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">172 → 139 <span className="text-xs text-zinc-500">WPM</span></div>
          <p className="text-xs text-emerald-400 font-mono mt-1">Calibrated into ideal band</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Pitch Dynamic Range</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">14.2 → 28.4 <span className="text-xs text-zinc-500">Hz</span></div>
          <p className="text-xs text-emerald-400 font-mono mt-1">Monotone → Natural</p>
        </div>
      </div>

      {/* 3. Longitudinal Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Progression Chart */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-white">Overall Coaching Score Progression</h3>
              <p className="text-xs text-zinc-400">Chronological trend across completed sessions</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">+17 Points</span>
          </div>

          <div className="w-full h-60 font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#71717a" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg text-xs font-mono">
                          <p className="text-zinc-400">{label}</p>
                          <p className="text-emerald-400 font-bold">Score: {payload[0].value} / 100</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filler Word Reduction Curve */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-white">Filler Word Elimination Curve</h3>
              <p className="text-xs text-zinc-400">Total filler words detected per session</p>
            </div>
            <span className="text-xs font-mono text-rose-400">-68% Reduction</span>
          </div>

          <div className="w-full h-60 font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                <YAxis domain={[0, 20]} stroke="#71717a" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg text-xs font-mono">
                          <p className="text-zinc-400">{label}</p>
                          <p className="text-rose-400 font-bold">Fillers: {payload[0].value} words</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fillers"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  dot={{ fill: '#f43f5e', r: 4 }}
                  activeDot={{ r: 6, fill: '#f43f5e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Strengths, Growth Areas & Active Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Award className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Demonstrated Strengths</h3>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Logical Structure:</strong> Consistent three-act outline (Hook, Body, Conclusion).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Conversational Pace:</strong> Stabilized within the optimal 130–160 WPM bandwidth.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Rhetorical Pauses:</strong> Deliberate silence at major premise transitions.</span>
            </li>
          </ul>
        </div>

        {/* Areas for Growth */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Target className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Target Opportunities</h3>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-400 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
              <span><strong>Downward Pitch Cadence:</strong> Inflect pitch downward on concluding statements.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-400 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
              <span><strong>Crutch Elimination:</strong> Eliminate habitual "basically" during transitions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-400 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
              <span><strong>Counterargument Rigor:</strong> Explicitly address opposing perspectives.</span>
            </li>
          </ul>
        </div>

        {/* Active Goal */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-zinc-950 border border-emerald-800/40 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Flame className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Current Milestone Goal</h3>
          </div>
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="font-semibold text-white">Reduce filler words to &lt; 1.0 / min over the next 3 sessions.</p>
            <p className="text-zinc-400 leading-relaxed">
              Focus on replacing instantaneous hesitation sounds with a clean, comfortable 1-second breath pause.
            </p>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }} />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 block text-right">70% to goal</span>
          </div>
        </div>
      </div>

      {/* 5. Complete Session Log */}
      <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-white">Session History Log</h3>
          <span className="text-xs font-mono text-zinc-500">Total 5 sessions recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800/80">
                <th className="pb-3 font-medium">Session / Topic</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Pace</th>
                <th className="pb-3 font-medium">Fillers</th>
                <th className="pb-3 font-medium">Pitch σ</th>
                <th className="pb-3 font-medium text-right">Score</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sessionsHistory.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 text-white font-semibold font-sans max-w-xs truncate">{s.topicTitle}</td>
                  <td className="py-3 text-zinc-400">{s.category}</td>
                  <td className="py-3 text-zinc-500">{s.date}</td>
                  <td className="py-3 text-zinc-300">{s.wpm} WPM</td>
                  <td className="py-3 text-rose-400">{s.fillerCount}</td>
                  <td className="py-3 text-purple-400">±{s.pitchStdDev} Hz</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">{s.overallScore}</td>
                  <td className="py-3 text-right">
                    <Link
                      to="/results"
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 transition-colors"
                    >
                      Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
