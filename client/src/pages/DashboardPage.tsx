import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import {
  Sparkles,
  Radio,
  ArrowRight,
  Clock,
  Compass,
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
    <div className="space-y-16 py-10 max-w-6xl mx-auto px-4 font-sans">
      {/* 1. Editorial Stage Header */}
      <div className="space-y-4 border-b-4 border-black pb-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-mono font-bold uppercase bg-[#69D2E7] border-2 border-black text-black shadow-neo-sm">
            Speaker Command Center
          </span>
          <span className="text-xs font-mono font-bold text-zinc-600">
            Level: Intermediate Speaker
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black tracking-tight leading-none uppercase">
          Master Speech <br />
          <span className="text-[#69D2E7] bg-black px-3 inline-block shadow-neo">Delivery & Logic.</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          <p className="text-sm sm:text-base font-bold text-zinc-800 max-w-xl leading-relaxed">
            Welcome back, {user.name.split(' ')[0]}. VoxCoach tracks your fundamental frequency pitch jumps, WPM cadence stability, and rhetorical pauses to elevate your public speaking.
          </p>

          <Link
            to="/topics"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#FFE600] border-2 border-black text-black font-black text-sm shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
          >
            <Radio className="w-5 h-5" />
            <span>Launch Speech Session</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* 2. Editorial Oversized Numerical Performance Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Large Score Showcase Panel */}
        <div className="lg:col-span-7 p-8 bg-white border-2 border-black rounded-3xl shadow-neo space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              <span className="text-xs font-mono font-bold uppercase text-black">Latest Speech Score</span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#51CF66] border border-black text-black">
              +17 Pts Growth
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-7xl sm:text-9xl font-black font-mono text-black tracking-tight leading-none">
              81<span className="text-3xl text-zinc-500 font-bold">/100</span>
            </div>
            <p className="text-xs font-bold text-zinc-700 font-mono pt-2">
              Calibrated across pitch modulation, pause breaks, and speech reasoning.
            </p>
          </div>

          <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-2xl font-mono text-xs font-bold text-black space-y-1">
            <span>Primary Focus Target:</span>
            <p className="text-zinc-700 font-medium">
              Eliminate rising terminal inflections between 00:42–00:48 and anchor main argument transitions.
            </p>
          </div>
        </div>

        {/* Supporting Metric Columns */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-6 bg-white border-2 border-black rounded-3xl shadow-neo flex flex-col justify-between space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-black">Cadence</span>
            <div className="text-4xl font-black font-mono text-black">139 <span className="text-xs font-bold text-zinc-600">WPM</span></div>
            <span className="text-[11px] font-bold text-blue-700 font-mono">Ideal 130–160</span>
          </div>

          <div className="p-6 bg-white border-2 border-black rounded-3xl shadow-neo flex flex-col justify-between space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-black">Fillers</span>
            <div className="text-4xl font-black font-mono text-black">1.8 <span className="text-xs font-bold text-zinc-600">/min</span></div>
            <span className="text-[11px] font-bold text-emerald-700 font-mono">-68% fillers</span>
          </div>

          <div className="p-6 bg-white border-2 border-black rounded-3xl shadow-neo flex flex-col justify-between space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-black">Pitch σ</span>
            <div className="text-4xl font-black font-mono text-black">±28.4 <span className="text-xs font-bold text-zinc-600">Hz</span></div>
            <span className="text-[11px] font-bold text-purple-700 font-mono">Natural Flow</span>
          </div>

          <div className="p-6 bg-white border-2 border-black rounded-3xl shadow-neo flex flex-col justify-between space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-black">Streak</span>
            <div className="text-4xl font-black font-mono text-black">5 <span className="text-xs font-bold text-zinc-600">done</span></div>
            <span className="text-[11px] font-bold text-amber-700 font-mono">3-Day Streak</span>
          </div>
        </div>
      </div>

      {/* 3. Revealed Section: Quick Practice Modes */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-black" />
            <h2 className="text-xl font-black text-black tracking-tight">Curated Speech Practice Arena</h2>
          </div>
          <Link to="/topics" className="text-xs font-mono font-bold text-purple-700 hover:underline">
            View All Topics →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/prep"
              onClick={() => handleLaunchTopic(cat.category)}
              className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-black group-hover:text-purple-700 transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#69D2E7] border border-black text-black">
                    {cat.mode}
                  </span>
                </div>
                <p className="text-xs font-medium text-zinc-700 leading-relaxed">{cat.desc}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-black pt-3 border-t-2 border-black">
                <span>5-min prep + 3-min speech</span>
                <span className="group-hover:translate-x-1 transition-transform">Launch →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Revealed Section: Recent Speech Sessions Table */}
      <div className="p-8 bg-white border-2 border-black rounded-3xl shadow-neo space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-black" />
            <h3 className="text-xl font-black text-black">Recent Speech History</h3>
          </div>
          <Link to="/progress" className="text-xs font-mono font-bold text-purple-700 hover:underline">
            View Longitudinal History →
          </Link>
        </div>

        <div className="space-y-4">
          {sessionsHistory.slice(0, 4).map((session) => (
            <div
              key={session.id}
              className="p-5 bg-[#F7F4EB] border-2 border-black rounded-2xl shadow-neo-sm hover:translate-x-[-2px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-black">{session.topicTitle}</span>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#A78BFA] border border-black text-black">
                    {session.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono font-bold text-zinc-700">
                  <span>{session.date}</span>
                  <span>{Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s</span>
                  <span>{session.wpm} WPM</span>
                  <span>{session.fillerCount} fillers</span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-xl font-black font-mono text-black">{session.overallScore}</span>
                  <span className="text-[10px] font-mono font-bold text-zinc-600 block">Score</span>
                </div>
                <Link
                  to="/results"
                  className="px-4 py-2 bg-[#FFE600] border-2 border-black rounded-xl text-xs font-bold text-black hover:bg-yellow-300 transition-colors shadow-neo-sm"
                >
                  View Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

