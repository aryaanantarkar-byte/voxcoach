/**
 * Audio Synthesis Service for VoxCoach
 * Uses Web Speech API (window.speechSynthesis) to demonstrate recommended professional speech delivery
 * with calibrated pitch, tempo, and emphasis without faking audio generation.
 */

export interface SpeechSynthOptions {
  pitch?: number; // 0 to 2 (default 1.0)
  rate?: number; // 0.1 to 10 (default 1.0)
  volume?: number; // 0 to 1 (default 1.0)
  voiceName?: string;
}

export const isSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

export const speakProfessionalReference = (
  text: string,
  options: SpeechSynthOptions = {},
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  if (!isSynthesisSupported()) {
    if (onError) onError('Web Speech API is not supported in this browser environment.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = options.pitch ?? 0.95; // Slightly lower, authoritative baseline
  utterance.rate = options.rate ?? 0.92; // Deliberate, confident pace (~140 WPM)
  utterance.volume = options.volume ?? 1.0;

  // Try to select an English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopProfessionalReference = (): void => {
  if (isSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};
