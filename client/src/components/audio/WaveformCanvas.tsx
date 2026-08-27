import React, { useEffect, useRef } from 'react';

interface WaveformCanvasProps {
  isRecording: boolean;
  isPaused?: boolean;
  analyser?: AnalyserNode | null;
  height?: number;
  barColor?: string;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  isRecording,
  isPaused = false,
  analyser = null,
  height = 140,
  barColor = '#4ECCD3',
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

    const numBars = 40;
    const bufferLength = analyser ? analyser.frequencyBinCount : numBars;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      ctx.clearRect(0, 0, rect.width, height);

      if (analyser && isRecording && !isPaused) {
        analyser.getByteFrequencyData(dataArray);
      }

      const totalSpacing = 4;
      const barWidth = Math.max(4, (rect.width - numBars * totalSpacing) / numBars);
      const centerY = height / 2;

      for (let i = 0; i < numBars; i++) {
        let normalizedHeight = 0.08; // Resting baseline height

        if (isRecording && !isPaused) {
          if (analyser) {
            const index = Math.floor((i / numBars) * (bufferLength / 2));
            const value = dataArray[index] || 0;
            normalizedHeight = Math.max(0.1, value / 255);
          } else {
            // Organic wave simulation fallback
            const wave1 = Math.sin(phaseRef.current + i * 0.25) * 0.35;
            const wave2 = Math.cos(phaseRef.current * 1.5 + i * 0.4) * 0.25;
            const envelope = Math.sin((i / numBars) * Math.PI);
            normalizedHeight = Math.max(0.12, (0.4 + wave1 + wave2) * envelope);
          }
        }

        const barH = Math.max(8, normalizedHeight * (height - 24));
        const x = i * (barWidth + totalSpacing) + 2;
        const y = centerY - barH / 2;

        // Neo-Brutalism bars: Vibrant fill with crisp solid black border
        const colors = ['#FFE600', '#FF6B6B', '#4ECCD3', '#A78BFA', '#51CF66'];
        const barFill = isRecording && !isPaused ? colors[i % colors.length] : barColor;

        ctx.fillStyle = barFill;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 3);
        ctx.fill();
        ctx.stroke();
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
  }, [isRecording, isPaused, analyser, height, barColor]);

  return (
    <div className="w-full relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-lg"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

