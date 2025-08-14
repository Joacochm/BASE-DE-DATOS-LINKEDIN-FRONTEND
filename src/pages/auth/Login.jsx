import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Link,
  CircularProgress,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/slices/authLoginSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email inválido")
    .required("Correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string" ? error : error.message || "Error desconocido"
      );
    }
  }, [error]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitAttempted(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      await dispatch(authLogin(values)).unwrap();
    } catch (validationErrors) {
      if (validationErrors.inner) {
        const formErrors = validationErrors.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Inicia sesión">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                as={TextField}
                name="email"
                label="Correo electrónico"
                type="email"
                fullWidth
                error={submitAttempted && Boolean(errors.email)}
                helperText={submitAttempted && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={submitAttempted && Boolean(errors.password)}
                helperText={submitAttempted && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ bgcolor: "#0A66C2", "&:hover": { bgcolor: "#004182" } }}
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Link
          component="button"
          onClick={() => navigate("/cambio-contraseña")}
          underline="hover"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Link
          component="button"
          onClick={() => navigate("/registro")}
          underline="hover"
        >
          ¿Nuevo en la plataforma? Únete ahora
        </Link>
      </Box>
    </AuthLayout>
  );
}
