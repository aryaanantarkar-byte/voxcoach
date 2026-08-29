import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { Activity, ArrowUpRight, Clock, Compass, Radio, Target, Volume2 } from 'lucide-react';
import { AsciiCanvas, AsciiEffectParams } from '../components/visuals/AsciiCanvas';

const dashboardAscii: AsciiEffectParams = {
  src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
  renderMode: 'dither', bgMode: 'blurred', bgColor: '#071015', bgBlur: 12, bgOpacity: 32,
  cellSize: 9, coverage: 100, invert: false, styleBlend: 'source-over', charSet: 'standard', customChars: '',
  brightness: 100, contrast: 100, edgeEmphasis: 18, density: 24,
  toneCurve: [{ x: 0, y: 0 }, { x: 0.28, y: 0.14 }, { x: 0.72, y: 0.86 }, { x: 1, y: 1 }],
  tint: '#69d2e7', tintOpacity: 22, overlayBlend: 'screen', saturation: 100, grayscale: 62,
  blurType: 'off', blurAmount: 35,
  pfx: {
    vignette: { enabled: true, intensity: 58 }, scanLines: { enabled: true, intensity: 26 }, chromatic: { enabled: true, intensity: 15 },
    bloom: { enabled: true, intensity: 22 }, filmGrain: { enabled: true, intensity: 12 }, glitch: { enabled: false, intensity: 20 },
    halftone: { enabled: false, intensity: 20 }, pixelate: { enabled: false, intensity: 15 }, filmDust: { enabled: false, intensity: 20 },
  },
  animated: true, animStyle: 'flicker', animSpeed: { enabled: true, intensity: 80 }, animIntensity: { enabled: true, intensity: 30 },
  lights: { enabled: true, points: [{ x: 0.76, y: 0.18, radius: 220, intensity: 24, color: '#ffdc60' }] },
  mask: { enabled: false, invert: true, dataUrl: null },
};

