import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Radio,
  BookOpen,
  HelpCircle,
  Key,
  PenTool,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

export const PreparationPage: React.FC = () => {
  const { currentTopic, prepNotes, setPrepNotes, prepDurationSeconds, setPrepDurationSeconds } = useSession();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<number>(prepDurationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Sync when user changes prep duration buttons
  const handleSetDuration = (seconds: number) => {
    setPrepDurationSeconds(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (!currentTopic) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-xl font-bold text-white">No Topic Selected</h2>
        <p className="text-sm text-zinc-400">Please choose a topic before entering preparation mode.</p>
        <Link to="/topics" className="inline-block px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold rounded-lg text-xs">
          Browse Topics
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-semibold">
              {currentTopic.category} • {currentTopic.difficulty}
            </span>
            <span className="text-xs font-mono text-zinc-400">Mode: {currentTopic.mode}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {currentTopic.title}
          </h1>
        </div>

        <button
          onClick={() => navigate('/practice')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 flex-shrink-0"
        >
          <Radio className="w-4 h-4" />
          <span>Enter Practice Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Main Two-Column Layout (Research Materials vs Timer & Notes Scratchpad) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Research Briefing & Key Concepts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Topic Brief */}
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Topic Context & Foundation</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {currentTopic.explanation}
            </p>
          </div>

          {/* Key Concepts */}
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>Core Concepts To Integrate</span>
            </div>
            <div className="space-y-2">
              {currentTopic.keyConcepts.map((concept, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">0{i + 1}.</span>
                  <span className="font-medium">{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Research Thought Prompts */}
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Probing Thought Prompts</span>
            </div>
            <div className="space-y-2.5">
              {currentTopic.suggestedResearchQuestions.map((q, i) => (
                <div key={i} className="text-xs text-zinc-400 italic bg-zinc-950/60 p-3 rounded-lg border border-zinc-900 leading-relaxed">
                  "{q}"
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span className="truncate">Keywords: {currentTopic.usefulKeywords.join(', ')}</span>
          </div>
        </div>

        {/* Right Column: Timed Preparation & Speech Outline Scratchpad (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preparation Timer Card */}
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-zinc-400 block">Preparation Countdown</span>
                <span className="text-3xl font-extrabold font-mono text-white tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Timer Controls & Duration Selectors */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                {[
                  { label: '2 min', val: 120 },
                  { label: '5 min', val: 300 },
                  { label: '10 min', val: 600 },
                ].map((btn) => (
                  <button
                    key={btn.val}
                    onClick={() => handleSetDuration(btn.val)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                      prepDurationSeconds === btn.val
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`p-2 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all ${
                    isRunning
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                      : 'bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause' : 'Start Timer'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(prepDurationSeconds);
                  }}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Speech Structure Notes Scratchpad */}
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Your Speech Outline & Talking Points</h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">Auto-saved to session</span>
            </div>

            {/* Outline structure helper pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400">
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">1. Hook & Opening</span>
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">2. Core Claim / Thesis</span>
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">3. Primary Evidence</span>
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">4. Concrete Example</span>
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">5. Counter-argument</span>
              <span className="p-1.5 rounded bg-zinc-950 border border-zinc-900">6. Strong Takeaway</span>
            </div>

            {/* Textarea */}
            <textarea
              value={prepNotes}
              onChange={(e) => setPrepNotes(e.target.value)}
              placeholder="Draft your bulleted outline here...

Opening:
- Compelling hook or surprising statistic
- Clear statement of purpose

Body:
- Key Point 1: ...
- Concrete real-world example: ...
- Counterargument and rebuttal: ...

Conclusion:
- Summary of core argument
- Memorable call to action or final principle"
              rows={12}
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 font-mono focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Formulate your own logical flow (AI will analyze speech, not just read notes).
              </span>
              <button
                onClick={() => navigate('/practice')}
                className="text-emerald-400 hover:underline font-mono font-semibold flex items-center gap-1"
              >
                Proceed to Stage →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
