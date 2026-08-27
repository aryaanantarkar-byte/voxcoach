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
  const colors = ['#FF6B6B', '#69D2E7', '#FFE600', '#A78BFA', '#51CF66'];

  return (
    <div className="w-full h-64 font-sans p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={breakdown} margin={{ top: 10, right: 15, left: -10, bottom: 0 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={false} />
          <XAxis type="number" stroke="#000000" fontSize={11} tickLine={false} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="word"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            width={80}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-[#FF6B6B] border-2 border-black p-2.5 rounded-lg shadow-neo-sm text-xs font-mono text-black font-bold">
                    <p>Filler: "{item.word}"</p>
                    <p>Count: {item.count} times</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} stroke="#000000" strokeWidth={2}>
            {breakdown.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

