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
    <div className="space-y-8 py-8 max-w-5xl mx-auto px-4 font-sans">
      {/* 1. Header */}
      <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-4 h-4 text-black" />
            <span className="text-xs font-black uppercase text-black font-mono">Progress History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Speaker Progress & Skill Trajectory
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-700 mt-1">
            Measurable tracking across vocal modulation, pace stability, and filler word elimination.
          </p>
        </div>

        <Link
          to="/topics"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE600] border-2 border-black text-black font-bold text-xs shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Practice Next Topic</span>
        </Link>
      </div>

      {/* 2. Key Trend Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black uppercase font-mono">Overall Score</span>
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">64 → 81</div>
          <p className="text-xs font-bold text-emerald-700 font-mono mt-1">+26.5% gain</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black uppercase font-mono">Filler Drop</span>
            <Ban className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">16 → 5</div>
          <p className="text-xs font-bold text-emerald-700 font-mono mt-1">-68.7% fillers</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black uppercase font-mono">Cadence</span>
            <Gauge className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">139 <span className="text-xs font-bold">WPM</span></div>
          <p className="text-xs font-bold text-blue-700 font-mono mt-1">Ideal Band</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black uppercase font-mono">Pitch Variation</span>
            <Activity className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">±28.4 <span className="text-xs font-bold">Hz</span></div>
          <p className="text-xs font-bold text-purple-700 font-mono mt-1">Natural Flow</p>
        </div>
      </div>

      {/* 3. Longitudinal Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Progression Chart */}
        <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <div>
              <h3 className="text-sm font-black text-black">Overall Coaching Score Progression</h3>
              <p className="text-xs text-zinc-600 font-medium">Chronological trend across completed sessions</p>
            </div>
            <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded-full bg-[#51CF66] border border-black text-black">+17 Pts</span>
          </div>

          <div className="w-full h-64 font-sans p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                <XAxis dataKey="name" stroke="#000000" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#000000" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#FFE600] border-2 border-black p-2.5 rounded-lg shadow-neo-sm text-xs font-mono text-black font-bold">
                          <p>{label}</p>
                          <p>Score: {payload[0].value} / 100</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#000000"
                  strokeWidth={3}
                  dot={{ fill: '#69D2E7', r: 5, stroke: '#000000', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#FFE600', stroke: '#000000', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filler Word Reduction Curve */}
        <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <div>
              <h3 className="text-sm font-black text-black">Filler Word Elimination Curve</h3>
              <p className="text-xs text-zinc-600 font-medium">Total filler words detected per session</p>
            </div>
            <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded-full bg-[#FF6B6B] border border-black text-black">-68% Drop</span>
          </div>

          <div className="w-full h-64 font-sans p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                <XAxis dataKey="name" stroke="#000000" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 20]} stroke="#000000" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#FF6B6B] border-2 border-black p-2.5 rounded-lg shadow-neo-sm text-xs font-mono text-black font-bold">
                          <p>{label}</p>
                          <p>Fillers: {payload[0].value} words</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fillers"
                  stroke="#000000"
                  strokeWidth={3}
                  dot={{ fill: '#FF6B6B', r: 5, stroke: '#000000', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#FFE600', stroke: '#000000', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Strengths, Growth Areas & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
            <Award className="w-4 h-4 text-black" />
            <h3 className="text-sm font-black text-black">Demonstrated Strengths</h3>
          </div>
          <ul className="space-y-2 text-xs font-medium text-zinc-800">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Logical Structure:</strong> Consistent three-act outline.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Conversational Pace:</strong> Stable within 130–160 WPM.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Rhetorical Pauses:</strong> Deliberate silence at transitions.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
            <Target className="w-4 h-4 text-black" />
            <h3 className="text-sm font-black text-black">Target Opportunities</h3>
          </div>
          <ul className="space-y-2 text-xs font-medium text-zinc-800">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#FFE600] border border-black font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
              <span><strong>Downward Pitch Cadence:</strong> Inflect pitch downward on conclusions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[#FFE600] border border-black font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
              <span><strong>Crutch Elimination:</strong> Eliminate habitual "basically".</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#A78BFA] border-2 border-black shadow-neo space-y-3 text-black">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
            <Flame className="w-4 h-4 text-black" />
            <h3 className="text-sm font-black">Current Milestone Goal</h3>
          </div>
          <div className="space-y-2 text-xs font-medium">
            <p className="font-bold">Reduce filler words to &lt; 1.0 / min over the next 3 sessions.</p>
            <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#FFE600]" style={{ width: '70%' }} />
            </div>
            <span className="text-[11px] font-mono font-bold block text-right">70% completed</span>
          </div>
        </div>
      </div>

      {/* 5. Complete Session Log Table */}
      <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <h3 className="text-sm font-black text-black">Session History Log</h3>
          <span className="text-xs font-mono font-bold text-zinc-600">Total {sessionsHistory.length} sessions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-black border-b-2 border-black font-bold bg-[#F7F4EB]">
                <th className="p-3">Topic Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Pace</th>
                <th className="p-3">Fillers</th>
                <th className="p-3">Pitch σ</th>
                <th className="p-3 text-right">Score</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b-2 border-black">
              {sessionsHistory.map((s) => (
                <tr key={s.id} className="hover:bg-[#FFE600]/30 transition-colors">
                  <td className="p-3 text-black font-bold font-sans max-w-xs truncate">{s.topicTitle}</td>
                  <td className="p-3 text-zinc-700 font-bold">{s.category}</td>
                  <td className="p-3 text-zinc-600">{s.date}</td>
                  <td className="p-3 text-zinc-800">{s.wpm} WPM</td>
                  <td className="p-3 font-bold text-red-600">{s.fillerCount}</td>
                  <td className="p-3 text-purple-700 font-bold">±{s.pitchStdDev} Hz</td>
                  <td className="p-3 text-right font-black text-black text-sm">{s.overallScore}</td>
                  <td className="p-3 text-right">
                    <Link
                      to="/results"
                      className="px-3 py-1 rounded-lg bg-[#FFE600] border-2 border-black text-black font-bold hover:bg-yellow-300 transition-colors"
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

