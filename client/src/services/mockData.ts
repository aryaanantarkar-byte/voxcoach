import { ITopic, ISpeechSession, IUser } from '../types';

export const MOCK_USER: IUser = {
  id: 'user-001',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  experienceLevel: 'intermediate',
  preferences: {
    defaultPrepDuration: 300,
    targetWpmMin: 130,
    targetWpmMax: 160,
  },
  createdAt: '2025-01-10T10:00:00.000Z',
};

export const MOCK_TOPICS: ITopic[] = [
  {
    id: 'topic-1',
    title: 'Should Artificial Intelligence Replace Some White-Collar Jobs?',
    category: 'AI',
    mode: 'debate',
    difficulty: 'Intermediate',
    explanation: 'As generative AI and automated decision systems rapidly advance, routine legal, financial, administrative, and coding tasks are being augmented or automated. This raises deep questions about workforce displacement, economic productivity, and the evolution of human labor.',
    keyConcepts: [
      'Task Automation vs Job Automation',
      'Economic Productivity & Creative Destruction',
      'Reskilling, Upskilling, and Lifelong Learning',
      'Ethical Accountability in Automated Decisions'
    ],
    suggestedResearchQuestions: [
      'What historical precedents exist for technological disruption in the labor market?',
      'How does task augmentation differ from complete workforce displacement?',
      'What policy frameworks or safety nets are needed for displaced professionals?'
    ],
    usefulKeywords: ['Automation', 'Cognitive labor', 'Productivity paradox', 'Augmentation', 'Displacement', 'Reskilling'],
    isAiGenerated: false,
    createdAt: '2025-01-15T08:00:00.000Z',
  },
  {
    id: 'topic-2',
    title: 'The Future of Nuclear Energy: Essential Clean Base Load or High-Risk Gamble?',
    category: 'Environment',
    mode: 'presentation',
    difficulty: 'Advanced',
    explanation: 'Achieving net-zero carbon grids requires reliable, non-intermittent power. Nuclear energy produces zero direct greenhouse emissions and has unmatched energy density, but faces public concern regarding waste storage, safety, capital costs, and long construction timelines.',
    keyConcepts: [
      'Energy Density & Baseload Power Reliability',
      'Small Modular Reactors (SMRs) vs Legacy Mega-Reactors',
      'Long-Term Spent Fuel Geological Repositories',
      'Levelized Cost of Electricity (LCOE) Comparison'
    ],
    suggestedResearchQuestions: [
      'Why is nuclear energy significantly more energy-dense than chemical fuels?',
      'What safety innovations are built into Gen-IV and Small Modular Reactors?',
      'Can renewables alone reliably supply 100% of global industrial base loads?'
    ],
    usefulKeywords: ['Energy density', 'Baseload power', 'Deep geological repository', 'SMR', 'Intermittency', 'Decarbonization'],
    isAiGenerated: false,
    createdAt: '2025-01-18T09:30:00.000Z',
  },
  {
    id: 'topic-3',
    title: 'Behavioral Economics: How Cognitive Biases Shape Everyday Financial Decisions',
    category: 'Finance',
    mode: 'casual',
    difficulty: 'Beginner',
    explanation: 'Traditional economic theory assumes individuals are rational actors maximizing utility. Behavioral economics reveals how human psychology, emotional heuristics, loss aversion, and anchoring systematically steer people into irrational financial choices.',
    keyConcepts: [
      'Prospect Theory & Loss Aversion',
      'Choice Architecture and Nudge Theory',
      'Present Bias and Hyperbolic Discounting',
      'Herd Mentality in Asset Bubbles'
    ],
    suggestedResearchQuestions: [
      'Why do people feel the pain of a financial loss twice as intensely as the joy of an equivalent gain?',
      'How can governments and fintech apps use default options to boost retirement savings?',
      'What psychological triggers drive speculative retail trading bubbles?'
    ],
    usefulKeywords: ['Loss aversion', 'Hyperbolic discounting', 'Heuristics', 'Mental accounting', 'Nudge', 'Anchoring bias'],
    isAiGenerated: false,
    createdAt: '2025-01-20T14:15:00.000Z',
  },
  {
    id: 'topic-4',
    title: 'The Ethics of Genetic Engineering: CRISPR and the Designer Baby Debate',
    category: 'Science',
    mode: 'debate',
    difficulty: 'Advanced',
    explanation: 'The advent of precise gene-editing technologies like CRISPR-Cas9 enables the eradication of hereditary diseases, but also introduces profound ethical concerns regarding germline editing, biological enhancement, and genetic inequality.',
    keyConcepts: [
      'Somatic Cell Editing vs Germline Editing',
      'Therapeutic Treatment vs Genetic Enhancement',
      'Eugenics and Socioeconomic Stratification',
      'Global Regulatory Governance & Moratoriums'
    ],
    suggestedResearchQuestions: [
      'Where is the ethical boundary between curing genetic illness and enhancing human capabilities?',
      'What are the generational risks of permanent germline DNA modifications?',
      'How can international scientific bodies enforce bioethics across borders?'
    ],
    usefulKeywords: ['CRISPR-Cas9', 'Germline editing', 'Genetic enhancement', 'Bioethics', 'Somatic cells', 'Socioeconomic disparity'],
    isAiGenerated: false,
    createdAt: '2025-01-22T11:00:00.000Z',
  },
  {
    id: 'topic-5',
    title: 'Central Bank Digital Currencies (CBDCs): Financial Innovation or Privacy Risk?',
    category: 'Finance',
    mode: 'debate',
    difficulty: 'Intermediate',
    explanation: 'Sovereign nations are developing digital fiat currencies issued directly by central banks. While CBDCs offer faster settlements and lower transaction friction, critics warn of programmable spending controls and complete loss of financial anonymity.',
    keyConcepts: [
      'Programmable Money & Smart Contracts',
      'Two-Tier Monetary Architecture',
      'Financial Inclusivity vs Financial Surveillance',
      'Disintermediation of Commercial Banks'
    ],
    suggestedResearchQuestions: [
      'How do CBDCs differ fundamentally from decentralized cryptocurrencies like Bitcoin?',
      'What safeguards are needed to prevent unauthorized transaction tracking?',
      'How might CBDCs impact the velocity of money during economic crises?'
    ],
    usefulKeywords: ['CBDC', 'Central Bank', 'Programmable fiat', 'Disintermediation', 'Financial anonymity', 'Settlement friction'],
    isAiGenerated: false,
    createdAt: '2025-01-24T10:00:00.000Z',
  },
  {
    id: 'topic-6',
    title: 'The Neuroscience of Attention: Navigating Deep Work in a Distraction Economy',
    category: 'Science',
    mode: 'presentation',
    difficulty: 'Beginner',
    explanation: 'Modern digital platforms rely on dopamine feedback loops engineered to capture human attention. Understanding the prefrontal cortex, attentional switching costs, and focus restoration is crucial for knowledge workers seeking deep focus.',
    keyConcepts: [
      'Prefrontal Cortex & Executive Function',
      'Attentional Residue & Context Switching',
      'Dopamine Pathways & Algorithmic Hooking',
      'Restorative Environments & Focus Blocks'
    ],
    suggestedResearchQuestions: [
      'What is attentional residue and how does rapid tab-switching degrade cognitive synthesis?',
      'How do notification mechanics exploit biological reward signals?',
      'What daily rituals provably restore prefrontal fatigue?'
    ],
    usefulKeywords: ['Attention residue', 'Deep work', 'Dopamine loop', 'Prefrontal fatigue', 'Context switching', 'Cognitive load'],
    isAiGenerated: false,
    createdAt: '2025-01-25T15:30:00.000Z',
  },
  {
    id: 'topic-7',
    title: 'Quantum Computing: Preparing for Post-RSA Cybersecurity and Cryptographic Shifts',
    category: 'Technology',
    mode: 'presentation',
    difficulty: 'Advanced',
    explanation: 'Shor’s algorithm running on a sufficiently large fault-tolerant quantum computer will render public-key encryption (RSA, ECC) vulnerable. Post-quantum cryptography (PQC) standards are now critical for global data infrastructure.',
    keyConcepts: [
      'Superposition & Quantum Qubits',
      'Shor’s Algorithm & RSA Prime Factorization',
      'Post-Quantum Lattice-Based Cryptography',
      'Harvest Now, Decrypt Later Threat Vectors'
    ],
    suggestedResearchQuestions: [
      'Why are traditional encryption algorithms vulnerable to quantum factorization?',
      'What is the "Harvest Now, Decrypt Later" strategy employed by threat actors?',
      'How do lattice-based mathematical problems resist quantum speedup?'
    ],
    usefulKeywords: ['Quantum superposition', 'Qubit', 'Post-quantum cryptography', 'Shor algorithm', 'RSA encryption', 'Lattice math'],
    isAiGenerated: false,
    createdAt: '2025-01-26T12:00:00.000Z',
  },
  {
    id: 'topic-8',
    title: 'Behavioral Interview Pitch: Explaining a Technical Conflict and Resolution',
    category: 'Interview',
    mode: 'interview',
    difficulty: 'Intermediate',
    explanation: 'Engineering interviewers assess interpersonal communication, empathy, and problem solving by asking how you handled a disagreement over architecture, code quality, or timeline pressures with team members.',
    keyConcepts: [
      'STAR Method (Situation, Task, Action, Result)',
      'Data-Driven Technical Consensus',
      'Empathy & Active Listening in Code Reviews',
      'Focusing on Shared Engineering Outcomes'
    ],
    suggestedResearchQuestions: [
      'How do you separate technical opinions from personal identity during architectural debates?',
      'What metrics or benchmarks did you present to convince skeptical teammates?',
      'How do you communicate trade-offs clearly to non-technical stakeholders?'
    ],
    usefulKeywords: ['STAR method', 'Technical consensus', 'Active listening', 'Trade-off evaluation', 'Conflict resolution'],
    isAiGenerated: false,
    createdAt: '2025-01-27T16:00:00.000Z',
  },
  {
    id: 'topic-9',
    title: 'Space Exploration vs Earth Priorities: Allocating R&D Capital for Humanity',
    category: 'Society',
    mode: 'debate',
    difficulty: 'Intermediate',
    explanation: 'Multi-billion dollar space missions inspire scientific breakthroughs and planetary defense, yet critics argue these funds should be directed toward pressing terrestrial challenges like climate change, poverty, and healthcare access.',
    keyConcepts: [
      'Spin-off Technologies (GPS, Materials, Solar)',
      'Planetary Defense & Existential Risk Hedging',
      'Opportunity Cost of Scientific R&D Capital',
      'Commercial Space Colonization vs Earth Preservation'
    ],
    suggestedResearchQuestions: [
      'How have historical space investments yielded everyday commercial technologies on Earth?',
      'What is the opportunity cost of space exploration funding compared to global climate R&D?',
      'Is multi-planetary civilization a valid safeguard against existential risks?'
    ],
    usefulKeywords: ['Spin-off tech', 'R&D capital', 'Existential risk', 'Planetary defense', 'Opportunity cost', 'Multi-planetary'],
    isAiGenerated: false,
    createdAt: '2025-01-28T09:00:00.000Z',
  },
  {
    id: 'topic-10',
    title: 'Autonomous Weapons Systems: Ethical Boundaries in Modern Warfare',
    category: 'Philosophy',
    mode: 'debate',
    difficulty: 'Advanced',
    explanation: 'Lethal Autonomous Weapons Systems (LAWS) can target and engage without human intervention. This raises fundamental questions about moral accountability, combatant distinction, algorithmic bias, and Geneva Convention compliance.',
    keyConcepts: [
      'Human-in-the-Loop vs Human-on-the-Loop',
      'Moral Agency and Accountability Gap',
      'Principle of Distinction & Proportionality',
      'Algorithmic Target Recognition Failures'
    ],
    suggestedResearchQuestions: [
      'Can an algorithm satisfy the Geneva Convention requirement for human military discretion?',
      'Who bears legal liability when an autonomous target recognition system misidentifies non-combatants?',
      'How can international treaties enforce bans on autonomous weapons?'
    ],
    usefulKeywords: ['LAWS', 'Human-in-the-loop', 'Moral agency', 'Target recognition', 'Geneva Convention', 'Proportionality'],
    isAiGenerated: false,
    createdAt: '2025-01-29T14:20:00.000Z',
  },
  {
    id: 'topic-11',
    title: 'Storytelling in Business: How Narrative Arc Drives Product Adoption',
    category: 'Business',
    mode: 'casual',
    difficulty: 'Beginner',
    explanation: 'Features and specs inform, but stories persuade. Learn how constructing a clear narrative arc (Villain/Problem, Hero/User, Guide/Product, Resolution) turns complex technical features into intuitive customer value.',
    keyConcepts: [
      'The Hero’s Journey in Product Positioning',
      'Empathy-Driven Problem Framing',
      'Concrete Contrast: Status Quo vs Envisioned Future',
      'Simplifying Technical Complexity for Customers'
    ],
    suggestedResearchQuestions: [
      'Why do humans remember stories 22 times more effectively than standalone facts?',
      'How can technical founders translate complex features into emotional benefits?',
      'What makes a product narrative authentic rather than marketing fluff?'
    ],
    usefulKeywords: ['Narrative arc', 'Product positioning', 'Status quo', 'Empathy framing', 'Value proposition', 'Storytelling'],
    isAiGenerated: false,
    createdAt: '2025-01-30T11:45:00.000Z',
  },
  {
    id: 'topic-12',
    title: 'Impromptu Challenge: Why Failure is the Essential Fuel for Technical Mastery',
    category: 'Random',
    mode: 'impromptu',
    difficulty: 'Beginner',
    explanation: 'Deliver a spontaneous 2-minute speech on how encountering software bugs, failed experiments, or rejected proposals accelerates learning more effectively than immediate success.',
    keyConcepts: [
      'Growth Mindset & Neuroplasticity',
      'Fail-Fast Engineering Culture',
      'Post-Mortems and Blameless Root Cause Analysis',
      'Resilience in Problem Solving'
    ],
    suggestedResearchQuestions: [
      'What is the psychological difference between a fixed mindset and a growth mindset?',
      'How do blameless post-mortems foster innovation in tech companies?',
      'Why does debugging difficult edge cases build deeper comprehension than writing boilerplate?'
    ],
    usefulKeywords: ['Growth mindset', 'Post-mortem', 'Blameless culture', 'Resilience', 'Neuroplasticity', 'Root cause'],
    isAiGenerated: false,
    createdAt: '2025-01-31T08:30:00.000Z',
  }
];

