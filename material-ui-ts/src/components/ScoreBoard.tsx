import React, { useEffect, useState } from 'react';
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

interface DataPoint {
  date: string;
  group: number;
  user: string;
  subject: string;
  score: number;
}

interface Detail {
  user: string;
  group: number;
  score: number;
  subject: string;
}

interface GroupData {
  group: number;
  score: number;
  details: Detail[];
}

interface ChartData {
  date: string;
  [key: string]: number | string | Detail[]; // Allow for dynamic keys, including details
}

const Scoreboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    api.get('/scores/detail/detail').then((response) => {
      const fetchedData: DataPoint[] = response.data.map((item: any) => ({
        date: item.create_date,
        group: item.group_id,
        user: item.user_name,
        subject: item.subject_name,
        score: item.score,
      }));

      // Sort data by date
      fetchedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const accumulatedScores: { [key: number]: number } = {};
      const chartDataMap: { [key: string]: GroupData[] } = {};

      fetchedData.forEach(({ date, group, user, score, subject }) => {
        if (!accumulatedScores[group]) {
          accumulatedScores[group] = 0;
        }

        accumulatedScores[group] += score;

        if (!chartDataMap[date]) {
          chartDataMap[date] = [];
        }
        const existingGroup = chartDataMap[date].find(item => item.group === group);
        if (existingGroup) {
          existingGroup.score = accumulatedScores[group];
          existingGroup.details.push({ user, group, score, subject });
        } else {
          chartDataMap[date].push({
            group,
            score: accumulatedScores[group],
            details: [{ user, group, score, subject }],
          });
        }
      });

      const startDate = new Date("2024-09-24");
      const endDate = new Date("2024-10-24");

      const convertDateFormat = (isoDate: string) => {
        const date = new Date(isoDate);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      };

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (!chartDataMap[convertDateFormat(d.toString())]) {
          chartDataMap[convertDateFormat(d.toString())] = [];
        }
      }

      const newchartData: ChartData[] = Object.entries(chartDataMap)
        .map(([date, scores]) => ({
          date,
          ...Object.fromEntries(scores.map(({ group, score }) => [`Group ${group}`, score])),
          details: scores.flatMap(groupData => groupData.details), // Flatten details for tooltip
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setChartData(newchartData);
    });
  }, []);

  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      const groupDetails = chartData.find(data => data.date === label);
      if (groupDetails) {
        return (
          <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
            <p>{label}</p>
            {Object.keys(groupDetails)
              .filter(key => key.startsWith('Group'))
              .map(groupKey => {
                const groupScore = groupDetails[groupKey] as number; // Ensure it's treated as a number
                const details = groupDetails.details as Detail[]; // Assert details as Detail[]

                return (
                  <div key={groupKey}>
                    <strong>{groupKey}: {groupScore}</strong>
                    <div>
                      {Array.isArray(details) && details.map((detail: Detail, index: number) => (
                        "Group "+detail.group == groupKey && <p key={`${detail.user}-${index}`}>
                          {detail.user} get {detail.score >= 0 ? `+${detail.score}` : detail.score} by {detail.subject}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={renderTooltip} />
        <Legend />
        <Line type="monotone" dataKey="Group 1" stroke="#8884d8" />
        <Line type="monotone" dataKey="Group 2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Scoreboard;
