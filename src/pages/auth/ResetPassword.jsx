import React from 'react';
import { TextField, Button, Box, Link, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../../components/AuthLayout';
import { changePassword } from '../../api/resetPassword';

// Esquema de validación con Yup
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('Campo requerido'),
  nuevaContrasena: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Campo requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('nuevaContrasena'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar tu contraseña')
});

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await changePassword({
        email: values.email,
        nuevaContrasena: values.nuevaContrasena
      });

      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Restablecer contraseña">
      <Typography variant="body1" sx={{ mb: 2 }}>
        Ingresa tu correo electrónico y tu nueva contraseña.
      </Typography>
      
      <Formik
        initialValues={{
          email: '',
          nuevaContrasena: '',
          confirmPassword: ''
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Campo de email */}
              <Field
                as={TextField}
                name="email"
                label="Correo electrónico"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              
              <Field
                as={TextField}
                name="nuevaContrasena"
                label="Nueva contraseña"
                type="password"
                fullWidth
                error={touched.nuevaContrasena && Boolean(errors.nuevaContrasena)}
                helperText={touched.nuevaContrasena && errors.nuevaContrasena || 'Mínimo 8 caracteres'}
              />
              
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                fullWidth
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ bgcolor: '#0A66C2', '&:hover': { bgcolor: '#004182' } }}
              >
                {isSubmitting ? 'Procesando...' : 'Restablecer contraseña'}
              </Button>
              
              <Link component="button" onClick={() => navigate('/login')} underline="hover">
                Volver al login
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}