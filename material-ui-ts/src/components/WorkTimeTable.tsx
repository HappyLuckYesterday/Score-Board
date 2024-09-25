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
import { WorkTime, Subject, User } from '../types';
import api from '../utils/api';

const WorkTimeTable: React.FC = () => {
  const [worktimes, setWorkTimes] = useState<WorkTime[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentWorkTime, setCurrentWorkTime] = useState<WorkTime | null>(null);
  const [formData, setFormData] = useState<WorkTime>({
    id: 0, // Adjust according to your WorkTime type
    user_id: 0,
    date: '',
    work_time: 0,
  });

  const getSubjectNameById = (id: number) => {
    const foundObject = subjects.find(item => item.id === id);
    return foundObject ? foundObject.name : null; // Return name or null if not found
  };

  const getUserNameById = (id: number) => {
    if (id === 0) {
      return "All";
    }
    const foundObject = users.find(item => item.user_id === id);
    return foundObject ? foundObject.name : null; // Return name or null if not found
  };

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

  useEffect(() => {
    // Fetch worktimes data here
    const fetchWorkTimes = async () => {
      try {
        const users = await api.get('/users');
        setUsers(users.data);
        const subj = await api.get('/subjects');
        setSubjects(subj.data);
        const response = await api.get('/worktimes');
        setWorkTimes(response.data);
      } catch (error) {
        console.error('Error fetching worktimes:', error);
      }
    };

    fetchWorkTimes();
  }, []);

  const handleClickOpen = (worktime: WorkTime | null) => {
    setCurrentWorkTime(worktime);
    setFormData(worktime || {
      id: 0,
      user_id: 0,
      date: '',
      work_time: 0
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
    if (currentWorkTime) {
      // Update logic here
      api.put(`/worktimes/${currentWorkTime.id}`, formData).then((response) => {
          setWorkTimes(worktimes.map((worktime) => worktime.id === currentWorkTime.id ? { ...formData, id: worktime.id } : worktime));
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error updating worktime:', error);
      });
    } else {
      // Create logic here
      api.post('/worktimes', formData).then((response) => {
        console.log('WorkTime created:', response.data);
        formData.id = response.data.id;
          setWorkTimes([...worktimes, formData]);
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error creating worktime:', error);
      });
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    // Delete logic here
    api.delete(`/worktimes/${id}`).then(() => {
        setWorkTimes(worktimes.filter((worktime) => worktime.id !== id));
    }).catch((error) => {
        console.error('Error deleting worktime:', error);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
          <Typography variant="h4">WorkTime Table</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
            Create New WorkTime
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell style={{ width: '20%', textAlign: 'left' }}>User</TableCell>
              <TableCell style={{ width: '30%', textAlign: 'left' }}>Date</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'left' }}>WorkTime</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {worktimes.map((worktime) => (
              <TableRow key={worktime.id}>
                {/* <TableCell>{worktime.id}</TableCell> */}
                <TableCell>{getUserNameById(worktime.user_id)}</TableCell>
                <TableCell>{convertDateFormat(worktime.date)}</TableCell>
                <TableCell>{worktime.work_time}</TableCell>
                <TableCell>
                    <Box display="flex" justifyContent="center" gap="16px">
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(worktime)}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(worktime.id)}>
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
        <DialogTitle>{currentWorkTime ? 'Update WorkTime' : 'Create New WorkTime'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="user_id"
            label="Name"
            type="text"
            fullWidth
            value={formData.user_id}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="date"
            label="Date"
            type="text"
            fullWidth
            value={formData.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="work_time"
            label="WorkTime"
            type="number"
            fullWidth
            value={formData.work_time}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                {currentWorkTime ? 'Update' : 'Create'}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkTimeTable;
