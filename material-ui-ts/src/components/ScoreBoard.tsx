import React, { useEffect } from 'react';
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
import api from '../utils/api';

const data: DataPoint[] = [
  { date: '2024-09-01', group: 1, user: "John", subject: "earn", score: 200 },
  { date: '2024-09-01', group: 1, user: "Bob", subject: "earn", score: 200 },
  { date: '2024-09-02', group: 1, user: "John", subject: "earn", score: 300 },
  { date: '2024-09-02', group: 1, user: "Bob", subject: "earn", score: 200 },
  { date: '2024-09-03', group: 1, user: "John", subject: "earn", score: 400 },
  { date: '2024-09-03', group: 1, user: "Bob", subject: "earn", score: 200 },
  { date: '2024-09-04', group: 1, user: "John", subject: "earn", score: 350 },
  { date: '2024-09-05', group: 1, user: "John", subject: "earn", score: 450 },
  { date: '2024-09-01', group: 2, user: "Alice", subject: "earn", score: 100 },
  { date: '2024-09-02', group: 2, user: "Alice", subject: "earn", score: 200 },
  { date: '2024-09-02', group: 2, user: "Mike", subject: "earn", score: 200 },
  { date: '2024-09-03', group: 2, user: "Alice", subject: "earn", score: 300 },
  { date: '2024-09-04', group: 2, user: "Alice", subject: "earn", score: 450 },
  { date: '2024-09-04', group: 2, user: "Mike", subject: "earn", score: -200 },
  { date: '2024-09-05', group: 2, user: "Alice", subject: "earn", score: 350 },
];

interface DataPoint {
  date: string;
  group: number;
  user: string;
  subject: string;
  score: number;
}

interface ChartData {
  date: string;
  [key: string]: number | string; // Dynamic keys for group scores
}

const Scoreboard: React.FC = () => {
  const chartDataMap: { [key: string]: { group: number; score: number }[] } = {};
  const accumulatedScores: { [key: number]: number } = {};
  const detailedScores: { [key: string]: { user: string; group: number; score: number }[] } = {};

  useEffect(() => {
    api.get('/scores/detail/detail').then((response) => {
      const data = response.data;
      console.log(data);
    });
  },[])

  // Processing data to accumulate scores
  data.forEach(({ date, group, user, score }) => {
    // Initialize group score if it doesn't exist
    if (!accumulatedScores[group]) {
      accumulatedScores[group] = 0;
    }
    
    // Update accumulated score
    accumulatedScores[group] += score;

    // Prepare chart data
    if (!chartDataMap[date]) {
      chartDataMap[date] = [];
    }
    const existingGroup = chartDataMap[date].find(item => item.group === group);
    if (existingGroup) {
      existingGroup.score = accumulatedScores[group]; // Update accumulated score for the date
    } else {
      chartDataMap[date].push({ group, score: accumulatedScores[group] });
    }

    // Collect detailed scores for tooltip
    if (!detailedScores[date]) {
      detailedScores[date] = [];
    }
    detailedScores[date].push({ user, group, score });
  });

  const chartData: ChartData[] = Object.entries(chartDataMap).map(([date, scores]) => ({
    date,
    ...Object.fromEntries(scores.map(({ group, score }) => [`Group ${group}`, score]))
  }));

  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      const userDetails = detailedScores[label].map(({ user, group, score }) => (
        <p key={`${group}-${user}`}>Group {group}: {score} by {user}</p>
      ));
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <p>{label}</p>
          {userDetails}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={renderTooltip} />
        <Legend />
        {Array.from(new Set(data.map(d => d.group))).map((group, index) => (
          <Line
            key={group}
            type="monotone"
            dataKey={`Group ${group}`}
            stroke={index % 2 === 0 ? 'red' : 'blue'} // Alternate red and blue colors
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Scoreboard;
