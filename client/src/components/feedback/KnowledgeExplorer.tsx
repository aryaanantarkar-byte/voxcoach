import React from 'react';
import { IKnowledgeExploration } from '../../types';
import { Lightbulb, Compass, HelpCircle, ArrowUpRight } from 'lucide-react';

interface KnowledgeExplorerProps {
  knowledge: IKnowledgeExploration;
}

export const KnowledgeExplorer: React.FC<KnowledgeExplorerProps> = ({ knowledge }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] space-y-6 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Knowledge Expansion & Research Loop</h3>
            <p className="text-xs text-zinc-400">Transform public speaking practice into an ongoing learning journey</p>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-300">
          Learn Before Repeat
        </span>
      </div>

      {/* Key Learning Takeaway Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/20 via-zinc-900 to-zinc-950 border border-cyan-900/30 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase text-cyan-300 mb-1">Core Conceptual Insight</h4>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">{knowledge.keyLearningTakeaway}</p>
        </div>
      </div>

      {/* Unexplored Subtopics Grid */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          Untouched Dimensions in Your Speech
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {knowledge.unexploredSubtopics.map((topic, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-xs font-semibold text-zinc-200">{topic.title}</h5>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{topic.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Probing Research Questions */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Recommended Questions for Next Session
        </span>

        <div className="space-y-2">
          {knowledge.followUpResearchQuestions.map((question, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-3 hover:bg-zinc-900 transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 font-mono text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed font-sans">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
