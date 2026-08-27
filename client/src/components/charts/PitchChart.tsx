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
    <div className="w-full h-64 font-sans p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="pitchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#69D2E7" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#69D2E7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          <XAxis
            dataKey="timeSec"
            stroke="#000000"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `${val}s`}
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke="#000000"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `${val}Hz`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#FFE600] border-2 border-black p-2.5 rounded-lg shadow-neo-sm text-xs font-mono text-black font-bold">
                    <p>Time: {label}s</p>
                    <p className="text-black">Pitch: {payload[0].value} Hz</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={averageHz}
            stroke="#FF6B6B"
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{
              value: `Avg: ${Math.round(averageHz)}Hz`,
              fill: '#000000',
              fontSize: 11,
              fontWeight: 'bold',
              position: 'right',
            }}
          />
          <Area
            type="monotone"
            dataKey="pitchHz"
            stroke="#000000"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#pitchGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

