import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

interface FillerChartProps {
  breakdown: Array<{ word: string; count: number }>;
}

export const FillerChart: React.FC<FillerChartProps> = ({ breakdown }) => {
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6'];

  return (
    <div className="w-full h-64 font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={breakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
          <XAxis type="number" stroke="#71717a" fontSize={11} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="word"
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
            width={70}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                    <p className="text-zinc-400">Filler: <span className="text-rose-400 font-semibold">"{item.word}"</span></p>
                    <p className="text-white">Count: <span className="font-semibold">{item.count} times</span></p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {breakdown.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
