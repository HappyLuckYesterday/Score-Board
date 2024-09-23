import React, { useState } from 'react';
import { Box, Button, TextField, Container, Typography, List, ListItem } from '@mui/material';

interface Subject {
  name: string;
  duedate: string;
  score: number;
}

const SubjectBoard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: 'Math', duedate: '2024-12-01', score: 90 },
    { name: 'Science', duedate: '2024-11-15', score: 85 },
  ]);

  const [newSubject, setNewSubject] = useState('');
  const [duedate, setDuedate] = useState('');

  const handleCreateSubject = () => {
    setSubjects([...subjects, { name: newSubject, duedate, score: 0 }]);
    setNewSubject('');
    setDuedate('');
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Subject Board</Typography>
        <TextField
          label="Subject Name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Due Date"
          type="date"
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreateSubject}>
          Create Subject
        </Button>

        <List sx={{ mt: 4 }}>
          {subjects.map((subject, index) => (
            <ListItem key={index}>
              {subject.name} - Due: {subject.duedate} - Score: {subject.score}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default SubjectBoard;
