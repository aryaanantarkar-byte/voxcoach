import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { Activity, ArrowUpRight, Clock, Compass, Target, Volume2 } from 'lucide-react';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';

export const DashboardPage: React.FC = () => {
  const { sessionsHistory, allTopics, setCurrentTopic } = useSession();
  const quickCategories = [
    ['AI & Automation', 'AI', 'debate', 'Technological ethics and labor impact'], ['Climate & Energy', 'Environment', 'presentation', 'Nuclear, solar & grid decarbonization'],
    ['Behavioral Finance', 'Finance', 'casual', 'Cognitive biases and economic nudges'], ['Biotech & CRISPR', 'Science', 'debate', 'Gene editing and bioethics'],
    ['Job Interview Pitch', 'Interview', 'interview', 'Elevator pitch & behavioral questions'], ['Impromptu Random', 'Random', 'impromptu', 'Spontaneous 2-minute topic challenge'],
  ];
  const handleLaunchTopic = (category: string) => setCurrentTopic(allTopics.find((topic) => topic.category === category) || allTopics[0]);

  return (
    <div className="space-y-12 font-sans">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
        posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
        bgImageSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS"
        title="Make Your Voice Impossible To Miss"
        date="Daily delivery rehearsal"
        scrollToExpand="Scroll to expand your practice signal"
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-8">

      <section className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]"><div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000] sm:p-8"><div className="mb-8 flex items-center justify-between border-b-2 border-black pb-4"><div className="flex items-center gap-2"><Target className="h-5 w-5" /><h2 className="text-lg font-black uppercase tracking-tight">Signal focus</h2></div><span className="text-[10px] font-mono uppercase text-[#147f76]">Priority 01</span></div><div className="flex items-start gap-4"><div className="mt-1 bg-[#ff7b7b] p-2"><Volume2 className="h-5 w-5" /></div><div><p className="text-xl font-black">Anchor the argument transitions.</p><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">Eliminate rising terminal inflections between 00:42-00:48. Your pacing is already in the ideal range; now give each conclusion somewhere to land.</p></div></div><div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4 text-xs font-mono"><span className="text-zinc-500">3 sessions until next milestone</span><Link to="/results" className="font-bold text-[#147f76]">Open latest report <ArrowUpRight className="inline h-3 w-3" /></Link></div></div><div className="border-2 border-black bg-[#66d9c9] p-6 shadow-[5px_5px_0_#000] sm:p-8"><Activity className="h-6 w-6" /><p className="mt-10 text-6xl font-black leading-none">05</p><p className="mt-2 text-xs font-mono font-bold uppercase tracking-widest">sessions completed</p><div className="mt-8 h-2 bg-black/15"><div className="h-full w-[72%] bg-black" /></div><p className="mt-3 text-xs font-bold">3-day practice streak / 72% weekly goal</p></div></section>

      <section className="space-y-6"><div className="flex items-end justify-between border-b-2 border-black pb-3"><div className="flex items-center gap-2"><Compass className="h-5 w-5" /><h2 className="text-xl font-black uppercase tracking-tight">Practice arena</h2></div><Link to="/topics" className="text-xs font-mono font-bold text-[#147f76]">View all topics <ArrowUpRight className="inline h-3 w-3" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{quickCategories.map(([label, category, mode, description]) => <Link key={category} to="/prep" onClick={() => handleLaunchTopic(category)} className="group border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000]"><div className="flex items-start justify-between gap-3"><h3 className="font-black group-hover:text-[#147f76]">{label}</h3><span className="bg-[#ffdc60] px-2 py-1 text-[9px] font-mono font-bold uppercase">{mode}</span></div><p className="mt-5 min-h-10 text-xs leading-5 text-zinc-600">{description}</p><div className="mt-5 border-t border-black pt-3 text-[10px] font-mono font-bold uppercase">5 min prep <span className="float-right">Launch →</span></div></Link>)}</div></section>

      <section className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000] sm:p-8"><div className="mb-6 flex items-center justify-between border-b-2 border-black pb-4"><div className="flex items-center gap-2"><Clock className="h-5 w-5" /><h2 className="text-xl font-black uppercase tracking-tight">Recent signal</h2></div><Link to="/progress" className="text-xs font-mono font-bold text-[#147f76]">Longitudinal history <ArrowUpRight className="inline h-3 w-3" /></Link></div><div className="space-y-3">{sessionsHistory.slice(0, 4).map((session) => <div key={session.id} className="flex flex-col justify-between gap-3 border border-zinc-300 bg-[#f7f4eb] p-4 sm:flex-row sm:items-center"><div><p className="font-black">{session.topicTitle}</p><p className="mt-1 text-[10px] font-mono uppercase text-zinc-500">{session.date} / {Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s / {session.wpm} WPM</p></div><div className="flex items-center justify-between gap-5 sm:justify-end"><span className="font-mono font-black">{session.overallScore}<small className="ml-1 text-[10px] font-normal text-zinc-500">SCORE</small></span><Link to="/results" className="bg-[#ffdc60] px-3 py-2 text-[10px] font-black uppercase">View report</Link></div></div>)}</div></section>
      </div>
    </div>
  );
};
