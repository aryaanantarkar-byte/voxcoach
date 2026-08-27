import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import {
  Sparkles,
  TrendingUp,
  Radio,
  ArrowRight,
  Flame,
  Clock,
  Volume2,
  Gauge,
  Ban,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, sessionsHistory, allTopics, setCurrentTopic } = useSession();

  const quickCategories = [
    { label: 'AI & Automation', category: 'AI', mode: 'debate', desc: 'Technological ethics and labor impact' },
    { label: 'Climate & Energy', category: 'Environment', mode: 'presentation', desc: 'Nuclear, solar & grid decarbonization' },
    { label: 'Behavioral Finance', category: 'Finance', mode: 'casual', desc: 'Cognitive biases and economic nudges' },
    { label: 'Biotech & CRISPR', category: 'Science', mode: 'debate', desc: 'Gene editing and bioethics' },
    { label: 'Job Interview Pitch', category: 'Interview', mode: 'interview', desc: 'Elevator pitch & behavioral questions' },
    { label: 'Impromptu Random', category: 'Random', mode: 'impromptu', desc: 'Spontaneous 2-minute topic challenge' },
  ];

  const handleLaunchTopic = (cat: string) => {
    const matched = allTopics.find((t) => t.category === cat) || allTopics[0];
    setCurrentTopic(matched);
  };

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* 1. Welcome Hub Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Speaker Command Center</span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 rounded-full text-zinc-400">Level: Intermediate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready for your next speaking challenge, {user.name.split(' ')[0]}?
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track your delivery metrics, refine your arguments, and expand your domain knowledge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Radio className="w-4 h-4" />
            <span>Start Practice Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Key Performance Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Overall Score</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">81 <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">+17 pts over 4 weeks</p>
        </div>

        <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Speaking Pace</span>
            <Gauge className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">139 <span className="text-xs text-zinc-500 font-normal">WPM</span></div>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">In ideal 130-160 zone</p>
        </div>

        <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Filler Control</span>
            <Ban className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">1.8 <span className="text-xs text-zinc-500 font-normal">/ min</span></div>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">-68% filler reduction</p>
        </div>

        <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a]">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Pitch Variation</span>
            <Volume2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">σ 28.4 <span className="text-xs text-zinc-500 font-normal">Hz</span></div>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">Natural dynamic flow</p>
        </div>

        <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Sessions</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">5 <span className="text-xs text-zinc-500 font-normal">completed</span></div>
          <p className="text-[11px] text-amber-400 font-mono mt-1">3-day practice streak</p>
        </div>
      </div>

      {/* 3. Quick Start Topic Launchers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            Quick Practice Modes
          </h2>
          <Link to="/topics" className="text-xs text-emerald-400 hover:underline font-mono">View all curated topics →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/prep"
              onClick={() => handleLaunchTopic(cat.category)}
              className="p-4 rounded-xl bg-[#121215] border border-[#27272a] hover:border-emerald-500/50 hover:bg-zinc-900/60 transition-all flex flex-col justify-between group"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {cat.mode}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{cat.desc}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                <span>5-min prep + 3-min speech</span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">Launch →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Improvement Trajectory & Recent Sessions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trajectory Card */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Score Trajectory</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">+26.5% Growth</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { week: 'Session 1 (Jan 04)', score: 64, bar: '64%' },
              { week: 'Session 2 (Jan 09)', score: 69, bar: '69%' },
              { week: 'Session 3 (Jan 14)', score: 73, bar: '73%' },
              { week: 'Session 4 (Jan 18)', score: 77, bar: '77%' },
              { week: 'Session 5 (Jan 22)', score: 81, bar: '81%' },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>{s.week}</span>
                  <span className="font-bold text-white">{s.score} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: s.bar }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-200 block">Primary Focus Goal:</span>
            <p className="text-[11px]">Maintain deliberate pause ratio &gt; 80% and eliminate filler crutch words.</p>
          </div>
        </div>

        {/* Recent Practice Sessions */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Recent Speech Sessions</h3>
            </div>
            <Link to="/progress" className="text-xs text-emerald-400 hover:underline font-mono">View full history →</Link>
          </div>

          <div className="space-y-2">
            {sessionsHistory.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{session.topicTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {session.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500">
                    <span>{session.date}</span>
                    <span>{Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s</span>
                    <span>{session.wpm} WPM</span>
                    <span>{session.fillerCount} fillers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-emerald-400">{session.overallScore}</span>
                    <span className="text-[10px] text-zinc-500 font-mono block">Score</span>
                  </div>
                  <Link
                    to="/results"
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs font-medium transition-colors"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
