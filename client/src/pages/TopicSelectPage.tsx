import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { ITopic, TopicCategory, DifficultyLevel, SpeakingMode } from '../types';
import {
  Compass,
  Sparkles,
  Search,
  BookOpen,
  HelpCircle,
  Key,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

export const TopicSelectPage: React.FC = () => {
  const { allTopics, setCurrentTopic, addCustomTopic } = useSession();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  const categories = [
    'All',
    'AI',
    'Technology',
    'Science',
    'Environment',
    'Business',
    'Finance',
    'Society',
    'Philosophy',
    'Debate',
    'Interview',
  ];

  const filteredTopics = allTopics.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
    const matchesQuery =
      searchQuery.trim() === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDiff && matchesQuery;
  });

  const handleSelectAndPrep = (topic: ITopic) => {
    setCurrentTopic(topic);
    navigate('/prep');
  };

  const handleGenerateAiTopic = () => {
    setIsGeneratingAi(true);
    // Simulating instant AI structured topic generation
    setTimeout(() => {
      const promptTitle = customPrompt.trim() !== ''
        ? customPrompt
        : 'The Ethics of Brain-Computer Interfaces: Privacy in the Neural Age';

      const newAiTopic: ITopic = {
        id: `ai-topic-${Date.now()}`,
        title: promptTitle,
        category: (selectedCategory === 'All' ? 'Technology' : selectedCategory) as TopicCategory,
        mode: 'presentation' as SpeakingMode,
        difficulty: 'Advanced' as DifficultyLevel,
        explanation: 'As neural decoding algorithms and direct brain-computer interfaces advance from clinical prosthetics into consumer tech, neural privacy, cognitive liberty, and mental data sovereignty become critical societal frontiers.',
        keyConcepts: [
          'Neural Decoding & Cognitive Liberty',
          'Mental Privacy vs Targeted Neuromarketing',
          'Invasive vs Non-Invasive BCI Interfaces',
          'Regulatory Frameworks for Neurotechnology'
        ],
        suggestedResearchQuestions: [
          'What legal precedents protect human thought from non-consensual biometric decoding?',
          'How do neural signals differ from conventional biometric data like fingerprints or DNA?',
          'What are the therapeutic benefits versus societal risks of commercial neuro-implants?'
        ],
        usefulKeywords: ['Brain-computer interface', 'Cognitive liberty', 'Neural decoding', 'Neuromarketing', 'Neuroethics'],
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };

      addCustomTopic(newAiTopic);
      setIsGeneratingAi(false);
      setShowAiModal(false);
      setCustomPrompt('');
      navigate('/prep');
    }, 1200);
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Curated & AI Topics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Select a Topic & Explore Key Concepts
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Learn and formulate your own structured perspective before speaking.
          </p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-semibold text-xs hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Dynamic AI Topic</span>
        </button>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, topics, keywords (e.g. AI, nuclear, economics, ethics)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121215] border border-[#27272a] text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Category Pills & Difficulty Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <span>Difficulty:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded text-[11px] ${
                  selectedDifficulty === diff
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Topics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-6 rounded-2xl bg-[#121215] border border-[#27272a] hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-semibold">
                    {topic.category}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {topic.difficulty}
                  </span>
                  {topic.isAiGenerated && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Generated
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  Mode: {topic.mode}
                </span>
              </div>

              {/* Title & Explanation */}
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                {topic.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {topic.explanation}
              </p>

              {/* Key Concepts Preview */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  Key Research Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topic.keyConcepts.map((concept, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research Questions Preview */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Suggested Thought Prompts
                </span>
                <p className="text-xs text-zinc-400 italic">
                  "{topic.suggestedResearchQuestions[0]}"
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                <Key className="w-3 h-3 text-zinc-400" />
                <span>{topic.usefulKeywords.slice(0, 3).join(', ')}...</span>
              </div>

              <button
                onClick={() => handleSelectAndPrep(topic)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/10"
              >
                <span>Enter Preparation Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. AI Topic Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AI Topic & Research Generator</h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-zinc-500 hover:text-zinc-300 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Enter any custom subject, debate proposition, or leave blank to let Gemini construct a structured multi-dimensional speech topic.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Custom Prompt or Domain (Optional)</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Should central banks issue digital currencies (CBDCs)? or The ethics of space exploration..."
                rows={3}
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAiTopic}
                disabled={isGeneratingAi}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20"
              >
                {isGeneratingAi ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                    <span>Structuring Topic with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate & Start Prep</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