export const MOCK_SAMPLE_SESSION: ISpeechSession = {
  id: 'session-live-001',
  userId: 'user-001',
  topic: {
    topicId: 'topic-1',
    title: 'Should Artificial Intelligence Replace Some White-Collar Jobs?',
    category: 'AI',
    difficulty: 'Intermediate',
    mode: 'debate',
  },
  preparationNotes: `Opening:
- Hook: Industrial revolution automated muscle; AI is automating cognitive tasks.
- Thesis: AI shouldn't simply replace workers, but augment high-leverage decision making.

Main Points:
1. Routine cognitive work (contract review, basic data parsing) is already 70% automated.
2. The Productivity Paradox: When routine tasks vanish, higher-order synthesis becomes more valuable.
3. Reskilling challenge: Transition speed is faster than previous industrial shifts.

Counterargument:
- Critics argue mass unemployment is inevitable.
- Rebuttal: History shows technological shifts create new industries, provided education adapts.

Conclusion:
- Emphasize proactive policy, human-in-the-loop oversight, and continuous education.`,
  speakingDurationSeconds: 165,
  transcript: {
    fullText: "Good afternoon, everyone. Today I want to address a question that is at the very center of modern technological debates: should artificial intelligence replace white-collar jobs? Um, when we look at the industrial revolution, machinery automated physical muscle. Today, artificial intelligence is automating cognitive labor. But, you know, we have to distinguish between automating a task and replacing an entire job. For instance, in legal research and financial modeling, AI can basically scan thousands of documents in seconds. Like, this allows professionals to focus on strategic judgment rather than repetitive data entry. However, uh, the transition speed is unprecedented. If we don't actively invest in reskilling and institutional support, we risk significant labor friction. In conclusion, the goal should not be wholesale replacement, but intelligent augmentation with humans firmly in the loop.",
    wordCount: 142,
    segments: [
      { text: "Good afternoon, everyone. Today I want to address a question that is at the very center of modern technological debates: should artificial intelligence replace white-collar jobs?", startTimeSec: 0, endTimeSec: 14.5, wpm: 145, isFiller: false },
      { text: "Um,", startTimeSec: 14.6, endTimeSec: 15.2, wpm: 100, isFiller: true, fillerWord: "um" },
      { text: "when we look at the industrial revolution, machinery automated physical muscle. Today, artificial intelligence is automating cognitive labor.", startTimeSec: 15.3, endTimeSec: 26.0, wpm: 138, isFiller: false },
      { text: "But,", startTimeSec: 26.5, endTimeSec: 27.0, wpm: 120, isFiller: false },
      { text: "you know,", startTimeSec: 27.1, endTimeSec: 28.0, wpm: 130, isFiller: true, fillerWord: "you know" },
      { text: "we have to distinguish between automating a task and replacing an entire job. For instance, in legal research and financial modeling, AI can", startTimeSec: 28.1, endTimeSec: 42.0, wpm: 148, isFiller: false },
      { text: "basically", startTimeSec: 42.1, endTimeSec: 42.9, wpm: 120, isFiller: true, fillerWord: "basically" },
      { text: "scan thousands of documents in seconds.", startTimeSec: 43.0, endTimeSec: 47.0, wpm: 152, isFiller: false },
      { text: "Like,", startTimeSec: 47.5, endTimeSec: 48.1, wpm: 100, isFiller: true, fillerWord: "like" },
      { text: "this allows professionals to focus on strategic judgment rather than repetitive data entry.", startTimeSec: 48.2, endTimeSec: 57.0, wpm: 142, isFiller: false },
      { text: "However,", startTimeSec: 57.8, endTimeSec: 59.0, wpm: 110, isFiller: false },
      { text: "uh,", startTimeSec: 59.1, endTimeSec: 59.8, wpm: 90, isFiller: true, fillerWord: "uh" },
      { text: "the transition speed is unprecedented. If we don't actively invest in reskilling and institutional support, we risk significant labor friction.", startTimeSec: 60.0, endTimeSec: 74.0, wpm: 135, isFiller: false },
      { text: "In conclusion, the goal should not be wholesale replacement, but intelligent augmentation with humans firmly in the loop.", startTimeSec: 75.0, endTimeSec: 87.0, wpm: 132, isFiller: false }
    ],
  },
  acoustics: {
    pitch: {
      averageHz: 148.5,
      minHz: 102.0,
      maxHz: 215.0,
      standardDeviationHz: 28.4,
      variationRating: 'natural_balanced',
      timeSeries: [
        { timeSec: 0, pitchHz: 135 },
        { timeSec: 10, pitchHz: 158 },
        { timeSec: 20, pitchHz: 142 },
        { timeSec: 30, pitchHz: 165 },
        { timeSec: 40, pitchHz: 138 },
        { timeSec: 50, pitchHz: 172 },
        { timeSec: 60, pitchHz: 145 },
        { timeSec: 70, pitchHz: 152 },
        { timeSec: 80, pitchHz: 160 },
        { timeSec: 90, pitchHz: 130 },
        { timeSec: 100, pitchHz: 148 },
        { timeSec: 110, pitchHz: 155 },
        { timeSec: 120, pitchHz: 140 },
        { timeSec: 130, pitchHz: 168 },
        { timeSec: 140, pitchHz: 150 },
        { timeSec: 150, pitchHz: 138 },
        { timeSec: 165, pitchHz: 125 }
      ],
      coachingFeedback: "Your pitch inflection was natural and steady throughout your introductory and concluding statements. You showed healthy dynamics (σ = 28.4 Hz). To increase persuasive impact, try dropping your pitch slightly on key declarative claims like 'the transition speed is unprecedented'."
    },
    pace: {
      averageWpm: 139.2,
      paceRating: 'conversational_ideal',
      timeSeries: [
        { timeSec: 15, windowWpm: 145 },
        { timeSec: 30, windowWpm: 138 },
        { timeSec: 45, windowWpm: 152 },
        { timeSec: 60, windowWpm: 142 },
        { timeSec: 75, windowWpm: 135 },
        { timeSec: 90, windowWpm: 130 },
        { timeSec: 105, windowWpm: 141 },
        { timeSec: 120, windowWpm: 136 },
        { timeSec: 135, windowWpm: 144 },
        { timeSec: 150, windowWpm: 137 },
        { timeSec: 165, windowWpm: 132 }
      ],
      fastSections: [
        { startSec: 40, endSec: 50, wpm: 152 }
      ],
      slowSections: [
        { startSec: 85, endSec: 100, wpm: 124 }
      ],
      coachingFeedback: "Your overall pace of 139 WPM is within the ideal conversational bandwidth (130–160 WPM). You maintained steady cadence with only minor acceleration during the legal and financial examples."
    },
    pauses: {
      totalCount: 7,
      averageDurationSec: 1.15,
      longestPauseSec: 2.3,
      pauseRatePerMin: 2.5,
      deliberatePausesCount: 5,
      hesitationPausesCount: 2,
      pauseRating: 'well_timed',
      pauseEvents: [
        { startSec: 14.5, endSec: 15.3, durationSec: 0.8, type: 'deliberate' },
        { startSec: 26.0, endSec: 26.5, durationSec: 0.5, type: 'deliberate' },
        { startSec: 47.0, endSec: 47.5, durationSec: 0.5, type: 'deliberate' },
        { startSec: 57.0, endSec: 57.8, durationSec: 0.8, type: 'deliberate' },
        { startSec: 74.0, endSec: 75.0, durationSec: 1.0, type: 'deliberate' },
        { startSec: 110.2, endSec: 112.5, durationSec: 2.3, type: 'hesitation' },
        { startSec: 138.0, endSec: 139.8, durationSec: 1.8, type: 'hesitation' }
      ],
      coachingFeedback: "5 out of 7 pauses were deliberate rhetorical breaks at sentence boundaries. Work on eliminating the 2.3-second hesitation pause in the second half by anchoring your transition phrases."
    },
    fillerWords: {
      totalCount: 5,
      ratePerMinute: 1.8,
      mostFrequent: 'um',
      breakdown: [
        { word: 'um', count: 2 },
        { word: 'you know', count: 1 },
        { word: 'basically', count: 1 },
        { word: 'like', count: 1 }
      ],
      coachingFeedback: "Low filler frequency (1.8 fillers/min). Your most frequent filler was 'um'. Replacing 'basically' and 'you know' with silent pauses will immediately elevate your executive presence."
    }
  },
  contentAnalysis: {
    structure: {
      score: 84,
      hasClearIntroduction: true,
      hasStructuredBody: true,
      hasConclusion: true,
      feedback: "Strong three-act structure: compelling historical analogy in the hook, clear contrast between task automation and job automation, and a definitive concluding principle."
    },
    clarity: {
      score: 86,
      readabilityIndex: "College Graduate (Flesch-Kincaid: 12.4)",
      feedback: "Arguments were delivered with clarity and logical transitions. The distinction between physical and cognitive automation anchored the listener effectively."
    },
    vocabulary: {
      score: 79,
      typeTokenRatio: 0.68,
      advancedTermsUsed: ['Cognitive labor', 'Unprecedented', 'Augmentation', 'Friction', 'Distinction'],
      repetitiveWords: ['automation (4x)', 'replace (3x)'],
      feedback: "Good domain terminology. Try substituting repetitive uses of 'automation' with synonyms such as 'mechanization', 'algorithmic processing', or 'digital workflows'."
    },
    relevanceAndReasoning: {
      score: 83,
      onTopicAssessment: "Directly addressed the prompt with balanced arguments.",
      keyArgumentsIdentified: [
        'Historical precedent of muscle automation vs cognitive automation',
        'Task augmentation vs full job elimination',
        'Necessity of reskilling and social support policies'
      ],
      evidenceAndExamplesProvided: ['Legal document scanning', 'Financial modeling'],
      counterargumentsConsidered: true,
      reasoningDepthFeedback: "Sound deductive reasoning. To strengthen debate rigor, quantify the economic productivity gains or cite specific workforce retraining frameworks."
    }
  },
  knowledgeExploration: {
    unexploredSubtopics: [
      {
        title: "The Productivity Paradox & Wage Disparity",
        overview: "While AI boosts overall gross productivity, the economic surplus can concentrate heavily in capital rather than labor without wage-growth linkages."
      },
      {
        title: "International Regulatory Variations (EU AI Act vs US Market Approach)",
        overview: "Different jurisdictions regulate automated workforce displacement differently, impacting where AI firms deploy new white-collar automation tools."
      }
    ],
    followUpResearchQuestions: [
      "How did previous technological shifts (such as ATMs in banking) actually increase overall teller employment?",
      "What are the specific tax and fiscal policies economists recommend to offset cognitive labor automation?",
      "Why is the distinction between 'task automation' and 'role elimination' crucial for corporate organizational design?"
    ],
    keyLearningTakeaway: "Technological displacement is rarely an instantaneous cliff; it is an iterative reallocation of human time toward non-routine creative synthesis."
  },
  scores: {
    overall: 81,
    breakdown: {
      voiceModulation: 78,
      pitchVariation: 80,
      speakingPace: 88,
      pauses: 82,
      fillerWords: 84,
      clarity: 86,
      structure: 84,
      vocabulary: 79,
      contentReasoning: 83
    }
  },
  coachingActionItems: [
    "Replace 'basically' and 'you know' with a clean 1-second deliberate silence.",
    "Lower your vocal pitch slightly when stating your concluding thesis to convey authority.",
    "Introduce one specific historical statistic or case study during the body argument."
  ],
  nextRecommendedExercise: {
    title: "Deliberate Pause Calibration",
    objective: "Deliver a 2-minute speech on an opposing perspective while replacing every filler word with a silent breath pause.",
    targetMetric: "Filler Words < 1.0 / min & Deliberate Pause Ratio > 80%"
  },
  createdAt: '2025-01-22T14:30:00.000Z',
};

