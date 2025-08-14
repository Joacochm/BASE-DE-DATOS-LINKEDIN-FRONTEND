import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Link,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { createUser } from "../../store/slices/usersSlice";
import { fetchCountries } from "../../store/slices/countriesSlice";
import { handleApiError } from "../../utils/errorHandler";
import FormLayout from "../../components/FormLayout";
import { toast } from "react-toastify";
import { fetchDepartmentsApi } from "../../api/departmentsApi"; // Ajusta ruta

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es obligatorio"),
  email: Yup.string().email("Email inválido").required("Email es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es obligatorio"),
  direccion: Yup.string().required("Dirección es obligatoria"),
  telefono: Yup.string().required("Teléfono es obligatorio"),
  sexo: Yup.string().required("Sexo es obligatorio"),
  identificacion: Yup.string().required("Identificación es obligatoria"),
  paisId: Yup.string().required("País es obligatorio"),
  departamentoId: Yup.string().required("Departamento es obligatorio"),
  municipioId: Yup.string().required("Municipio es obligatorio"),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries, loading } = useSelector((state) => state.countries);

  // Estados para departamentos y municipios
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryChange = async (paisId, setFieldValue) => {
    if (!paisId) {
      setDepartamentos([]);
      setMunicipios([]);
      setFieldValue("departamentoId", "");
      setFieldValue("municipioId", "");
      return;
    }

    try {
      const data = await fetchDepartmentsApi(paisId);
      setDepartamentos(data || []);
      setMunicipios([]);
      setFieldValue("departamentoId", "");
      setFieldValue("municipioId", "");
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar departamentos.");
      setDepartamentos([]);
      setMunicipios([]);
      setFieldValue("departamentoId", "");
      setFieldValue("municipioId", "");
    }
  };

  const handleDepartmentChange = (departamentoId, setFieldValue) => {
    const departamento = departamentos.find((d) => d.id === departamentoId);
    if (departamento) {
      setMunicipios(departamento.municipios || []);
      setFieldValue("municipioId", "");
    } else {
      setMunicipios([]);
      setFieldValue("municipioId", "");
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    direccion: "",
    telefono: "",
    sexo: "",
    identificacion: "",
    paisId: "",
    departamentoId: "",
    municipioId: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirm: _confirm, ...userData } = values;
      await dispatch(createUser(userData)).unwrap();
      toast.success("Se han registrado correctamente tus datos.");
      navigate("/login");
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormLayout title="Únete a LinkedIn">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Field
                  name="name"
                  as={TextField}
                  label="Nombre completo"
                  fullWidth
                  helperText={<ErrorMessage name="name" />}
                />
              </Box>
              <Box flex={1}>
                <Field
                  name="email"
                  as={TextField}
                  label="Correo electrónico"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Field
                  name="password"
                  as={TextField}
                  label="Contraseña"
                  type="password"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                />
              </Box>
              <Box flex={1}>
                <Field
                  name="confirm"
                  as={TextField}
                  label="Confirmar contraseña"
                  type="password"
                  fullWidth
                  helperText={<ErrorMessage name="confirm" />}
                />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Field
                  name="direccion"
                  as={TextField}
                  label="Dirección"
                  fullWidth
                  helperText={<ErrorMessage name="direccion" />}
                />
              </Box>
              <Box flex={1}>
                <Field
                  name="telefono"
                  as={TextField}
                  label="Teléfono"
                  fullWidth
                  helperText={<ErrorMessage name="telefono" />}
                />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Field
                  name="sexo"
                  as={TextField}
                  label="Sexo"
                  select
                  fullWidth
                  helperText={<ErrorMessage name="sexo" />}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Field>
              </Box>
              <Box flex={1}>
                <Field
                  name="identificacion"
                  as={TextField}
                  label="Identificación"
                  fullWidth
                  helperText={<ErrorMessage name="identificacion" />}
                />
              </Box>
            </Box>

            {/* País */}
            <Box mb={2}>
              <Field
                name="paisId"
                as={TextField}
                label="País"
                select
                fullWidth
                helperText={<ErrorMessage name="paisId" />}
                onChange={(e) => {
                  const val = e.target.value;
                  setFieldValue("paisId", val);
                  handleCountryChange(val, setFieldValue);
                }}
                value={values.paisId}
              >
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                    Cargando países...
                  </MenuItem>
                ) : (
                  countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.nombre} ({country.codigo})
                    </MenuItem>
                  ))
                )}
              </Field>
            </Box>

            {/* Departamento */}
            <Box mb={2}>
              <Field
                name="departamentoId"
                as={TextField}
                label="Departamento"
                select
                fullWidth
                helperText={<ErrorMessage name="departamentoId" />}
                onChange={(e) => {
                  const val = e.target.value;
                  setFieldValue("departamentoId", val);
                  handleDepartmentChange(val, setFieldValue);
                }}
                value={values.departamentoId}
                disabled={!departamentos.length}
              >
                {departamentos.length === 0 ? (
                  <MenuItem disabled>No hay departamentos</MenuItem>
                ) : (
                  departamentos.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.nombre}
                    </MenuItem>
                  ))
                )}
              </Field>
            </Box>

            {/* Municipio */}
            <Box mb={2}>
              <Field
                name="municipioId"
                as={TextField}
                label="Municipio"
                select
                fullWidth
                helperText={<ErrorMessage name="municipioId" />}
                value={values.municipioId}
                disabled={!municipios.length}
                onChange={(e) => setFieldValue("municipioId", e.target.value)}
              >
                {municipios.length === 0 ? (
                  <MenuItem disabled>No hay municipios</MenuItem>
                ) : (
                  municipios.map((mun) => (
                    <MenuItem key={mun.id} value={mun.id}>
                      {mun.nombre}
                    </MenuItem>
                  ))
                )}
              </Field>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  bgcolor: "#0A66C2",
                  "&:hover": { bgcolor: "#004182" },
                  py: 1.5,
                  minWidth: 150,
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Registrarse"
                )}
              </Button>

              <Link
                component="button"
                onClick={() => navigate("/login")}
                underline="hover"
                color="inherit"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
}
