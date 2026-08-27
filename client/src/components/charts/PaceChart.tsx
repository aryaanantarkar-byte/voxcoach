import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';

interface PaceChartProps {
  data: Array<{ timeSec: number; windowWpm: number }>;
  averageWpm: number;
}

export const PaceChart: React.FC<PaceChartProps> = ({ data, averageWpm }) => {
  return (
    <div className="w-full h-64 font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          {/* Target Ideal Conversational Band: 130 - 160 WPM */}
          <ReferenceArea y1={130} y2={160} fill="#10b981" fillOpacity={0.08} />
          <XAxis
            dataKey="timeSec"
            stroke="#71717a"
            fontSize={11}
            tickFormatter={(val) => `${val}s`}
          />
          <YAxis
            domain={[90, 200]}
            stroke="#71717a"
            fontSize={11}
            tickFormatter={(val) => `${val}wpm`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const wpm = payload[0].value as number;
                const status = wpm > 160 ? 'Rushed' : wpm < 130 ? 'Slow' : 'Ideal';
                const statusColor = wpm > 160 ? 'text-amber-400' : wpm < 130 ? 'text-blue-400' : 'text-emerald-400';
                return (
                  <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                    <p className="text-zinc-400">Time: <span className="text-white font-semibold">{label}s</span></p>
                    <p className="text-white">Pace: <span className="font-semibold text-emerald-400">{wpm} WPM</span></p>
                    <p className={`text-[11px] ${statusColor}`}>Rating: {status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={averageWpm}
            stroke="#a855f7"
            strokeDasharray="4 4"
            label={{
              value: `Avg: ${Math.round(averageWpm)} WPM`,
              fill: '#a855f7',
              fontSize: 10,
              position: 'right',
            }}
          />
          <Line
            type="monotone"
            dataKey="windowWpm"
            stroke="#38bdf8"
            strokeWidth={2.5}
            dot={{ fill: '#38bdf8', r: 3 }}
            activeDot={{ r: 5, fill: '#38bdf8', stroke: '#09090b', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