export const MOCK_HISTORY_SESSIONS: Array<{
  id: string;
  topicTitle: string;
  category: string;
  date: string;
  durationSec: number;
  overallScore: number;
  wpm: number;
  fillerCount: number;
  pitchStdDev: number;
}> = [
  { id: 'sess-1', topicTitle: 'Renewable Energy Grid Challenges', category: 'Environment', date: '2025-01-04', durationSec: 120, overallScore: 64, wpm: 172, fillerCount: 16, pitchStdDev: 14.2 },
  { id: 'sess-2', topicTitle: 'The Ethics of Self-Driving Cars', category: 'Technology', date: '2025-01-09', durationSec: 145, overallScore: 69, wpm: 161, fillerCount: 12, pitchStdDev: 18.5 },
  { id: 'sess-3', topicTitle: 'Remote Work vs In-Office Collaboration', category: 'Business', date: '2025-01-14', durationSec: 180, overallScore: 73, wpm: 154, fillerCount: 9, pitchStdDev: 22.1 },
  { id: 'sess-4', topicTitle: 'Universal Basic Income in the Age of AI', category: 'Society', date: '2025-01-18', durationSec: 150, overallScore: 77, wpm: 146, fillerCount: 7, pitchStdDev: 25.8 },
  { id: 'sess-5', topicTitle: 'Should AI Replace White-Collar Jobs?', category: 'AI', date: '2025-01-22', durationSec: 165, overallScore: 81, wpm: 139, fillerCount: 5, pitchStdDev: 28.4 },
];
