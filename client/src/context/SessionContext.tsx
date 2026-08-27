import React, { createContext, useContext, useState, useEffect } from 'react';
import { ITopic, ISpeechSession } from '../types';
import { MOCK_TOPICS, MOCK_SAMPLE_SESSION, MOCK_HISTORY_SESSIONS, MOCK_USER } from '../services/mockData';

interface SessionContextType {
  user: typeof MOCK_USER;
  currentTopic: ITopic | null;
  setCurrentTopic: (topic: ITopic | null) => void;
  prepNotes: string;
  setPrepNotes: (notes: string) => void;
  prepDurationSeconds: number;
  setPrepDurationSeconds: (seconds: number) => void;
  currentSession: ISpeechSession | null;
  setCurrentSession: (session: ISpeechSession | null) => void;
  sessionsHistory: typeof MOCK_HISTORY_SESSIONS;
  addSessionToHistory: (session: ISpeechSession) => void;
  allTopics: ITopic[];
  addCustomTopic: (topic: ITopic) => void;
  recordedAudioBlob: Blob | null;
  setRecordedAudioBlob: (blob: Blob | null) => void;
  recordedAudioUrl: string | null;
  setRecordedAudioUrl: (url: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState(MOCK_USER);
  const [allTopics, setAllTopics] = useState<ITopic[]>(MOCK_TOPICS);
  const [currentTopic, setCurrentTopic] = useState<ITopic | null>(() => {
    const saved = localStorage.getItem('voxcoach_active_topic');
    return saved ? JSON.parse(saved) : MOCK_TOPICS[0];
  });
  const [prepNotes, setPrepNotes] = useState<string>(() => {
    return localStorage.getItem('voxcoach_prep_notes') || '';
  });
  const [prepDurationSeconds, setPrepDurationSeconds] = useState<number>(300); // 5 minutes default
  const [currentSession, setCurrentSession] = useState<ISpeechSession | null>(MOCK_SAMPLE_SESSION);
  const [sessionsHistory, setSessionsHistory] = useState(MOCK_HISTORY_SESSIONS);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentTopic) {
      localStorage.setItem('voxcoach_active_topic', JSON.stringify(currentTopic));
    }
  }, [currentTopic]);

  useEffect(() => {
    localStorage.setItem('voxcoach_prep_notes', prepNotes);
  }, [prepNotes]);

  const addSessionToHistory = (session: ISpeechSession) => {
    const newEntry = {
      id: session.id,
      topicTitle: session.topic.title,
      category: session.topic.category,
      date: new Date().toISOString().split('T')[0],
      durationSec: session.speakingDurationSeconds,
      overallScore: session.scores.overall,
      wpm: Math.round(session.acoustics.pace.averageWpm),
      fillerCount: session.acoustics.fillerWords.totalCount,
      pitchStdDev: session.acoustics.pitch.standardDeviationHz,
    };
    setSessionsHistory((prev) => [newEntry, ...prev]);
    setCurrentSession(session);
  };

  const addCustomTopic = (topic: ITopic) => {
    setAllTopics((prev) => [topic, ...prev]);
    setCurrentTopic(topic);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        currentTopic,
        setCurrentTopic,
        prepNotes,
        setPrepNotes,
        prepDurationSeconds,
        setPrepDurationSeconds,
        currentSession,
        setCurrentSession,
        sessionsHistory,
        addSessionToHistory,
        allTopics,
        addCustomTopic,
        recordedAudioBlob,
        setRecordedAudioBlob,
        recordedAudioUrl,
        setRecordedAudioUrl,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
