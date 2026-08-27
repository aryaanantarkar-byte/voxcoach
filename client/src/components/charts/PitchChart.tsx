import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { IPitchPoint } from '../../types';

interface PitchChartProps {
  data: IPitchPoint[];
  averageHz: number;
}

export const PitchChart: React.FC<PitchChartProps> = ({ data, averageHz }) => {
  return (
    <div className="w-full h-64 font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="pitchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey="timeSec"
            stroke="#71717a"
            fontSize={11}
            tickFormatter={(val) => `${val}s`}
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke="#71717a"
            fontSize={11}
            tickFormatter={(val) => `${val}Hz`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                    <p className="text-zinc-400">Time: <span className="text-white font-semibold">{label}s</span></p>
                    <p className="text-emerald-400 font-semibold">Pitch: {payload[0].value} Hz</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={averageHz}
            stroke="#38bdf8"
            strokeDasharray="4 4"
            label={{
              value: `Avg: ${Math.round(averageHz)}Hz`,
              fill: '#38bdf8',
              fontSize: 10,
              position: 'right',
            }}
          />
          <Area
            type="monotone"
            dataKey="pitchHz"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#pitchGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
