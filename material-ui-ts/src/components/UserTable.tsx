import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { User } from '../types';
import api from '../utils/api';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: 0, // Adjust according to your User type
    user_id: 0,
    name: '',
    nick_name: '',
    email: '',
    role: "User",
    group_id: 0,
    active_flag: "N"
  });

  useEffect(() => {
    // Fetch users data here
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleClickOpen = (user: User | null) => {
    setCurrentUser(user);
    setFormData(user || {
      id: 0,
      user_id: 0,
      name: '',
      nick_name: '',
      email: '',
      role: "User",
      group_id: 0,
      active_flag: "N"
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (currentUser) {
      // Update logic here
      api.put(`/users/${currentUser.id}`, formData).then((response) => {
          setUsers(users.map((user) => user.id === currentUser.id ? { ...formData, id: user.id } : user));
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error updating user:', error);
      });
    } else {
      // Create logic here
      api.post('/users', formData).then((response) => {
        console.log('User created:', response.data);
        formData.id = response.data.id;
          setUsers([...users, formData]);
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error creating user:', error);
      });
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    // Delete logic here
    api.delete(`/users/${id}`).then(() => {
        setUsers(users.filter((user) => user.id !== id));
    }).catch((error) => {
        console.error('Error deleting user:', error);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
          <Typography variant="h4">User Table</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
            Create New User
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell style={{ width: '20%', textAlign: 'left' }}>Name</TableCell>
              <TableCell style={{ width: '40%', textAlign: 'left' }}>Nick Name</TableCell>
              {/* <TableCell>Due Date</TableCell> */}
              <TableCell style={{ width: '15%', textAlign: 'left' }}>Email</TableCell>
              <TableCell style={{ width: '15%', textAlign: 'left' }}>Group</TableCell>
              <TableCell style={{ width: '15%', textAlign: 'left' }}>Role</TableCell>
              <TableCell style={{ width: '15%', textAlign: 'left' }}>Accept</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {/* <TableCell>{user.id}</TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.nick_name}</TableCell>
                {/* <TableCell>{user.due_date}</TableCell> */}
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.group_id}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active_flag ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                    <Box display="flex" justifyContent="center" gap="16px">
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(user)}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                            Delete
                        </Button>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser ? 'Update User' : 'Create New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nick_name"
            label="Nick Name"
            type="text"
            fullWidth
            value={formData.nick_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="group_id"
            label="Group"
            type="text"
            fullWidth
            value={formData.group_id}
            onChange={handleChange}
          />
          {/* <TextField
            margin="dense"
            name="score"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          /> */}
          <Select
            margin="dense"
            name="accept"
            label="Accept"
            value={formData.active_flag}
            onChange={(e) => setFormData({ ...formData, active_flag: e.target.value as "Y" | "N" })}
            fullWidth
          >
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                {currentUser ? 'Update' : 'Create'}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
