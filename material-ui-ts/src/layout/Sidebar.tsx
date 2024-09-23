// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Avatar, Typography, Divider } from '@mui/material';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <div style={{ textAlign: 'center', margin: '0' }}>
        <Avatar
          src="/team1.png" // Replace with the image path
          alt="Team Logo"
          sx={{ width: 240, height: 180, margin: 'auto', borderRadius: '0%' }}
        />
      </div>

      <Divider />

      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem component={Link} to="/scoreboard">
          <ListItemText primary="Scoreboard" />
        </ListItem>
        <ListItem component={Link} to="/user-table">
          <ListItemText primary="User Table" />
        </ListItem>
        <ListItem component={Link} to="/score-table">
          <ListItemText primary="Score Table" />
        </ListItem>
        <ListItem component={Link} to="/group-table">
          <ListItemText primary="Group Table" />
        </ListItem>
        <ListItem component={Link} to="/subject-table">
          <ListItemText primary="Subject Table" />
        </ListItem>
        <ListItem component={Link} to="/subscribe-table">
          <ListItemText primary="Subscribe Table" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;