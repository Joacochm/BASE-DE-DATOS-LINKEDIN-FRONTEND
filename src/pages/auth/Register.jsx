
import React, { useState } from 'react';
import { TextField, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <AuthLayout title="Únete a LinkedIn Demo">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre completo" name="name" value={form.name} onChange={handleChange} fullWidth />
        <TextField label="Correo electrónico" name="email" value={form.email} onChange={handleChange} fullWidth />
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} fullWidth />
        <TextField label="Confirmar contraseña" name="confirm" type="password" value={form.confirm} onChange={handleChange} fullWidth />
        <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#0A66C2', '&:hover': { bgcolor: '#004182' } }}>
          Registrarse
        </Button>
        <Link component="button" onClick={() => navigate('/login')} underline="hover">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </Box>
    </AuthLayout>
  );
}
