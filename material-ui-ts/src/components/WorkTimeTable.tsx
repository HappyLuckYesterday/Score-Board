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
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { WorkTime, Subject, User } from '../types';
import api from '../utils/api';

const WorkTimeTable: React.FC = () => {
  const [worktimes, setWorkTimes] = useState<WorkTime[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentWorkTime, setCurrentWorkTime] = useState<WorkTime | null>(null);
  const [formData, setFormData] = useState<WorkTime>({
    id: 0,
    user_id: 0,
    date: '',
    work_time: 0,
  });

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getSubjectNameById = (id: number) => {
    const foundObject = subjects.find(item => item.id === id);
    return foundObject ? foundObject.name : null;
  };

  const getUserNameById = (id: number) => {
    if (id === 0) {
      return "All";
    }
    const foundObject = users.find(item => item.user_id === id);
    return foundObject ? foundObject.name : null;
  };

  const convertDateFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
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
      date: getTodayDate(),
      work_time: 15
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (currentWorkTime) {
      api.put(`/worktimes/${currentWorkTime.id}`, formData).then((response) => {
          setWorkTimes(worktimes.map((worktime) => worktime.id === currentWorkTime.id ? { ...formData, id: worktime.id } : worktime));
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error updating worktime:', error);
      });
    } else {
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
              <TableCell style={{ width: '20%', textAlign: 'left' }}>User</TableCell>
              <TableCell style={{ width: '30%', textAlign: 'left' }}>Date</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'left' }}>WorkTime</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {worktimes.map((worktime) => (
              <TableRow key={worktime.id}>
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
          <FormControl fullWidth sx={{ mt: 1, minWidth: 120 }}>
            <InputLabel id="user-select-label">User Name</InputLabel>
            <Select
              labelId="user-select-label"
              name="user_id"
              id="user-select"
              label="User Name"
              value={formData.user_id}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {users.map((user) => (
                <MenuItem key={user.user_id} value={user.user_id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2, minWidth: 120 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                format="YYYY-MM-DD"
                value={dayjs(formData.date)}
                onChange={(newValue) => setFormData({ ...formData, date: newValue ? newValue.format('YYYY-MM-DD') : '' })}
              />
            </LocalizationProvider>
          </FormControl>
          <TextField
            margin="normal"
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
