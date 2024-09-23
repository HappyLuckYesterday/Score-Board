import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Score } from '../types';

const ScoreTable: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    // Fetch scores data here
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '16px' }}>Score Table</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Group ID</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Create Time</TableCell>
            <TableCell>Update Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell>{score.id}</TableCell>
              <TableCell>{score.user_id}</TableCell>
              <TableCell>{score.group_id}</TableCell>
              <TableCell>{score.score}</TableCell>
              <TableCell>{score.create_time}</TableCell>
              <TableCell>{score.update_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
