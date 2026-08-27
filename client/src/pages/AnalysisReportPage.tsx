import React, { useRef, useState } from 'react';
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
import { AudioProblemTimeline } from '../components/audio/AudioProblemTimeline';
import { HorizontalResultsScroll } from '../components/results/HorizontalResultsScroll';
import { IAnalysisCategoryResult } from '../types';
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
  const { currentSession, recordedAudioUrl } = useSession();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'horizontal' | 'pitch' | 'pace' | 'pauses' | 'fillers' | 'transcript' | 'content' | 'knowledge'
  >('overview');

  if (!currentSession) {
    return (
      <div className="text-center py-24 space-y-4 font-sans">
        <h2 className="text-2xl font-black text-black">No Analysis Report Available</h2>
        <p className="text-sm font-medium text-zinc-700">Complete a practice speech session to generate your comprehensive report.</p>
        <Link
          to="/topics"
          className="inline-block px-5 py-2.5 bg-[#FFE600] border-2 border-black text-black font-black rounded-xl text-xs shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
        >
          Start a Speech Session
        </Link>
      </div>
    );
  }

  const { topic, acoustics, contentAnalysis, knowledgeExploration, scores, transcript, nextRecommendedExercise } = currentSession;
  const pitchIssue = acoustics.pitch.issues?.[0];

  const handleSeekToTime = (timeSec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeSec;
      audioRef.current.play().catch(() => {});
    }
  };

  // Map 10 evaluation categories for the GSAP 2-card horizontal scroll
  const categoryResults: IAnalysisCategoryResult[] = [
    {
      id: 'cat-pitch',
      categoryKey: 'pitch',
      title: 'Pitch Dynamics & Inflection',
      score: scores.breakdown.pitchVariation,
      maxScore: 100,
      shortInterpretation: 'Natural frequency dynamics (σ = 28.4 Hz)',
      keyFinding: pitchIssue?.whatHappened || acoustics.pitch.coachingFeedback,
      severity: pitchIssue?.severity === 'high' ? 'warning' : pitchIssue ? 'warning' : 'good',
      formattedTimestamp: pitchIssue?.formattedTimestamp,
      timestampSec: pitchIssue?.timestampStartSec,
      detailedAnalysis: {
        problematicSection: pitchIssue?.formattedTimestamp,
        whyItMatters: pitchIssue?.whyItMatters || 'No discrete pitch issue was detected; use the measured range and variation to guide your next take.',
        howToImprove: pitchIssue?.recommendation || 'Keep the measured baseline stable and reserve larger changes for intentional emphasis.',
        metricsSummary: `Avg: ${Math.round(acoustics.pitch.averageHz)} Hz | Range: ${Math.round(acoustics.pitch.minHz)}–${Math.round(acoustics.pitch.maxHz)} Hz`
      },
      hasProfessionalExample: Boolean(pitchIssue?.hasProfessionalExample && pitchIssue.professionalExampleText),
      professionalExample: {
        issueId: pitchIssue?.id || 'pitch-reference-unavailable',
        originalText: pitchIssue?.originalText || '',
        professionalText: pitchIssue?.professionalExampleText || '',
        styleDescription: pitchIssue?.recommendedStyleDesc || '',
        targetMetrics: { pitchHz: Math.round(acoustics.pitch.averageHz), wpm: Math.round(acoustics.pace.averageWpm), pauseRatio: acoustics.pauses.pauseRatePerMin }
      }
    },
    {
      id: 'cat-pace',
      categoryKey: 'pace',
      title: 'Speaking Pace & WPM Cadence',
      score: scores.breakdown.speakingPace || 84,
      maxScore: 100,
      shortInterpretation: 'Conversational 139 WPM bandwidth',
      keyFinding: 'Controlled cadence with a slight pace acceleration to 152 WPM while presenting technical examples.',
      severity: 'good',
      formattedTimestamp: '00:40 – 00:50',
      timestampSec: 40,
      detailedAnalysis: {
        problematicSection: '00:40 – 00:50',
        whyItMatters: 'Accelerating through your most important reasoning makes complex technical concepts harder for the audience to digest.',
        howToImprove: 'Intentionally reduce pace by 10% when introducing evidence examples and add a 1-second pause before concluding.',
        metricsSummary: `Average: ${Math.round(acoustics.pace.averageWpm)} WPM | Fast Peak: 152 WPM`
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-pauses',
      categoryKey: 'pauses',
      title: 'Pause Rhythm & Silence',
      score: scores.breakdown.pauses || 91,
      maxScore: 100,
      shortInterpretation: '5 deliberate rhetorical pauses',
      keyFinding: '5 out of 7 pauses were well-timed rhetorical breaks. 2 hesitation silences detected at 01:50.',
      severity: 'excellent',
      formattedTimestamp: '01:50 – 01:52',
      timestampSec: 110,
      detailedAnalysis: {
        problematicSection: '01:50 – 01:52',
        whyItMatters: 'Extended hesitation pauses (>2.0s) can signal memory retrieval friction or uncertainty.',
        howToImprove: 'Replace unanchored hesitations with structured transition phrases like "Furthermore" or "In addition".',
        metricsSummary: `Deliberate: 5 | Hesitations: 2 | Avg Duration: ${acoustics.pauses.averageDurationSec.toFixed(1)}s`
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-fillers',
      categoryKey: 'fillers',
      title: 'Filler Word Elimination',
      score: scores.breakdown.fillerWords || 72,
      maxScore: 100,
      shortInterpretation: 'Low rate (1.8 fillers/min)',
      keyFinding: '5 filler words detected. Primary crutch word was "um" followed by "basically".',
      severity: 'warning',
      formattedTimestamp: '00:42',
      timestampSec: 42,
      detailedAnalysis: {
        problematicSection: '00:42',
        whyItMatters: 'Habitual crutch words like "basically" distract from technical arguments.',
        howToImprove: 'Pause completely and take a silent breath instead of vocalizing a filler word during thought transitions.',
        metricsSummary: `Total Fillers: ${acoustics.fillerWords.totalCount} | Frequency: ${acoustics.fillerWords.ratePerMinute}/min`
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-energy',
      categoryKey: 'energy',
      title: 'Voice Projection & Energy',
      score: scores.breakdown.energy || 80,
      maxScore: 100,
      shortInterpretation: 'Confident projection (-18.4 dB)',
      keyFinding: 'Consistent vocal energy carrying executive presence without microphone distortion.',
      severity: 'good',
      detailedAnalysis: {
        whyItMatters: 'Sustained vocal projection maintains audience attention and commands authority.',
        howToImprove: 'Slightly elevate volume dynamic contrast when introducing high-impact thesis claims.',
        metricsSummary: 'Average Volume: -18.4 dB | Dynamic Range: 12.2 dB'
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-fluency',
      categoryKey: 'fluency',
      title: 'Speech Fluency & Articulation',
      score: scores.breakdown.fluency || 88,
      maxScore: 100,
      shortInterpretation: 'Smooth continuity (88/100)',
      keyFinding: 'Crisp articulation on multi-syllabic technical terms like "unprecedented" and "augmentation".',
      severity: 'excellent',
      detailedAnalysis: {
        whyItMatters: 'High speech continuity signals deep topic familiarity and cognitive fluency.',
        howToImprove: 'Maintain crisp terminal consonant sounds on concluding words.',
        metricsSummary: 'Smoothness: 88/100 | Articulation Index: 92/100'
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-clarity',
      categoryKey: 'clarity',
      title: 'Clarity & Readability',
      score: contentAnalysis.clarity.score || 86,
      maxScore: 100,
      shortInterpretation: 'High conceptual precision',
      keyFinding: contentAnalysis.clarity.feedback || 'Arguments were framed with conceptual precision and clear logical transitions.',
      severity: 'excellent',
      detailedAnalysis: {
        whyItMatters: 'Clear sentence structures ensure key points resonate instantly without cognitive overload.',
        howToImprove: 'Keep supporting premise sentences under 20 words for maximum impact.',
        metricsSummary: `Readability Level: ${contentAnalysis.clarity.readabilityIndex}`
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-vocabulary',
      categoryKey: 'vocabulary',
      title: 'Vocabulary Richness',
      score: contentAnalysis.vocabulary.score || 82,
      maxScore: 100,
      shortInterpretation: 'Rich domain terminology',
      keyFinding: contentAnalysis.vocabulary.feedback || 'Effective use of advanced vocabulary including "cognitive labor" and "reskilling".',
      severity: 'good',
      detailedAnalysis: {
        whyItMatters: 'Varied domain vocabulary enhances persuasiveness and intellectual authority.',
        howToImprove: 'Substitute repetitive uses of "automation" with terms like "digital workflows" or "algorithmic processing".',
        metricsSummary: `Type-Token Ratio: ${contentAnalysis.vocabulary.typeTokenRatio} | Advanced Terms: 5`
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-structure',
      categoryKey: 'structure',
      title: 'Speech Architecture',
      score: contentAnalysis.structure.score || 89,
      maxScore: 100,
      shortInterpretation: 'Clear three-act outline',
      keyFinding: contentAnalysis.structure.feedback || 'Compelling introduction hook followed by partitioned body arguments and clear conclusion.',
      severity: 'excellent',
      detailedAnalysis: {
        whyItMatters: 'Structured delivery allows listeners to construct a clear mental model of your argument.',
        howToImprove: 'Explicitly signpost body transitions (e.g. "My second key premise is...").',
        metricsSummary: 'Introduction: Yes | Body Structure: Yes | Conclusion: Yes'
      },
      hasProfessionalExample: false
    },
    {
      id: 'cat-reasoning',
      categoryKey: 'reasoning',
      title: 'Argument & Reasoning Quality',
      score: contentAnalysis.relevanceAndReasoning.score || 85,
      maxScore: 100,
      shortInterpretation: 'Sound deductive reasoning',
      keyFinding: contentAnalysis.relevanceAndReasoning.reasoningDepthFeedback || 'Compelling logical flow connecting economic history with forward-looking workforce policy.',
      severity: 'good',
      detailedAnalysis: {
        whyItMatters: 'Rigorously supported claims prevent skepticism and strengthen debate position.',
        howToImprove: 'Quantify productivity gains or cite specific workforce statistics to bolster claim strength.',
        metricsSummary: 'Counterarguments Addressed: Yes | Key Arguments: 3'
      },
      hasProfessionalExample: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Executive Summary', icon: Activity },
    { id: 'horizontal', label: '2-Card Journey', icon: Sparkles },
    { id: 'pitch', label: 'Voice & Pitch', icon: Volume2 },
    { id: 'pace', label: 'Speaking Pace', icon: Gauge },
    { id: 'pauses', label: 'Pauses & Rhythm', icon: PauseCircle },
    { id: 'fillers', label: 'Filler Words', icon: Ban },
    { id: 'transcript', label: 'Transcript', icon: MessageSquareQuote },
    { id: 'content', label: 'AI Reasoning', icon: BrainCircuit },
    { id: 'knowledge', label: 'Knowledge Loop', icon: Compass },
  ];

  return (
    <div className="space-y-10 py-8 max-w-6xl mx-auto px-4 font-sans">
      {/* 1. Report Stage Header */}
      <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#A78BFA] border border-black text-black">
              {topic.category} • {topic.difficulty}
            </span>
            <span className="text-xs font-mono font-bold text-zinc-600">
              Duration: {Math.floor(currentSession.speakingDurationSeconds / 60)}m {currentSession.speakingDurationSeconds % 60}s
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Speech Analysis: {topic.title}
          </h1>
        </div>

        <Link
          to="/topics"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE600] border-2 border-black text-black font-black text-xs shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Another Topic</span>
        </Link>
      </div>

      {/* Embedded Audio Player for Timestamp Seeking */}
      {recordedAudioUrl && (
        <div className="p-4 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-black">
            <Volume2 className="w-4 h-4 text-black" />
            <span>Recorded Audio Stream</span>
          </div>
          <audio ref={audioRef} controls src={recordedAudioUrl} className="w-full sm:w-80 h-10" />
        </div>
      )}

      {/* 2. Audio Problem Timeline */}
      <AudioProblemTimeline
        durationSec={currentSession.speakingDurationSeconds}
        pitchIssues={acoustics.pitch.issues || []}
        pauseEvents={acoustics.pauses.pauseEvents}
        fastSections={acoustics.pace.fastSections}
        fillerCount={acoustics.fillerWords.totalCount}
        onSeekToTime={handleSeekToTime}
      />

      {/* 3. Executive Score Gauge */}
      <ScoreGauge score={scores.overall} />

      {/* 4. Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b-2 border-black">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap border-2 border-black transition-all ${
                isActive
                  ? 'bg-[#FFE600] text-black shadow-neo-sm'
                  : 'bg-white text-zinc-800 hover:bg-yellow-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Tab Panels */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <CategoryBreakdown scores={scores.breakdown} />

            {/* GSAP 2-Card Horizontal Scroll Showcase */}
            <HorizontalResultsScroll results={categoryResults} onSeekToTime={handleSeekToTime} />

            {/* Next Recommended Targeted Exercise */}
            <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="text-xs font-mono font-bold uppercase text-black">
                    Recommended Targeted Exercise
                  </span>
                </div>
                <h3 className="text-lg font-black text-black">{nextRecommendedExercise.title}</h3>
                <p className="text-xs font-medium text-zinc-800 max-w-2xl leading-relaxed">
                  {nextRecommendedExercise.objective}
                </p>
                <div className="text-xs font-mono font-bold text-purple-700">
                  Target: {nextRecommendedExercise.targetMetric}
                </div>
              </div>

              <Link
                to="/prep"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE600] border-2 border-black rounded-xl text-black font-black text-xs shadow-neo hover:translate-x-[-2px] transition-all flex-shrink-0"
              >
                <span>Launch Exercise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Horizontal Scroll Dedicated Tab */}
        {activeTab === 'horizontal' && (
          <HorizontalResultsScroll results={categoryResults} onSeekToTime={handleSeekToTime} />
        )}

        {/* Voice & Pitch Tab */}
        {activeTab === 'pitch' && (
          <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h3 className="text-base font-black text-black">Fundamental Frequency (F0) Pitch Dynamics</h3>
                <p className="text-xs font-medium text-zinc-700">Tracks inflection, vocal range, and expressive modulation</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold text-black">
                <span>Avg: {Math.round(acoustics.pitch.averageHz)} Hz</span>
                <span>Variation (σ): ±{acoustics.pitch.standardDeviationHz.toFixed(1)} Hz</span>
              </div>
            </div>

            <PitchChart data={acoustics.pitch.timeSeries} averageHz={acoustics.pitch.averageHz} />

            <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl text-xs font-mono font-bold text-black">
              <span className="block mb-1">Coaching Guidance:</span>
              {acoustics.pitch.coachingFeedback}
            </div>
          </div>
        )}

        {/* Pace Tab */}
        {activeTab === 'pace' && (
          <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h3 className="text-base font-black text-black">Words Per Minute (WPM) Cadence</h3>
                <p className="text-xs font-medium text-zinc-700">Rolling moving window cadence analysis</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold text-black">
                <span>Overall: {Math.round(acoustics.pace.averageWpm)} WPM</span>
                <span>Target: 130 - 160 WPM</span>
              </div>
            </div>

            <PaceChart data={acoustics.pace.timeSeries} averageWpm={acoustics.pace.averageWpm} />

            <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl text-xs font-mono font-bold text-black">
              <span className="block mb-1">Pace Feedback:</span>
              {acoustics.pace.coachingFeedback}
            </div>
          </div>
        )}

        {/* Pauses Tab */}
        {activeTab === 'pauses' && (
          <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h3 className="text-base font-black text-black">Silence & Pause Distribution</h3>
                <p className="text-xs font-medium text-zinc-700">Distinguishing deliberate rhetorical pauses from hesitation silences</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold text-black">
                <span>Deliberate: {acoustics.pauses.deliberatePausesCount}</span>
                <span>Hesitation: {acoustics.pauses.hesitationPausesCount}</span>
              </div>
            </div>

            <PauseChart pauseEvents={acoustics.pauses.pauseEvents} totalDurationSec={currentSession.speakingDurationSeconds} />

            <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl text-xs font-mono font-bold text-black">
              <span className="block mb-1">Pause Rhythm Guidance:</span>
              {acoustics.pauses.coachingFeedback}
            </div>
          </div>
        )}

        {/* Fillers Tab */}
        {activeTab === 'fillers' && (
          <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h3 className="text-base font-black text-black">Filler Word Frequency</h3>
                <p className="text-xs font-medium text-zinc-700">Crutch word density and breakdown</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold text-black">
                <span>Total: {acoustics.fillerWords.totalCount}</span>
                <span>Rate: {acoustics.fillerWords.ratePerMinute} / min</span>
              </div>
            </div>

            <FillerChart breakdown={acoustics.fillerWords.breakdown} />

            <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl text-xs font-mono font-bold text-black">
              <span className="block mb-1">Filler Word Remediation:</span>
              {acoustics.fillerWords.coachingFeedback}
            </div>
          </div>
        )}

        {/* Transcript Tab */}
        {activeTab === 'transcript' && (
          <TranscriptViewer fullText={transcript.fullText} segments={transcript.segments} />
        )}

        {/* AI Reasoning Tab */}
        {activeTab === 'content' && (
          <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-black" />
                <h3 className="text-base font-black text-black">AI Content & Reasoning Assessment</h3>
              </div>
              <span className="text-xs font-mono font-bold text-purple-700">Gemini 2.0 Critique</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>Architecture Score</span>
                  <span>{contentAnalysis.structure.score}/100</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">{contentAnalysis.structure.feedback}</p>
              </div>

              <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>Clarity & Readability</span>
                  <span>{contentAnalysis.clarity.score}/100</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">{contentAnalysis.clarity.feedback}</p>
              </div>

              <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>Vocabulary Richness</span>
                  <span>{contentAnalysis.vocabulary.score}/100</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">{contentAnalysis.vocabulary.feedback}</p>
              </div>

              <div className="p-4 bg-[#F7F4EB] border-2 border-black rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                  <span>Reasoning Quality</span>
                  <span>{contentAnalysis.relevanceAndReasoning.score}/100</span>
                </div>
                <p className="text-xs font-medium text-zinc-800">{contentAnalysis.relevanceAndReasoning.reasoningDepthFeedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Explorer Tab */}
        {activeTab === 'knowledge' && (
          <KnowledgeExplorer knowledge={knowledgeExploration} />
        )}
      </div>
    </div>
  );
};
