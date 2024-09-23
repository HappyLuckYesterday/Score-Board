import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { User } from '../types';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users data here
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '16px' }}>User Table</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Nickname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.nick_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>{user.active_flag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
