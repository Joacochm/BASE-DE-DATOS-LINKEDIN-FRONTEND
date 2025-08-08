// src/components/NavBar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';

export default function NavBar() {
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <IconButton edge="start" sx={{ p: 0 }}>
            <Avatar src="/Linkedin.png" alt="logo" />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo LinkedIn
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#eef3f8', px: 1.5, py: 0.5, borderRadius: 2 }}>
            <SearchIcon />
            <InputBase placeholder="Buscar" sx={{ ml: 1 }} />
          </Box>

          <IconButton>
            <WorkIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
