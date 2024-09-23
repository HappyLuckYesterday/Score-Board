import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Subject } from '../types';

const SubjectTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // Fetch subjects data here
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '16px' }}>Subject Table</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Accept</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.id}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.description}</TableCell>
              <TableCell>{subject.due_date}</TableCell>
              <TableCell>{subject.score}</TableCell>
              <TableCell>{subject.accept}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectTable;
