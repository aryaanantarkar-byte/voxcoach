import { useState, useRef, useCallback, useEffect } from 'react';

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  secondsSpoken: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  micActive: boolean;
  micError: string | null;
  analyser: AnalyserNode | null;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  toggleMute: () => void;
  resetRecorder: () => void;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [secondsSpoken, setSecondsSpoken] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [micError, setMicError] = useState<string | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Clean up timer
  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Start timer
  const startTimer = useCallback(() => {
    stopTimer();
    timerIntervalRef.current = setInterval(() => {
      setSecondsSpoken((prev) => prev + 1);
    }, 1000);
  }, [stopTimer]);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setMicError(null);
      audioChunksRef.current = [];
      setSecondsSpoken(0);
      setAudioBlob(null);
      setAudioUrl(null);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      // Set up Web Audio API AudioContext & AnalyserNode
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const sourceNode = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.8;
      sourceNode.connect(analyserNode);

      setAnalyser(analyserNode);

      // Set up MediaRecorder
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus' }
        : MediaRecorder.isTypeSupported('audio/webm')
        ? { mimeType: 'audio/webm' }
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? { mimeType: 'audio/mp4' }
        : undefined;

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(200); // collect 200ms slices
      setIsRecording(true);
      setIsPaused(false);
      setMicActive(true);
      startTimer();
    } catch (err: any) {
      console.error('Failed to start microphone recording:', err);
      const errorMsg =
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Please allow microphone access in your browser settings.'
          : err.name === 'NotFoundError'
          ? 'No microphone input device found. Please connect a microphone.'
          : 'Could not access microphone: ' + (err.message || 'Unknown error');
      setMicError(errorMsg);
    }
  }, [startTimer]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  }, [stopTimer]);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  }, [startTimer]);

  // Stop recording
  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      stopTimer();

      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        setIsRecording(false);
        setIsPaused(false);
        resolve(audioBlob);
        return;
      }

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);
        setIsRecording(false);
        setIsPaused(false);

        // Clean up media stream tracks
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }

        // Close AudioContext
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
          audioContextRef.current = null;
        }

        setAnalyser(null);
        resolve(blob);
      };

      mediaRecorder.stop();
    });
  }, [stopTimer, audioBlob]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    }
  }, []);

  // Reset
  const resetRecorder = useCallback(() => {
    stopTimer();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsRecording(false);
    setIsPaused(false);
    setSecondsSpoken(0);
    setAudioBlob(null);
    setAudioUrl(null);
    setMicActive(true);
    setMicError(null);
    setAnalyser(null);
  }, [stopTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopTimer]);

  return {
    isRecording,
    isPaused,
    secondsSpoken,
    audioBlob,
    audioUrl,
    micActive,
    micError,
    analyser,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    toggleMute,
    resetRecorder,
  };
};
