import { IPauseEvent, IPitchIssue, IPitchPoint, ISpeechAcoustics } from '../types';

export interface IRecordedAudioAnalysis {
  durationSec: number;
  pitch: ISpeechAcoustics['pitch'];
  pauses: ISpeechAcoustics['pauses'];
  energy: ISpeechAcoustics['energy'];
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Extracts objective, local-only metrics from the recorded PCM stream.
 * No values are invented: unvoiced frames are omitted from pitch statistics,
 * and the caller can retain the transcript/content analysis separately.
 */
export const analyzeRecordedAudio = async (blob: Blob): Promise<IRecordedAudioAnalysis> => {
  const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextCtor) throw new Error('Web Audio analysis is not supported in this browser.');

  const context: AudioContext = new AudioContextCtor();
  try {
    const decoded = await context.decodeAudioData(await blob.arrayBuffer());
    const sampleRate = decoded.sampleRate;
    const samples = decoded.numberOfChannels === 1
      ? decoded.getChannelData(0)
      : Float32Array.from({ length: decoded.length }, (_, i) => {
          let sum = 0;
          for (let channel = 0; channel < decoded.numberOfChannels; channel += 1) sum += decoded.getChannelData(channel)[i];
          return sum / decoded.numberOfChannels;
        });
    const frameSize = 2048;
    const hop = 1024;
    const pitchFrames: Array<{ time: number; pitch: number; rms: number }> = [];
    const rmsValues: number[] = [];

    for (let start = 0; start + frameSize <= samples.length; start += hop) {
      let energy = 0;
      for (let i = 0; i < frameSize; i += 1) energy += samples[start + i] ** 2;
      const rms = Math.sqrt(energy / frameSize);
      rmsValues.push(rms);
      if (rms < 0.012) continue;

      const minLag = Math.floor(sampleRate / 500);
      const maxLag = Math.min(Math.floor(sampleRate / 70), frameSize - 1);
      let bestLag = 0;
      let bestCorrelation = 0;
      for (let lag = minLag; lag <= maxLag; lag += 1) {
        let correlation = 0;
        for (let i = 0; i < frameSize - lag; i += 1) correlation += samples[start + i] * samples[start + i + lag];
        if (correlation > bestCorrelation) { bestCorrelation = correlation; bestLag = lag; }
      }
      if (bestLag > 0 && bestCorrelation > energy * 0.18) {
        pitchFrames.push({ time: start / sampleRate, pitch: sampleRate / bestLag, rms });
      }
    }

    const pitches = pitchFrames.map(frame => frame.pitch);
    const averageHz = pitches.length ? pitches.reduce((sum, value) => sum + value, 0) / pitches.length : 0;
    const variance = pitches.length ? pitches.reduce((sum, value) => sum + (value - averageHz) ** 2, 0) / pitches.length : 0;
    const standardDeviationHz = Math.sqrt(variance);
    const minHz = pitches.length ? Math.min(...pitches) : 0;
    const maxHz = pitches.length ? Math.max(...pitches) : 0;
    const timeSeries: IPitchPoint[] = pitchFrames.map(frame => ({ timeSec: Number(frame.time.toFixed(2)), pitchHz: Number(frame.pitch.toFixed(1)) }));
    const issues: IPitchIssue[] = [];
    for (let i = 1; i < pitchFrames.length; i += 1) {
      const delta = Math.abs(pitchFrames[i].pitch - pitchFrames[i - 1].pitch);
      if (delta >= 45) {
        const start = pitchFrames[i - 1].time;
        const end = pitchFrames[i].time + frameSize / sampleRate;
        issues.push({
          id: `audio-pitch-jump-${i}`,
          title: 'Uneven pitch detected',
          timestampStartSec: start,
          timestampEndSec: end,
          formattedTimestamp: `${formatTime(start)} – ${formatTime(end)}`,
          whatHappened: `Pitch changed by approximately ${Math.round(delta)} Hz compared with the preceding voiced frame.`,
          whyItMatters: 'A sudden change can make the sentence sound less controlled, especially when it occurs inside an important point.',
          recommendation: 'Reset your breath, keep the baseline stable, and reserve larger pitch changes for intentional emphasis.',
          severity: delta >= 80 ? 'high' : 'medium',
          hasProfessionalExample: false,
        });
      }
    }
    const variationRating = standardDeviationHz < 8 ? 'monotone_flat' : standardDeviationHz > 55 ? 'erratic_spikes' : standardDeviationHz > 28 ? 'dynamic_expressive' : 'natural_balanced';
    const pitch: ISpeechAcoustics['pitch'] = {
      averageHz, minHz, maxHz, standardDeviationHz, variationRating, timeSeries, issues,
      coachingFeedback: pitches.length
        ? `Measured ${pitches.length} voiced frames. Average fundamental frequency was ${Math.round(averageHz)} Hz with a ${Math.round(standardDeviationHz * 10) / 10} Hz standard deviation.`
        : 'No reliable voiced pitch frames were detected in this recording.',
    };

    const silenceThreshold = 0.012;
    const pauseEvents: IPauseEvent[] = [];
    let silentStart: number | null = null;
    rmsValues.forEach((rms, index) => {
      const time = (index * hop) / sampleRate;
      if (rms < silenceThreshold && silentStart === null) silentStart = time;
      if (rms >= silenceThreshold && silentStart !== null) {
        const end = time;
        if (end - silentStart >= 0.55) pauseEvents.push({ startSec: silentStart, endSec: end, durationSec: end - silentStart, type: end - silentStart >= 1.5 ? 'hesitation' : 'deliberate' });
        silentStart = null;
      }
    });
    const totalPauseDuration = pauseEvents.reduce((sum, pause) => sum + pause.durationSec, 0);
    const pauses: ISpeechAcoustics['pauses'] = {
      totalCount: pauseEvents.length,
      averageDurationSec: pauseEvents.length ? totalPauseDuration / pauseEvents.length : 0,
      longestPauseSec: pauseEvents.length ? Math.max(...pauseEvents.map(pause => pause.durationSec)) : 0,
      pauseRatePerMin: decoded.duration ? pauseEvents.length / (decoded.duration / 60) : 0,
      deliberatePausesCount: pauseEvents.filter(pause => pause.type === 'deliberate').length,
      hesitationPausesCount: pauseEvents.filter(pause => pause.type === 'hesitation').length,
      pauseRating: pauseEvents.some(pause => pause.type === 'hesitation') ? 'excessive_hesitation' : 'well_timed',
      pauseEvents,
      coachingFeedback: `Detected ${pauseEvents.length} audible pause intervals from the waveform.`,
    };
    const dbValues = rmsValues.filter(Boolean).map(rms => 20 * Math.log10(rms));
    const averageDb = dbValues.length ? dbValues.reduce((sum, value) => sum + value, 0) / dbValues.length : -60;
    const energy: ISpeechAcoustics['energy'] = {
      averageDb,
      dynamicRangeDb: dbValues.length ? Math.max(...dbValues) - Math.min(...dbValues) : 0,
      projectionRating: averageDb > -18 ? 'confident_projected' : 'soft_spoken',
      coachingFeedback: `Measured average level ${Math.round(averageDb * 10) / 10} dB across the recording.`,
    };
    return { durationSec: decoded.duration, pitch, pauses, energy };
  } finally {
    await context.close();
  }
};
