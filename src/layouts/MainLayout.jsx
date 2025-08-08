import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { Box, Typography, Container } from '@mui/material';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* NavBar */}
      <NavBar />

      {/* Contenido principal */}
      <Box component="main" sx={{ flex: 1, py: 2, px: 5 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#f3f2ef',
          borderTop: '1px solid #ddd',
          py: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} LinkedIn Demo — Base de Datos II
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
