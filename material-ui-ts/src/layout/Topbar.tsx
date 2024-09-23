// Topbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Topbar: React.FC = () => {
  const isLoggedIn = false; // Replace this with actual authentication logic

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Team Board
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit">Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
