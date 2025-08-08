
import React, { useState } from 'react';
import { TextField, Button, Box, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthLayout title="Restablecer contraseña">
      {sent && <Alert severity="success">Correo de recuperación enviado</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#0A66C2', '&:hover': { bgcolor: '#004182' } }}>
          Enviar enlace
        </Button>
        <Link component="button" onClick={() => navigate('/login')} underline="hover">
          Volver al login
        </Link>
      </Box>
    </AuthLayout>
  );
}
