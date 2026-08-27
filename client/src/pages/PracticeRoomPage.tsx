import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { WaveformCanvas } from '../components/audio/WaveformCanvas';
import {
  Mic,
  MicOff,
  Radio,
  Play,
  Pause,
  Square,
  FileText,
  Sparkles,
  Volume2,
  Shield,
} from 'lucide-react';

export const PracticeRoomPage: React.FC = () => {
  const { currentTopic, prepNotes } = useSession();
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [secondsSpoken, setSecondsSpoken] = useState<number>(0);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(true);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [isProcessingReport, setIsProcessingReport] = useState<boolean>(false);

  // Live speaking timer
  useEffect(() => {
    let interval: any = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSecondsSpoken((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setIsProcessingReport(true);

    // Simulate final audio aggregation & acoustic/LLM analysis pipeline
    setTimeout(() => {
      setIsProcessingReport(false);
      navigate('/results');
    }, 1800);
  };

  if (!currentTopic) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-xl font-bold text-white">No Active Topic</h2>
        <p className="text-sm text-zinc-400">Please select a topic to begin your speaking practice.</p>
        <Link to="/topics" className="inline-block px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold rounded-lg text-xs">
          Select Topic
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-between py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans relative">
      {/* 1. Stage Header: Topic & Active Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-semibold">
              {currentTopic.category} • {currentTopic.mode}
            </span>
            <span className="text-xs font-mono text-zinc-400">Target Duration: 3-5 min</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {currentTopic.title}
          </h1>
        </div>

        {/* Live Stage Microphone & Status Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMicActive(!micActive)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
              micActive
                ? 'bg-zinc-900 border-zinc-700 text-emerald-400'
                : 'bg-rose-950/40 border-rose-800 text-rose-400'
            }`}
          >
            {micActive ? <Mic className="w-3.5 h-3.5 text-emerald-400" /> : <MicOff className="w-3.5 h-3.5 text-rose-400" />}
            <span>Microphone: {micActive ? 'Active' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showNotesDrawer ? 'Hide Notes' : 'Show Notes'}</span>
          </button>
        </div>
      </div>

      {/* 2. Center Stage: The Live Audio & Recording Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 flex-1 items-stretch">
        {/* Main Acoustic Visualizer & Stage Card (Span 8 or 12 depending on drawer) */}
        <div className={`${showNotesDrawer ? 'lg:col-span-8' : 'lg:col-span-12'} p-8 rounded-2xl bg-[#121215] border border-[#27272a] flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden transition-all duration-300`}>
          {/* Status Indicator Bar */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              {isRecording ? (
                isPaused ? (
                  <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    PAUSED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-400 font-semibold animate-pulse">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    RECORDING LIVE
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  STAGE READY
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>In-Memory Stream (Zero Permanent Audio Retention)</span>
            </div>
          </div>

          {/* Centerpiece Timer & Waveform */}
          <div className="my-auto py-8 w-full max-w-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block">Spoken Duration</span>
              <div className="text-6xl sm:text-7xl font-extrabold font-mono text-white tracking-wider">
                {formatTimer(secondsSpoken)}
              </div>
            </div>

            {/* 60 FPS HTML5 Canvas Waveform */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-inner">
              <WaveformCanvas isRecording={isRecording} isPaused={isPaused} height={120} />
            </div>

            <div className="flex items-center justify-center gap-6 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Pitch Tracker: F0 Active
              </span>
              <span>•</span>
              <span>Cadence: 130–160 WPM Target</span>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="w-full pt-6 border-t border-zinc-800/60 flex items-center justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 active:scale-95 transition-all shadow-xl shadow-emerald-500/25"
              >
                <Radio className="w-5 h-5 animate-pulse" />
                <span>Start Speaking Now</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseResume}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-semibold border transition-all ${
                    isPaused
                      ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300 hover:bg-emerald-900/50'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  <span>{isPaused ? 'Resume Speech' : 'Pause'}</span>
                </button>

                <button
                  onClick={handleStopRecording}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold active:scale-95 transition-all shadow-lg shadow-rose-600/30"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish & Analyze Speech</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Collapsible Preparation Notes Side Drawer (Span 4) */}
        {showNotesDrawer && (
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#121215] border border-[#27272a] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono uppercase font-semibold text-zinc-200">Your Prep Notes</h3>
                </div>
                <Link to="/prep" className="text-[11px] font-mono text-emerald-400 hover:underline">
                  Edit Outline
                </Link>
              </div>

              {prepNotes && prepNotes.trim() !== '' ? (
                <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[26rem] overflow-y-auto pr-1">
                  {prepNotes}
                </pre>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 italic text-center">
                  No preparation notes drafted. You can speak spontaneously or click "Edit Outline" above.
                </div>
              )}
            </div>

            {/* Quick Delivery Reminders */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2 text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-300 font-semibold block">Speaking Delivery Tips:</span>
              <ul className="space-y-1 text-[11px] text-zinc-400">
                <li>• Take a 1-sec breath pause before starting.</li>
                <li>• Anchor transitions with clean silence.</li>
                <li>• End on a definitive, downward-inflected claim.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 3. Processing Modal Overlay */}
      {isProcessingReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 mx-auto flex items-center justify-center text-emerald-400">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Aggregating Speech Metrics</h3>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Running YIN Pitch Analysis, WPM Segmentation, Pause Detection, and Gemini Content Evaluation...
              </p>
            </div>

            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
