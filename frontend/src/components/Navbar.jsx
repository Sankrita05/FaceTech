// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ManageAccountsIcon style={{ fontSize: 50, color: '#131d41' }} />
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          FaceTech
        </Typography>
        </Box>
        
        <Box>
          <Button color="inherit" onClick={() => navigate('/face-detection')}>Detection</Button>
          <Button color="inherit" onClick={() => navigate('/face-recognition')}>Recognition</Button>
          <Button color="inherit" onClick={() => navigate('/face-similarity')}>Similarity</Button>
          <Button color="inherit" onClick={() => navigate('/expression-recognition')}>Expression</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
