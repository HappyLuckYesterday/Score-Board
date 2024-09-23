import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { date: '2024-09-01', score: 200 },
  { date: '2024-09-02', score: 300 },
  { date: '2024-09-03', score: 400 },
  { date: '2024-09-04', score: 350 },
  { date: '2024-09-05', score: 450 },
];

const totalScore = 1500; // Replace with actual calculation
const totalUsers = 100;  // Replace with actual count
const today = new Date().toLocaleDateString();

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Dashboard</Typography>

        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Score</Typography>
              <Typography variant="h4">{totalScore}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Today's Date</Typography>
              <Typography variant="h4">{today}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4, height: 400 }}>
          <Typography variant="h6">Score Growth</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
