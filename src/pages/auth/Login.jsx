
import React, { useState } from 'react';
import { TextField, Button, Box, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === 'demo@demo.com' && form.password === '123456') {
      navigate('/');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <AuthLayout title="Inicia sesión">
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Correo electrónico" name="email" value={form.email} onChange={handleChange} fullWidth />
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} fullWidth />
        <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#0A66C2', '&:hover': { bgcolor: '#004182' } }}>
          Iniciar sesión
        </Button>
        <Link component="button" onClick={() => navigate('/reset-password')} underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link component="button" onClick={() => navigate('/register')} underline="hover">
          ¿Nuevo en la plataforma? Únete ahora
        </Link>
      </Box>
    </AuthLayout>
  );
}
