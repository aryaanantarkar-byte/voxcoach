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
    <div className="space-y-8 py-8 max-w-5xl mx-auto px-4 font-sans">
      {/* 1. Page Header */}
      <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-neo flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-black" />
            <span className="text-xs font-black uppercase text-black font-mono">Topic Library ({filteredTopics.length})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Select a Topic & Explore Key Concepts
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-700 mt-1">
            Learn and formulate your own structured perspective before speaking on stage.
          </p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FFE600] border-2 border-black font-black text-xs text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate AI Topic</span>
        </button>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, topics, keywords (e.g. AI, nuclear, economics, ethics)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-2 border-black text-sm text-black font-medium placeholder:text-zinc-500 shadow-neo-sm focus:outline-none"
          />
        </div>

        {/* Category Pills & Difficulty Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap border-2 border-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFE600] text-black shadow-neo-sm'
                    : 'bg-white text-zinc-800 hover:bg-yellow-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-black flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg border-2 border-black text-[11px] ${
                  selectedDifficulty === diff
                    ? 'bg-[#69D2E7] text-black'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100'
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
            className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#A78BFA] border border-black text-black">
                    {topic.category}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-zinc-100 border border-black text-black">
                    {topic.difficulty}
                  </span>
                  {topic.isAiGenerated && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#69D2E7] border border-black text-black flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono font-bold uppercase text-zinc-600">
                  Mode: {topic.mode}
                </span>
              </div>

              {/* Title & Explanation */}
              <h3 className="text-lg font-black text-black group-hover:text-purple-700 transition-colors leading-snug">
                {topic.title}
              </h3>
              <p className="text-xs text-zinc-800 font-medium leading-relaxed font-sans">
                {topic.explanation}
              </p>

              {/* Key Concepts Preview */}
              <div className="space-y-1.5 pt-2 border-t-2 border-black">
                <span className="text-[11px] font-mono font-bold uppercase text-black flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-black" />
                  Key Research Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topic.keyConcepts.map((concept, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#F7F4EB] border border-black text-black font-mono font-bold">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research Questions Preview */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono font-bold uppercase text-black flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-black" />
                  Suggested Thought Prompt
                </span>
                <p className="text-xs text-zinc-700 italic font-medium">
                  "{topic.suggestedResearchQuestions[0]}"
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 font-mono font-bold">
                <Key className="w-3 h-3 text-black" />
                <span>{topic.usefulKeywords.slice(0, 3).join(', ')}...</span>
              </div>

              <button
                onClick={() => handleSelectAndPrep(topic)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFE600] border-2 border-black font-bold text-xs text-black shadow-neo-sm hover:bg-yellow-300 transition-all"
              >
                <span>Prep Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. AI Topic Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-neo-xl">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-black" />
                <h3 className="text-lg font-black text-black">AI Topic & Research Generator</h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-black font-black text-base hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-800 font-medium leading-relaxed font-sans">
              Enter any custom subject or debate proposition to construct a structured multi-dimensional speech topic.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-black">Custom Prompt or Domain (Optional)</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Should central banks issue digital currencies (CBDCs)? or The ethics of space exploration..."
                rows={3}
                className="w-full p-3 rounded-xl bg-[#F7F4EB] border-2 border-black text-xs text-black font-medium placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-200 border-2 border-black text-xs font-bold text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAiTopic}
                disabled={isGeneratingAi}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FFE600] border-2 border-black text-black font-bold text-xs shadow-neo-sm hover:bg-yellow-300 disabled:opacity-50 transition-all"
              >
                {isGeneratingAi ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Structuring Topic...</span>
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

