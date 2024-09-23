import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { Score } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data: DataPoint[] = [
  { date: '2024-09-01', group: 1, score: 200 },
  { date: '2024-09-02', group: 1, score: 300 },
  { date: '2024-09-03', group: 1, score: 400 },
  { date: '2024-09-04', group: 1, score: 350 },
  { date: '2024-09-05', group: 1, score: 450 },
  { date: '2024-09-01', group: 2, score: 100 },
  { date: '2024-09-02', group: 2, score: 200 },
  { date: '2024-09-03', group: 2, score: 300 },
  { date: '2024-09-04', group: 2, score: 450 },
  { date: '2024-09-05', group: 2, score: 350 },
  { date: '2024-09-01', group: 3, score: 300 },
  { date: '2024-09-02', group: 3, score: 200 },
  { date: '2024-09-03', group: 3, score: 320 },
  { date: '2024-09-04', group: 3, score: 390 },
  { date: '2024-09-05', group: 3, score: 250 },
];

interface DataPoint {
  date: string;
  group: number;
  score: number;
}

interface ChartData {
  date: string;
  [key: string]: number | string; // Dynamic keys for group scores
}

const Scoreboard: React.FC = () => {
  const chartDataMap: { [key: string]: { group: string; score: number }[] } = {};

  data.forEach(({ date, group, score }) => {
    if (!chartDataMap[date]) {
      chartDataMap[date] = [];
    }
    chartDataMap[date].push({ group: `Group ${group}`, score });
  });

  const chartData: ChartData[] = Object.entries(chartDataMap).map(([date, scores]) => ({
    date,
    ...Object.fromEntries(scores.map(({ group, score }) => [group, score]))
  }));

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={chartData} margin={{ top: 200, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Array.from(new Set(data.map(d => d.group))).map(group => (
          <Line
            key={group}
            type="monotone"
            dataKey={`Group ${group}`}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each group
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};export default Scoreboard;
