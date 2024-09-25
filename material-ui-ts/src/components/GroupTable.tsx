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
import { Group } from '../types';
import api from '../utils/api';

const GroupTable: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [open, setOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [formData, setFormData] = useState<Group>({
    id: 0, // Adjust according to your Group type
    name: ''
  });

  useEffect(() => {
    // Fetch groups data here
    const fetchGroups = async () => {
      try {
        const response = await api.get('/groups');
        console.log(response.data);
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleClickOpen = (group: Group | null) => {
    setCurrentGroup(group);
    setFormData(group || {
      id: 0,
      name: ''
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
    if (currentGroup) {
      // Update logic here
      api.put(`/groups/${currentGroup.id}`, formData).then((response) => {
          setGroups(groups.map((group) => group.id === currentGroup.id ? { ...formData, id: group.id } : group));
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error updating group:', error);
      });
    } else {
      // Create logic here
      api.post('/groups', formData).then((response) => {
        console.log('Group created:', response.data);
        formData.id = response.data.id;
          setGroups([...groups, formData]);
          setFormData({ ...formData });
      }).catch((error) => {
          console.error('Error creating group:', error);
      });
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    // Delete logic here
    api.delete(`/groups/${id}`).then(() => {
        setGroups(groups.filter((group) => group.id !== id));
    }).catch((error) => {
        console.error('Error deleting group:', error);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
          <Typography variant="h4">Group Table</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
            Create New Group
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell style={{ width: '20%', textAlign: 'left' }}>Name</TableCell>
              <TableCell style={{ width: '20%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                    <Box display="flex" justifyContent="center" gap="16px">
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(group)}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(group.id)}>
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
        <DialogTitle>{currentGroup ? 'Update Group' : 'Create New Group'}</DialogTitle>
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
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', gap: '16px' }}>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                {currentGroup ? 'Update' : 'Create'}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupTable;
