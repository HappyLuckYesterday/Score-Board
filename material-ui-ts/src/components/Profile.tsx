import React, { useState } from 'react';
import { Box, Button, TextField, Container, Typography } from '@mui/material';

const Profile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAvatar(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle profile update logic
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5">Update Profile</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Avatar
            <input type="file" hidden onChange={handleAvatarUpload} />
          </Button>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
