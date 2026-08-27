import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
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
  Shield,
  AlertTriangle,
} from 'lucide-react';

export const PracticeRoomPage: React.FC = () => {
  const { currentTopic, prepNotes, setRecordedAudioBlob, setRecordedAudioUrl } = useSession();
  const navigate = useNavigate();

  const {
    isRecording,
    isPaused,
    secondsSpoken,
    micActive,
    micError,
    analyser,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    toggleMute,
  } = useAudioRecorder();

  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [isProcessingReport, setIsProcessingReport] = useState<boolean>(false);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  };

  const handleStopRecording = async () => {
    setIsProcessingReport(true);
    const blob = await stopRecording();
    if (blob) {
      setRecordedAudioBlob(blob);
      setRecordedAudioUrl(URL.createObjectURL(blob));
    }

    setTimeout(() => {
      setIsProcessingReport(false);
      navigate('/results');
    }, 1600);
  };

  if (!currentTopic) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-black text-black">No Active Topic</h2>
        <p className="text-sm font-medium text-zinc-700">Please select a topic to begin your speaking practice.</p>
        <Link
          to="/topics"
          className="inline-block px-5 py-2.5 bg-[#FFE600] border-2 border-black rounded-xl font-bold shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-black"
        >
          Select Topic
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 font-sans space-y-6">
      {/* Mic Permission Error Alert */}
      {micError && (
        <div className="p-4 bg-[#FF6B6B] border-2 border-black rounded-xl shadow-neo text-black flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-bold">{micError}</span>
          </div>
          <button
            onClick={() => handleStartRecording()}
            className="px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold hover:bg-yellow-200"
          >
            Retry Mic
          </button>
        </div>
      )}

      {/* 1. Stage Header: Topic & Controls */}
      <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#A78BFA] border border-black text-black">
              {currentTopic.category} • {currentTopic.mode}
            </span>
            <span className="text-xs font-bold text-zinc-600 font-mono">Target: 3-5 min</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            {currentTopic.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleMute}
            className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-bold flex items-center gap-2 shadow-neo-sm transition-all ${
              micActive ? 'bg-[#51CF66] text-black' : 'bg-[#FF6B6B] text-black'
            }`}
          >
            {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{micActive ? 'Mic Active' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className="px-3 py-1.5 rounded-xl bg-white border-2 border-black text-black text-xs font-bold flex items-center gap-1.5 shadow-neo-sm hover:bg-yellow-100"
          >
            <FileText className="w-4 h-4 text-black" />
            <span>{showNotesDrawer ? 'Hide Notes' : 'Notes'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Stage Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className={`${showNotesDrawer ? 'lg:col-span-7' : 'lg:col-span-12'} p-8 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col justify-between items-center text-center space-y-6`}>
          {/* Status Indicator */}
          <div className="w-full flex items-center justify-between text-xs font-mono font-bold pb-3 border-b-2 border-black">
            <div>
              {isRecording ? (
                isPaused ? (
                  <span className="inline-flex items-center gap-1.5 text-black px-2.5 py-0.5 rounded-full bg-[#FFE600] border border-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-black" /> PAUSED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-black px-2.5 py-0.5 rounded-full bg-[#FF6B6B] border border-black animate-pulse">
                    <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" /> RECORDING LIVE
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 text-black px-2.5 py-0.5 rounded-full bg-zinc-200 border border-black">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" /> STAGE READY
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-zinc-600 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time Mic Stream</span>
            </div>
          </div>

          {/* Timer Display */}
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-zinc-500 font-mono tracking-wider">Spoken Duration</span>
            <div className="text-6xl sm:text-7xl font-black font-mono text-black tracking-wider">
              {formatTimer(secondsSpoken)}
            </div>
          </div>

          {/* Live Waveform Canvas */}
          <div className="w-full p-4 bg-[#F7F4EB] border-2 border-black rounded-xl shadow-neo-sm">
            <WaveformCanvas isRecording={isRecording} isPaused={isPaused} analyser={analyser} height={120} />
          </div>

          {/* Action Controls */}
          <div className="w-full pt-4 border-t-2 border-black flex items-center justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FFE600] border-2 border-black font-black text-sm text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                <Radio className="w-5 h-5" />
                <span>Start Speaking Now</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseResume}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-black text-black font-bold text-xs shadow-neo hover:bg-zinc-100 transition-all"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>

                <button
                  onClick={handleStopRecording}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B6B] border-2 border-black text-black font-bold text-xs shadow-neo hover:bg-red-400 transition-all"
                >
                  <Square className="w-4 h-4 fill-black" />
                  <span>Finish & Analyze</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Collapsible Notes Side Drawer */}
        {showNotesDrawer && (
          <div className="lg:col-span-5 p-6 bg-white border-2 border-black rounded-2xl shadow-neo space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-black">
              <h3 className="text-xs font-black uppercase text-black font-mono">Your Prep Notes</h3>
              <Link to="/prep" className="text-xs font-bold text-purple-700 hover:underline">
                Edit Notes
              </Link>
            </div>

            {prepNotes && prepNotes.trim() !== '' ? (
              <pre className="text-xs font-mono text-zinc-800 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto pr-1">
                {prepNotes}
              </pre>
            ) : (
              <p className="text-xs italic text-zinc-500 text-center py-4">
                No preparation notes drafted. You can speak spontaneously or write notes on the prep screen.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Processing Modal Overlay */}
      {isProcessingReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-2xl max-w-md w-full p-8 text-center space-y-5 shadow-neo-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#FFE600] border-2 border-black mx-auto flex items-center justify-center text-black shadow-neo-sm">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-black">Analyzing Your Speech</h3>
              <p className="text-xs font-mono text-zinc-700 font-bold">
                Processing pitch contours, WPM cadence, pause intervals, and AI content reasoning...
              </p>
            </div>

            <div className="w-full h-3 bg-zinc-200 border-2 border-black rounded-full overflow-hidden">
              <div className="h-full bg-[#4ECCD3] animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

