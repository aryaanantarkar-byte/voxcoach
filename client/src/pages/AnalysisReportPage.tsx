import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { ScoreGauge } from '../components/feedback/ScoreGauge';
import { CategoryBreakdown } from '../components/feedback/CategoryBreakdown';
import { TranscriptViewer } from '../components/feedback/TranscriptViewer';
import { KnowledgeExplorer } from '../components/feedback/KnowledgeExplorer';
import { PitchChart } from '../components/charts/PitchChart';
import { PaceChart } from '../components/charts/PaceChart';
import { PauseChart } from '../components/charts/PauseChart';
import { FillerChart } from '../components/charts/FillerChart';
import {
  Sparkles,
  Volume2,
  Gauge,
  PauseCircle,
  Ban,
  MessageSquareQuote,
  BrainCircuit,
  Compass,
  ArrowRight,
  RotateCcw,
  Activity,
} from 'lucide-react';

export const AnalysisReportPage: React.FC = () => {
  const { currentSession } = useSession();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pitch' | 'pace' | 'pauses' | 'fillers' | 'transcript' | 'content' | 'knowledge'
  >('overview');

  if (!currentSession) {
    return (
      <div className="text-center py-24 space-y-4 font-sans">
        <h2 className="text-xl font-bold text-white">No Analysis Report Available</h2>
        <p className="text-sm text-zinc-400">Complete a practice speech session to generate your comprehensive report.</p>
        <Link to="/topics" className="inline-block px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold rounded-lg text-xs">
          Start a Speech Session
        </Link>
      </div>
    );
  }

  const { topic, acoustics, contentAnalysis, knowledgeExploration, scores, transcript, nextRecommendedExercise } = currentSession;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'pitch', label: 'Voice & Pitch', icon: Volume2 },
    { id: 'pace', label: 'Speaking Pace', icon: Gauge },
    { id: 'pauses', label: 'Pauses & Rhythm', icon: PauseCircle },
    { id: 'fillers', label: 'Filler Words', icon: Ban },
    { id: 'transcript', label: 'Transcript', icon: MessageSquareQuote },
    { id: 'content', label: 'AI Reasoning', icon: BrainCircuit },
    { id: 'knowledge', label: 'Knowledge Loop', icon: Compass },
  ];

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* 1. Report Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-semibold">
              {topic.category} • {topic.difficulty}
            </span>
            <span className="text-xs font-mono text-zinc-400">Duration: {Math.floor(currentSession.speakingDurationSeconds / 60)}m {currentSession.speakingDurationSeconds % 60}s</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Speech Analysis: {topic.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/15"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Another Topic</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Executive Score Gauge */}
      <ScoreGauge score={scores.overall} />

      {/* 3. Interactive Multi-Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Panels Content */}
      <div className="space-y-6">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <CategoryBreakdown scores={scores.breakdown} />

            {/* Next Recommended Exercise Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-950 border border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono uppercase font-semibold text-emerald-300">
                    Next Recommended Targeted Exercise
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{nextRecommendedExercise.title}</h3>
                <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                  {nextRecommendedExercise.objective}
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Target: {nextRecommendedExercise.targetMetric}
                </div>
              </div>

              <Link
                to="/prep"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all flex-shrink-0"
              >
                <span>Launch Exercise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Voice & Pitch */}
        {activeTab === 'pitch' && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Fundamental Frequency (F0) Pitch Dynamics</h3>
                <p className="text-xs text-zinc-400">Tracks inflection, vocal range, and expressive modulation</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Avg: <strong className="text-white">{Math.round(acoustics.pitch.averageHz)} Hz</strong></span>
                <span>Min/Max: <strong className="text-white">{Math.round(acoustics.pitch.minHz)} - {Math.round(acoustics.pitch.maxHz)} Hz</strong></span>
                <span>Variation (σ): <strong className="text-emerald-400">±{acoustics.pitch.standardDeviationHz.toFixed(1)} Hz</strong></span>
              </div>
            </div>

            <PitchChart data={acoustics.pitch.timeSeries} averageHz={acoustics.pitch.averageHz} />

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <span className="text-emerald-400 font-semibold block mb-1">Coaching Pitch Delivery Guidance:</span>
              {acoustics.pitch.coachingFeedback}
            </div>
          </div>
        )}

        {/* Tab 3: Speaking Pace */}
        {activeTab === 'pace' && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Words Per Minute (WPM) Cadence</h3>
                <p className="text-xs text-zinc-400">Rolling 15-second moving window cadence analysis</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Overall Pace: <strong className="text-emerald-400">{Math.round(acoustics.pace.averageWpm)} WPM</strong></span>
                <span>Target Band: <strong className="text-white">130 - 160 WPM</strong></span>
              </div>
            </div>

            <PaceChart data={acoustics.pace.timeSeries} averageWpm={acoustics.pace.averageWpm} />

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <span className="text-cyan-400 font-semibold block mb-1">Pace & Cadence Coaching Feedback:</span>
              {acoustics.pace.coachingFeedback}
            </div>
          </div>
        )}

        {/* Tab 4: Pauses */}
        {activeTab === 'pauses' && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Silence & Pause Distribution</h3>
                <p className="text-xs text-zinc-400">Distinguishing deliberate rhetorical pauses from hesitation silences</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Deliberate: <strong className="text-emerald-400">{acoustics.pauses.deliberatePausesCount}</strong></span>
                <span>Hesitation: <strong className="text-amber-400">{acoustics.pauses.hesitationPausesCount}</strong></span>
                <span>Avg Pause: <strong className="text-white">{acoustics.pauses.averageDurationSec.toFixed(1)}s</strong></span>
              </div>
            </div>

            <PauseChart
              pauseEvents={acoustics.pauses.pauseEvents}
              totalDurationSec={currentSession.speakingDurationSeconds}
            />

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <span className="text-emerald-400 font-semibold block mb-1">Pause & Rhythm Coaching Feedback:</span>
              {acoustics.pauses.coachingFeedback}
            </div>
          </div>
        )}

        {/* Tab 5: Filler Words */}
        {activeTab === 'fillers' && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Filler Word Frequency</h3>
                <p className="text-xs text-zinc-400">Crutch word identification and speech density</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Total: <strong className="text-rose-400">{acoustics.fillerWords.totalCount}</strong></span>
                <span>Rate: <strong className="text-white">{acoustics.fillerWords.ratePerMinute} / min</strong></span>
                <span>Top Crutch: <strong className="text-rose-400">"{acoustics.fillerWords.mostFrequent}"</strong></span>
              </div>
            </div>

            <FillerChart breakdown={acoustics.fillerWords.breakdown} />

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <span className="text-rose-400 font-semibold block mb-1">Filler Word Remediation Tip:</span>
              {acoustics.fillerWords.coachingFeedback}
            </div>
          </div>
        )}

        {/* Tab 6: Transcript */}
        {activeTab === 'transcript' && (
          <div className="animate-in fade-in duration-150">
            <TranscriptViewer fullText={transcript.fullText} segments={transcript.segments} />
          </div>
        )}

        {/* Tab 7: AI Reasoning & Content */}
        {activeTab === 'content' && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">AI Content, Reasoning & Vocabulary Critique</h3>
              </div>
              <span className="text-xs font-mono text-purple-400">Structured Gemini Assessment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Structure */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase">Speech Architecture</span>
                  <span className="text-emerald-400 font-bold">{contentAnalysis.structure.score}/100</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{contentAnalysis.structure.feedback}</p>
              </div>

              {/* Clarity */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase">Clarity & Readability</span>
                  <span className="text-cyan-400 font-bold">{contentAnalysis.clarity.score}/100</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{contentAnalysis.clarity.feedback}</p>
              </div>

              {/* Vocabulary */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase">Vocabulary Richness</span>
                  <span className="text-amber-400 font-bold">{contentAnalysis.vocabulary.score}/100</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{contentAnalysis.vocabulary.feedback}</p>
                <div className="text-[11px] font-mono text-zinc-500 pt-1">
                  Advanced: {contentAnalysis.vocabulary.advancedTermsUsed.join(', ')}
                </div>
              </div>

              {/* Reasoning */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold uppercase">Reasoning Quality</span>
                  <span className="text-purple-400 font-bold">{contentAnalysis.relevanceAndReasoning.score}/100</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{contentAnalysis.relevanceAndReasoning.reasoningDepthFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Knowledge Expansion Loop */}
        {activeTab === 'knowledge' && (
          <div className="animate-in fade-in duration-150">
            <KnowledgeExplorer knowledge={knowledgeExploration} />
          </div>
        )}
      </div>
    </div>
  );
};
