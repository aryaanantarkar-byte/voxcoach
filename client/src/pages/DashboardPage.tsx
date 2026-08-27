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
    <div className="space-y-8 py-8 max-w-5xl mx-auto px-4 font-sans">
      {/* 1. Welcome Hub Header */}
      <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase text-black font-mono">Speaker Command Center</span>
            <span className="px-2 py-0.5 text-[10px] font-black font-mono bg-[#A78BFA] border border-black rounded-full text-black">Intermediate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Ready for your next challenge, {user.name.split(' ')[0]}?
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-700 mt-1">
            Track your delivery metrics, refine your arguments, and expand your domain knowledge.
          </p>
        </div>

        <Link
          to="/topics"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFE600] border-2 border-black text-black font-black text-xs shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
        >
          <Radio className="w-4 h-4" />
          <span>Start Practice Session</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Key Performance Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black font-mono uppercase">Overall Score</span>
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">81 <span className="text-xs font-normal text-zinc-600">/ 100</span></div>
          <p className="text-[11px] font-bold text-emerald-700 font-mono mt-1">+17 pts gain</p>
        </div>

        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black font-mono uppercase">Pace</span>
            <Gauge className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">139 <span className="text-xs font-normal text-zinc-600">WPM</span></div>
          <p className="text-[11px] font-bold text-blue-700 font-mono mt-1">Ideal 130-160</p>
        </div>

        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black font-mono uppercase">Fillers</span>
            <Ban className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">1.8 <span className="text-xs font-normal text-zinc-600">/ min</span></div>
          <p className="text-[11px] font-bold text-emerald-700 font-mono mt-1">-68% fillers</p>
        </div>

        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black font-mono uppercase">Pitch σ</span>
            <Volume2 className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">±28.4 <span className="text-xs font-normal text-zinc-600">Hz</span></div>
          <p className="text-[11px] font-bold text-purple-700 font-mono mt-1">Natural dynamics</p>
        </div>

        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-black mb-1">
            <span className="text-xs font-black font-mono uppercase">Streak</span>
            <Flame className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono text-black">5 <span className="text-xs font-normal text-zinc-600">done</span></div>
          <p className="text-[11px] font-bold text-amber-700 font-mono mt-1">3-day streak</p>
        </div>
      </div>

      {/* 3. Quick Start Topic Launchers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase text-black font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-black" />
            Quick Practice Modes
          </h2>
          <Link to="/topics" className="text-xs font-bold text-purple-700 hover:underline font-mono">View all curated topics →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/prep"
              onClick={() => handleLaunchTopic(cat.category)}
              className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between group"
            >
              <div className="mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-black group-hover:text-purple-700 transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#69D2E7] border border-black text-black">
                    {cat.mode}
                  </span>
                </div>
                <p className="text-xs text-zinc-700 font-medium leading-relaxed">{cat.desc}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-black pt-2 border-t-2 border-black">
                <span>5-min prep + 3-min speech</span>
                <span className="group-hover:translate-x-1 transition-transform">Launch →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Improvement Trajectory & Recent Sessions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trajectory Card */}
        <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-black" />
              <h3 className="text-sm font-black text-black">Score Trajectory</h3>
            </div>
            <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#51CF66] border border-black text-black">+26.5%</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { week: 'Sess 1 (Jan 04)', score: 64, bar: '64%' },
              { week: 'Sess 2 (Jan 09)', score: 69, bar: '69%' },
              { week: 'Sess 3 (Jan 14)', score: 73, bar: '73%' },
              { week: 'Sess 4 (Jan 18)', score: 77, bar: '77%' },
              { week: 'Sess 5 (Jan 22)', score: 81, bar: '81%' },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-black font-bold text-[11px]">
                  <span>{s.week}</span>
                  <span>{s.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 border border-black rounded-full overflow-hidden">
                  <div className="h-full bg-[#69D2E7]" style={{ width: s.bar }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#FFE600] border-2 border-black text-xs text-black space-y-1 font-mono font-bold">
            <span>Primary Focus Goal:</span>
            <p className="text-[11px]">Maintain deliberate pause ratio &gt; 80% and eliminate filler crutch words.</p>
          </div>
        </div>

        {/* Recent Practice Sessions */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-black" />
              <h3 className="text-sm font-black text-black">Recent Speech Sessions</h3>
            </div>
            <Link to="/progress" className="text-xs text-purple-700 hover:underline font-mono font-bold">View full history →</Link>
          </div>

          <div className="space-y-3">
            {sessionsHistory.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl bg-[#F7F4EB] border-2 border-black shadow-neo-sm hover:translate-x-[-2px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-black">{session.topicTitle}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#A78BFA] text-black border border-black">
                      {session.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-700 font-bold">
                    <span>{session.date}</span>
                    <span>{Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s</span>
                    <span>{session.wpm} WPM</span>
                    <span>{session.fillerCount} fillers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-black">{session.overallScore}</span>
                    <span className="text-[10px] text-zinc-600 font-mono font-bold block">Score</span>
                  </div>
                  <Link
                    to="/results"
                    className="px-3 py-1.5 rounded-lg bg-[#FFE600] border-2 border-black text-black text-xs font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Report
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

