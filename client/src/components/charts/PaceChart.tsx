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
    <div className="w-full h-64 font-sans p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          {/* Target Ideal Conversational Band: 130 - 160 WPM */}
          <ReferenceArea y1={130} y2={160} fill="#FFE600" fillOpacity={0.3} stroke="#000000" strokeWidth={1} strokeDasharray="2 2" />
          <XAxis
            dataKey="timeSec"
            stroke="#000000"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `${val}s`}
          />
          <YAxis
            domain={[90, 200]}
            stroke="#000000"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `${val}wpm`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const wpm = payload[0].value as number;
                const status = wpm > 160 ? 'Rushed' : wpm < 130 ? 'Slow' : 'Ideal';
                return (
                  <div className="bg-[#69D2E7] border-2 border-black p-2.5 rounded-lg shadow-neo-sm text-xs font-mono text-black font-bold">
                    <p>Time: {label}s</p>
                    <p>Pace: {wpm} WPM</p>
                    <p>Rating: {status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={averageWpm}
            stroke="#FF6B6B"
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{
              value: `Avg: ${Math.round(averageWpm)} WPM`,
              fill: '#000000',
              fontSize: 11,
              fontWeight: 'bold',
              position: 'right',
            }}
          />
          <Line
            type="monotone"
            dataKey="windowWpm"
            stroke="#000000"
            strokeWidth={3}
            dot={{ fill: '#69D2E7', r: 5, stroke: '#000000', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#FFE600', stroke: '#000000', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

