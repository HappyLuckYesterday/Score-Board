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
import { Score, Subject, User } from '../types';
import api from '../utils/api';

const ScoreTable: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState<Score | null>(null);
  const [formData, setFormData] = useState<Score>({
    id: 0, // Adjust according to your Score type
    user_id: 0,
    group_id: 0,
    score: 0,
    subject_id: 0,
    description: '',
    create_time: '',
    create_id: 0,
    update_time: '',
    update_id: 0,
  });

  const getSubjectNameById = (id: number) => {
    const foundObject = subjects.find(item => item.id === id);
    return foundObject ? foundObject.name : null; // Return name or null if not found
  };

  const getUserNameById = (id: number) => {
    if (id === 0) {
      return "All";
    }
    const foundObject = users.find(item => item.id === id);
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
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    // Fetch scores data here
    const fetchScores = async () => {
      try {
        const users = await api.get('/users');
        setUsers(users.data);
        const subj = await api.get('/subjects');
        setSubjects(subj.data);
        const response = await api.get('/scores');
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  const handleClickOpen = (score: Score | null) => {
    setCurrentScore(score);
    setFormData(score || {
      id: 0,
      user_id: 0,
      group_id: 0,
      score: 0,
      subject_id: 0,
      description: '',
      create_time: '',
      create_id: 0,
      update_time: '',
      update_id: 0,
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
    if (currentScore) {
      // Update logic here
      api.put(`/scores/${currentScore.id}`, formData).then((response) => {
          setScores(scores.map((score) => score.id === currentScore.id ? { ...formData, id: score.id } : score));
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error updating score:', error);
      });
    } else {
      // Create logic here
      api.post('/scores', formData).then((response) => {
        console.log('Score created:', response.data);
        formData.id = response.data.id;
          setScores([...scores, formData]);
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error creating score:', error);
      });
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    // Delete logic here
    api.delete(`/scores/${id}`).then(() => {
        setScores(scores.filter((score) => score.id !== id));
    }).catch((error) => {
        console.error('Error deleting score:', error);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
          <Typography variant="h4">Score Table</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
            Create New Score
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell style={{ width: '10%', textAlign: 'left' }}>User</TableCell>
              <TableCell style={{ width: '10%', textAlign: 'left' }}>Group</TableCell>
              <TableCell style={{ width: '5%', textAlign: 'left' }}>Score</TableCell>
              <TableCell style={{ width: '10%', textAlign: 'left' }}>Subject</TableCell>
              <TableCell style={{ width: '30%', textAlign: 'left' }}>Description</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'left' }}>Create Time</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score) => (
              <TableRow key={score.id}>
                {/* <TableCell>{score.id}</TableCell> */}
                <TableCell>{getUserNameById(score.user_id)}</TableCell>
                <TableCell>{score.group_id}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{getSubjectNameById(score.subject_id)}</TableCell>
                <TableCell>{score.description}</TableCell>
                <TableCell>{convertDateFormat(score.create_time)}</TableCell>
                <TableCell>
                    <Box display="flex" justifyContent="center" gap="16px">
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(score)}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(score.id)}>
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
        <DialogTitle>{currentScore ? 'Update Score' : 'Create New Score'}</DialogTitle>
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
            name="group_id"
            label="Group"
            type="text"
            fullWidth
            value={formData.group_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="score"
            label="Score"
            type="number"
            fullWidth
            value={formData.score}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="subject_id"
            label="Subject"
            type="text"
            fullWidth
            value={formData.subject_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                {currentScore ? 'Update' : 'Create'}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScoreTable;
