// Topbar.tsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Topbar: React.FC = () => {
  const { token } = useAuth();
  const isLoggedIn = (token != null); // Replace this with actual authentication logic
  console.log("token:", token);
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, mr: 5 }}>
            Score Board
          </Typography>
        </Link>
        <Link to="/worktimeboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Work Time
          </Typography>
        </Link>
        <Box sx={{ ml: 'auto' }}> {/* This will push the buttons to the right */}
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
              <Button color="inherit" component={Link} to="/logout">Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
