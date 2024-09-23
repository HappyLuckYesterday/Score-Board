import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Subscribe } from '../types';

const SubscribeTable: React.FC = () => {
  const [subscribes, setSubscribes] = useState<Subscribe[]>([]);

  useEffect(() => {
    // Fetch subscribes data here
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '16px' }}>Subscribe Table</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Subject ID</TableCell>
            <TableCell>Create Time</TableCell>
            <TableCell>Update Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribes.map((subscribe) => (
            <TableRow key={subscribe.id}>
              <TableCell>{subscribe.id}</TableCell>
              <TableCell>{subscribe.user_id}</TableCell>
              <TableCell>{subscribe.subject_id}</TableCell>
              <TableCell>{subscribe.create_time}</TableCell>
              <TableCell>{subscribe.update_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscribeTable;
