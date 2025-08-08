import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

export default function Home() {
  const [profile, /* setProfile */] = useState(null);

  const handleCreateProfile = () => {
    alert('Redirigiendo a creación de perfil...');
  };

  const handleEditProfile = () => {
    alert('Redirigiendo a edición de perfil...');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {profile ? (

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={profile.avatarUrl || '/default-avatar.png'}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {profile.headline}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.location}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
              >
                Editar perfil
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">Acerca de</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {profile.about}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">Experiencia</Typography>
          {profile.experience?.map((exp, i) => (
            <Box key={i} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.company} — {exp.years}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Paper>
      ) : (

        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Avatar
            src="/default-avatar.png"
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              mb: 2,
            }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Aún no has creado tu perfil
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Comparte tu experiencia, educación y habilidades para que otros
            puedan conocerte mejor.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateProfile}
            sx={{ mt: 2 }}
          >
            Crear perfil
          </Button>
        </Paper>
      )}
    </Container>
  );
}