export const DashboardPage: React.FC = () => {
  const { user, sessionsHistory, allTopics, setCurrentTopic } = useSession();
  const quickCategories = [
    ['AI & Automation', 'AI', 'debate', 'Technological ethics and labor impact'], ['Climate & Energy', 'Environment', 'presentation', 'Nuclear, solar & grid decarbonization'],
    ['Behavioral Finance', 'Finance', 'casual', 'Cognitive biases and economic nudges'], ['Biotech & CRISPR', 'Science', 'debate', 'Gene editing and bioethics'],
    ['Job Interview Pitch', 'Interview', 'interview', 'Elevator pitch & behavioral questions'], ['Impromptu Random', 'Random', 'impromptu', 'Spontaneous 2-minute topic challenge'],
  ];
  const handleLaunchTopic = (category: string) => setCurrentTopic(allTopics.find((topic) => topic.category === category) || allTopics[0]);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 font-sans sm:px-8">
      <section className="relative min-h-[560px] overflow-hidden border-2 border-[#526074] bg-[#071015] shadow-[8px_8px_0_#000]">
        <div className="absolute inset-0 opacity-90"><AsciiCanvas params={dashboardAscii} /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,21,.98)_0%,rgba(7,16,21,.74)_42%,rgba(7,16,21,.08)_100%)]" />
        <div className="relative flex min-h-[560px] flex-col justify-between p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6 text-[#cbd5e1]"><div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em]"><span className="h-2 w-2 animate-pulse bg-[#66d9c9]" /> VoxCoach / command center</div><span className="hidden border border-[#526074] px-3 py-1 text-[10px] font-mono uppercase tracking-widest sm:block">Live analysis // 04</span></div>
          <div className="max-w-2xl"><p className="mb-4 text-xs font-mono uppercase tracking-[0.24em] text-[#66d9c9]">Speaker profile / intermediate</p><h1 className="max-w-xl text-5xl font-black leading-[0.9] tracking-tight text-white sm:text-8xl">Make your voice <span className="text-[#ffdc60]">impossible</span> to miss.</h1><p className="mt-6 max-w-lg text-sm leading-7 text-[#cbd5e1]">Welcome back, {user.name.split(' ')[0]}. Your delivery signal is stabilizing. Continue the session and turn the next idea into a clear argument.</p><Link to="/topics" className="mt-8 inline-flex items-center gap-3 border-2 border-[#ffdc60] bg-[#ffdc60] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#071015] shadow-[4px_4px_0_#000]"><Radio className="h-4 w-4" /> Launch speech session <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div className="grid max-w-3xl grid-cols-2 gap-px border border-[#526074] bg-[#526074] sm:grid-cols-4">{[['Score', '81', '/100'], ['Cadence', '139', 'WPM'], ['Fillers', '1.8', '/min'], ['Pitch sigma', '28.4', 'Hz']].map(([label, value, unit]) => <div key={label} className="bg-[#071015]/90 p-4 backdrop-blur-sm"><p className="text-[10px] font-mono uppercase tracking-widest text-[#8d9aad]">{label}</p><p className="mt-2 text-2xl font-black text-white">{value}<span className="ml-1 text-[10px] font-mono font-normal text-[#66d9c9]">{unit}</span></p></div>)}</div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]"><div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000] sm:p-8"><div className="mb-8 flex items-center justify-between border-b-2 border-black pb-4"><div className="flex items-center gap-2"><Target className="h-5 w-5" /><h2 className="text-lg font-black uppercase tracking-tight">Signal focus</h2></div><span className="text-[10px] font-mono uppercase text-[#147f76]">Priority 01</span></div><div className="flex items-start gap-4"><div className="mt-1 bg-[#ff7b7b] p-2"><Volume2 className="h-5 w-5" /></div><div><p className="text-xl font-black">Anchor the argument transitions.</p><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">Eliminate rising terminal inflections between 00:42-00:48. Your pacing is already in the ideal range; now give each conclusion somewhere to land.</p></div></div><div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4 text-xs font-mono"><span className="text-zinc-500">3 sessions until next milestone</span><Link to="/results" className="font-bold text-[#147f76]">Open latest report <ArrowUpRight className="inline h-3 w-3" /></Link></div></div><div className="border-2 border-black bg-[#66d9c9] p-6 shadow-[5px_5px_0_#000] sm:p-8"><Activity className="h-6 w-6" /><p className="mt-10 text-6xl font-black leading-none">05</p><p className="mt-2 text-xs font-mono font-bold uppercase tracking-widest">sessions completed</p><div className="mt-8 h-2 bg-black/15"><div className="h-full w-[72%] bg-black" /></div><p className="mt-3 text-xs font-bold">3-day practice streak / 72% weekly goal</p></div></section>

      <section className="space-y-6"><div className="flex items-end justify-between border-b-2 border-black pb-3"><div className="flex items-center gap-2"><Compass className="h-5 w-5" /><h2 className="text-xl font-black uppercase tracking-tight">Practice arena</h2></div><Link to="/topics" className="text-xs font-mono font-bold text-[#147f76]">View all topics <ArrowUpRight className="inline h-3 w-3" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{quickCategories.map(([label, category, mode, description]) => <Link key={category} to="/prep" onClick={() => handleLaunchTopic(category)} className="group border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000]"><div className="flex items-start justify-between gap-3"><h3 className="font-black group-hover:text-[#147f76]">{label}</h3><span className="bg-[#ffdc60] px-2 py-1 text-[9px] font-mono font-bold uppercase">{mode}</span></div><p className="mt-5 min-h-10 text-xs leading-5 text-zinc-600">{description}</p><div className="mt-5 border-t border-black pt-3 text-[10px] font-mono font-bold uppercase">5 min prep <span className="float-right">Launch →</span></div></Link>)}</div></section>

      <section className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000] sm:p-8"><div className="mb-6 flex items-center justify-between border-b-2 border-black pb-4"><div className="flex items-center gap-2"><Clock className="h-5 w-5" /><h2 className="text-xl font-black uppercase tracking-tight">Recent signal</h2></div><Link to="/progress" className="text-xs font-mono font-bold text-[#147f76]">Longitudinal history <ArrowUpRight className="inline h-3 w-3" /></Link></div><div className="space-y-3">{sessionsHistory.slice(0, 4).map((session) => <div key={session.id} className="flex flex-col justify-between gap-3 border border-zinc-300 bg-[#f7f4eb] p-4 sm:flex-row sm:items-center"><div><p className="font-black">{session.topicTitle}</p><p className="mt-1 text-[10px] font-mono uppercase text-zinc-500">{session.date} / {Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s / {session.wpm} WPM</p></div><div className="flex items-center justify-between gap-5 sm:justify-end"><span className="font-mono font-black">{session.overallScore}<small className="ml-1 text-[10px] font-normal text-zinc-500">SCORE</small></span><Link to="/results" className="bg-[#ffdc60] px-3 py-2 text-[10px] font-black uppercase">View report</Link></div></div>)}</div></section>
    </div>
  );
};
