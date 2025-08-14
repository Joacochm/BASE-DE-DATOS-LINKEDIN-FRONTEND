import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  maxHeight: "90vh",
  overflowY: "auto",
};

const validationSchema = yup.object({
  puesto: yup.string().required("El puesto es obligatorio"),
  empresa: yup.string().required("La empresa es obligatoria"),
  fechaInicio: yup
    .date()
    .required("Fecha de inicio es obligatoria")
    .typeError("Fecha inválida"),
  fechaFin: yup
    .date()
    .nullable()
    .min(yup.ref("fechaInicio"), "Fecha fin debe ser posterior a inicio")
    .typeError("Fecha inválida"),
  descripcion: yup.string().required("Descripción es obligatoria"),
  ubicacion: yup.string().required("Ubicación es obligatoria"),
  aptitudes: yup.string().required("Aptitudes son obligatorias"),
  cargo: yup.string().required("Cargo es obligatorio"),
});

const ExperienceModal = ({ open, onClose, onSubmit, initialData, userId }) => {
  const formik = useFormik({
    initialValues: {
      puesto: "",
      empresa: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: "",
      ubicacion: "",
      aptitudes: "",
      cargo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, userId });
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        puesto: initialData.puesto || "",
        empresa: initialData.empresa || "",
        fechaInicio: initialData.fechaInicio || "",
        fechaFin: initialData.fechaFin || "",
        descripcion: initialData.descripcion || "",
        ubicacion: initialData.ubicacion || "",
        aptitudes: initialData.aptitudes || "",
        cargo: initialData.cargo || "",
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleClose = () => {
    if (!initialData) {
      formik.resetForm();
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography id="modal-title" variant="h6" fontWeight={600}>
            {initialData ? "Editar experiencia" : "Añadir experiencia"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />

        {/* Form */}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Puesto"
              name="puesto"
              value={formik.values.puesto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.puesto && Boolean(formik.errors.puesto)}
              helperText={formik.touched.puesto && formik.errors.puesto}
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Empresa"
              name="empresa"
              value={formik.values.empresa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.empresa && Boolean(formik.errors.empresa)}
              helperText={formik.touched.empresa && formik.errors.empresa}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Fecha inicio"
                name="fechaInicio"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.fechaInicio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fechaInicio &&
                  Boolean(formik.errors.fechaInicio)
                }
                helperText={
                  formik.touched.fechaInicio && formik.errors.fechaInicio
                }
              />
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Fecha fin"
                name="fechaFin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.fechaFin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fechaFin && Boolean(formik.errors.fechaFin)
                }
                helperText={formik.touched.fechaFin && formik.errors.fechaFin}
              />
            </Stack>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Descripción"
              name="descripcion"
              multiline
              rows={3}
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.descripcion && Boolean(formik.errors.descripcion)
              }
              helperText={
                formik.touched.descripcion && formik.errors.descripcion
              }
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Ubicación"
              name="ubicacion"
              value={formik.values.ubicacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.ubicacion && Boolean(formik.errors.ubicacion)
              }
              helperText={formik.touched.ubicacion && formik.errors.ubicacion}
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Aptitudes"
              name="aptitudes"
              value={formik.values.aptitudes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.aptitudes && Boolean(formik.errors.aptitudes)
              }
              helperText={formik.touched.aptitudes && formik.errors.aptitudes}
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Cargo"
              name="cargo"
              value={formik.values.cargo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cargo && Boolean(formik.errors.cargo)}
              helperText={formik.touched.cargo && formik.errors.cargo}
            />

            <Divider sx={{ mt: 2 }} />

            {/* Actions */}
            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                {initialData ? "Guardar" : "Añadir"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExperienceModal;
