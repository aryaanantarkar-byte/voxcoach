export type TopicCategory =
  | 'Technology'
  | 'AI'
  | 'Science'
  | 'Environment'
  | 'Business'
  | 'Finance'
  | 'History'
  | 'Philosophy'
  | 'Society'
  | 'Current Affairs'
  | 'Debate'
  | 'Interview'
  | 'College'
  | 'Random';

export type SpeakingMode = 'casual' | 'presentation' | 'debate' | 'interview' | 'impromptu';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ITopic {
  id: string;
  title: string;
  category: TopicCategory;
  mode: SpeakingMode;
  difficulty: DifficultyLevel;
  explanation: string;
  keyConcepts: string[];
  suggestedResearchQuestions: string[];
  usefulKeywords: string[];
  recommendedSources?: { title: string; url?: string }[];
  isAiGenerated: boolean;
  createdAt?: string;
}

export interface ITranscriptSegment {
  text: string;
  startTimeSec: number;
  endTimeSec: number;
  wpm: number;
  isFiller: boolean;
  fillerWord?: string;
}

export interface IPitchPoint {
  timeSec: number;
  pitchHz: number;
}

export interface IPauseEvent {
  startSec: number;
  endSec: number;
  durationSec: number;
  type: 'deliberate' | 'hesitation';
}

export interface IPitchIssue {
  id: string;
  title: string;
  timestampStartSec: number;
  timestampEndSec: number;
  formattedTimestamp: string;
  whatHappened: string;
  whyItMatters: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
  hasProfessionalExample: boolean;
  originalText?: string;
  professionalExampleText?: string;
  recommendedStyleDesc?: string;
}

export interface IProfessionalExample {
  issueId: string;
  originalText: string;
  professionalText: string;
  styleDescription: string;
  targetMetrics: {
    pitchHz: number;
    wpm: number;
    pauseRatio: number;
  };
}

export interface IAnalysisCategoryResult {
  id: string;
  categoryKey: 'pitch' | 'pace' | 'pauses' | 'fillers' | 'energy' | 'fluency' | 'clarity' | 'vocabulary' | 'structure' | 'reasoning';
  title: string;
  score: number;
  maxScore: number;
  shortInterpretation: string;
  keyFinding: string;
  severity: 'excellent' | 'good' | 'warning' | 'critical';
  formattedTimestamp?: string;
  timestampSec?: number;
  detailedAnalysis: {
    problematicSection?: string;
    whyItMatters: string;
    howToImprove: string;
    metricsSummary: string;
  };
  hasProfessionalExample: boolean;
  professionalExample?: IProfessionalExample;
}

export interface ISpeechAcoustics {
  pitch: {
    averageHz: number;
    minHz: number;
    maxHz: number;
    standardDeviationHz: number;
    variationRating: 'monotone_flat' | 'natural_balanced' | 'dynamic_expressive' | 'erratic_spikes';
    timeSeries: IPitchPoint[];
    issues: IPitchIssue[];
    coachingFeedback: string;
  };
  pace: {
    averageWpm: number;
    paceRating: 'too_slow' | 'measured_calm' | 'conversational_ideal' | 'brisk' | 'rushed';
    timeSeries: Array<{ timeSec: number; windowWpm: number }>;
    fastSections: Array<{ startSec: number; endSec: number; wpm: number }>;
    slowSections: Array<{ startSec: number; endSec: number; wpm: number }>;
    coachingFeedback: string;
  };
  pauses: {
    totalCount: number;
    averageDurationSec: number;
    longestPauseSec: number;
    pauseRatePerMin: number;
    deliberatePausesCount: number;
    hesitationPausesCount: number;
    pauseRating: 'lacking_pauses' | 'well_timed' | 'excessive_hesitation';
    pauseEvents: IPauseEvent[];
    coachingFeedback: string;
  };
  fillerWords: {
    totalCount: number;
    ratePerMinute: number;
    mostFrequent: string;
    breakdown: Array<{ word: string; count: number }>;
    coachingFeedback: string;
  };
  energy: {
    averageDb: number;
    dynamicRangeDb: number;
    projectionRating: 'soft_spoken' | 'confident_projected' | 'strained_loud';
    coachingFeedback: string;
  };
  fluency: {
    smoothnessScore: number;
    falseStartsCount: number;
    articulationIndex: number;
    coachingFeedback: string;
  };
}

export interface IContentAnalysis {
  structure: {
    score: number;
    hasClearIntroduction: boolean;
    hasStructuredBody: boolean;
    hasConclusion: boolean;
    feedback: string;
  };
  clarity: {
    score: number;
    readabilityIndex: string;
    feedback: string;
  };
  vocabulary: {
    score: number;
    typeTokenRatio: number;
    advancedTermsUsed: string[];
    repetitiveWords: string[];
    feedback: string;
  };
  relevanceAndReasoning: {
    score: number;
    onTopicAssessment: string;
    keyArgumentsIdentified: string[];
    evidenceAndExamplesProvided: string[];
    counterargumentsConsidered: boolean;
    reasoningDepthFeedback: string;
  };
}

export interface IKnowledgeExploration {
  unexploredSubtopics: Array<{ title: string; overview: string }>;
  followUpResearchQuestions: string[];
  keyLearningTakeaway: string;
}

export interface ICoachingScores {
  overall: number;
  breakdown: {
    voiceModulation: number;
    pitchVariation: number;
    speakingPace: number;
    pauses: number;
    fillerWords: number;
    energy: number;
    fluency: number;
    clarity: number;
    vocabulary: number;
    structure: number;
    contentReasoning: number;
  };
}


export interface ISpeechSession {
  id: string;
  userId: string;
  topic: {
    topicId?: string;
    title: string;
    category: TopicCategory;
    difficulty: DifficultyLevel;
    mode: SpeakingMode;
  };
  preparationNotes?: string;
  speakingDurationSeconds: number;
  transcript: {
    fullText: string;
    wordCount: number;
    segments: ITranscriptSegment[];
  };
  acoustics: ISpeechAcoustics;
  contentAnalysis: IContentAnalysis;
  knowledgeExploration: IKnowledgeExploration;
  scores: ICoachingScores;
  coachingActionItems: string[];
  nextRecommendedExercise: {
    title: string;
    objective: string;
    targetMetric: string;
  };
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    defaultPrepDuration: number;
    targetWpmMin: number;
    targetWpmMax: number;
  };
  createdAt: string;
}
