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
import { Subject } from '../types';
import api from '../utils/api';

const SubjectTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState<Subject>({
    id: 0, // Adjust according to your Subject type
    name: '',
    description: '',
    due_date: '',
    score: 0,
    accept: "N",
    create_time: '',
    create_id: 0,
  });

  useEffect(() => {
    // Fetch subjects data here
    
  }, []);

  const handleClickOpen = (subject: Subject | null) => {
    setCurrentSubject(subject);
    setFormData(subject || {
      id: 0,
      name: '',
      description: '',
      due_date: '',
      score: 0,
      accept: "N",
      create_time: '',
      create_id: 0,
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
    if (currentSubject) {
      // Update logic here
      setSubjects(subjects.map((subject) => subject.id === currentSubject.id ? { ...formData, id: subject.id } : subject));
      setFormData({ ...formData });
    } else {
      // Create logic here
      const newSubject: Subject = { ...formData, id: subjects.length + 1 };
      setSubjects([...subjects, newSubject]);
      setFormData({ ...formData });
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    // Delete logic here
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
          <Typography variant="h4">Subject Table</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
            Create New Subject
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Accept</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>{subject.accept ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleClickOpen(subject)}>
                    Update
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(subject.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSubject ? 'Update Subject' : 'Create New Subject'}</DialogTitle>
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
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="due_date"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.due_date}
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
          <Select
            margin="dense"
            name="accept"
            label="Accept"
            value={formData.accept}
            onChange={(e) => setFormData({ ...formData, accept: e.target.value as "Y" | "N" })}
            fullWidth
          >
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentSubject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubjectTable;
