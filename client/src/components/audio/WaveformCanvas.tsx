import React, { useEffect, useRef } from 'react';

interface WaveformCanvasProps {
  isRecording: boolean;
  isPaused?: boolean;
  analyser?: AnalyserNode | null;
  height?: number;
  barColor?: string;
  glowColor?: string;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  isRecording,
  isPaused = false,
  analyser = null,
  height = 140,
  barColor = '#10b981',
  glowColor = 'rgba(16, 185, 129, 0.25)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const numBars = 48;
    const bufferLength = analyser ? analyser.frequencyBinCount : numBars;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      ctx.clearRect(0, 0, rect.width, height);

      if (analyser && isRecording && !isPaused) {
        analyser.getByteFrequencyData(dataArray);
      }

      const barWidth = Math.max(3, (rect.width / numBars) - 3);
      const centerY = height / 2;

      for (let i = 0; i < numBars; i++) {
        let normalizedHeight = 0.08; // Resting baseline height

        if (isRecording && !isPaused) {
          if (analyser) {
            const index = Math.floor((i / numBars) * (bufferLength / 2));
            const value = dataArray[index] || 0;
            normalizedHeight = Math.max(0.1, value / 255);
          } else {
            // Smooth synthesized organic speech wave animation
            const wave1 = Math.sin(phaseRef.current + i * 0.25) * 0.35;
            const wave2 = Math.cos(phaseRef.current * 1.5 + i * 0.4) * 0.25;
            const envelope = Math.sin((i / numBars) * Math.PI); // Taper edges
            normalizedHeight = Math.max(0.12, (0.4 + wave1 + wave2) * envelope);
          }
        }

        const barH = Math.max(6, normalizedHeight * (height - 20));
        const x = i * (barWidth + 3);
        const y = centerY - barH / 2;

        // Draw glowing gradient rounded bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
        gradient.addColorStop(0, '#34d399');
        gradient.addColorStop(0.5, barColor);
        gradient.addColorStop(1, '#059669');

        ctx.fillStyle = gradient;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isRecording && !isPaused ? 8 : 0;

        // Rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 4);
        ctx.fill();
      }

      if (isRecording && !isPaused) {
        phaseRef.current += 0.08;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRecording, isPaused, analyser, height, barColor, glowColor]);

  return (
    <div className="w-full relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-xl"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
