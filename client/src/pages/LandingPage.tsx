import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Activity,
  ArrowRight,
  Sparkles,
  BookOpen,
  PenTool,
  Radio,
  RefreshCw,
  Shield,
  CheckCircle2,
  Volume2,
  Gauge,
  BrainCircuit,
} from 'lucide-react';
import { WaveformCanvas } from '../components/audio/WaveformCanvas';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-[#080d17] font-sans text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=85')" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,13,23,.76)_0%,rgba(8,13,23,.9)_42%,#080d17_92%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(102,217,201,.18),transparent_32%),radial-gradient(circle_at_18%_36%,rgba(255,220,96,.08),transparent_28%)]" />

      <div className="space-y-24 py-8">
      {/* 1. Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-8 px-4 pt-8">
        {/* Subtle background glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-mono shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real Acoustic Audio & Reasoning Analysis Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Learn something. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Speak about it. Get better.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered public speaking coach that analyzes <span className="text-zinc-200">how you speak</span> (pitch, pace, pauses, fillers), <span className="text-zinc-200">what you say</span> (structure, vocabulary, reasoning), and turns practice into a continuous learning loop.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/topics"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Mic className="w-4 h-4" />
            <span>Start Practicing Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium text-sm hover:bg-zinc-800 hover:text-white transition-all"
          >
            <span>Explore Dashboard Demo</span>
          </Link>
        </div>

        {/* Live Audio Visualizer Teaser */}
        <div className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ACOUSTIC ENGINE PREVIEW</span>
            </div>
            <span className="text-[11px] text-zinc-500">60 FPS Hardware Accelerated</span>
          </div>
          <WaveformCanvas isRecording={true} height={100} />
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-3 pt-3 border-t border-zinc-900">
            <span>F0 Range: 75Hz - 500Hz</span>
            <span>Real-time YIN Pitch Tracking</span>
            <span>Rolling WPM Segmentation</span>
          </div>
        </div>
      </section>

      {/* 2. The Core 5-Step Practice Loop */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">The Continuous Methodology</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How VOXCOACH Accelerates Mastery
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Public speaking is not just memorization—it is thinking clearly, structuring arguments, and commanding your vocal instrument.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Learn & Research', icon: BookOpen, desc: 'Discover topics across AI, science, finance, and debate with core concepts & research prompts.' },
            { step: '02', title: 'Prepare & Outline', icon: PenTool, desc: 'Timed 2, 5, or 10-minute prep screen to formulate your three-act structure and evidence.' },
            { step: '03', title: 'Speak on Stage', icon: Radio, desc: 'Distraction-free recording stage with 60 FPS live soundwave canvas and microphone metering.' },
            { step: '04', title: 'Acoustic & AI Analysis', icon: Activity, desc: 'Measurable feedback on pitch variation, rolling WPM, pauses, filler words, and reasoning quality.' },
            { step: '05', title: 'Targeted Growth', icon: RefreshCw, desc: 'Personalized next exercise and probing research questions to expand your knowledge.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121215] border border-[#27272a] hover:border-zinc-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-zinc-600 font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Deep Feature Breakdown */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Engineering Excellence</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Comprehensive Voice & Reasoning Analytics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Fundamental Frequency (F0) Pitch</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Detects vocal pitch contours across your speech. Identifies monotone sections, excessive pitch spikes, and guides you on vocal modulation without pseudo-medical diagnosis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Pace & Pause Segmentation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tracks Words Per Minute (WPM) across 15-second moving windows. Differentiates intentional rhetorical pauses from hesitation silences.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-center text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">AI Reasoning & Knowledge Loop</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Evaluates argument structure, clarity, and vocabulary richness. Suggests unexplored sub-topics and research questions to boost subject matter mastery.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Privacy & Data Ethics Guarantee */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Privacy & Audio Handling Ethics</h3>
              <p className="text-xs text-zinc-400">Transparent microphone processing designed for trust</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Explicit Microphone Consent:</strong> Audio is only accessed when you explicitly start a practice session.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Ephemeral In-Memory Processing:</strong> Raw audio files are not permanently stored on servers.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Instant Data Purge:</strong> Delete any past session and its metrics from your history at any time.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>No Clinical Diagnostics:</strong> Pitch and acoustic scores are framed strictly as speaking delivery guidance.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Call to Action */}
      <section className="text-center max-w-2xl mx-auto px-4 space-y-6 pb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Ready for your next speaking challenge?
        </h2>
        <p className="text-sm text-zinc-400">
          Select a topic, take 2 minutes to organize your thoughts, and practice in a private, focused environment.
        </p>
        <Link
          to="/topics"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          <span>Choose a Topic & Begin</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
      </div>
    </div>
  );
};
