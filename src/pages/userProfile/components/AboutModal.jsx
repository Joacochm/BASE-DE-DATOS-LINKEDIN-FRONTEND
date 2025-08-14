// components/AboutModal.js
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
  titular: yup.string().required("El título profesional es obligatorio"),
  acercaDe: yup
    .string()
    .required("La descripción es obligatoria")
    .max(500, "Máximo 500 caracteres"),
  ubicacion: yup.string().required("La ubicación es obligatoria"),
  enlaceSitioWeb: yup.string().url("Debe ser una URL válida").nullable(),
});

const AboutModal = ({ open, onClose, onSubmit, initialData, userId }) => {
  const formik = useFormik({
    initialValues: {
      titular: "",
      acercaDe: "",
      ubicacion: "",
      enlaceSitioWeb: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, userId });
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        titular: initialData.titular || "",
        acercaDe: initialData.acercaDe || "",
        ubicacion: initialData.ubicacion || "",
        enlaceSitioWeb: initialData.enlaceSitioWeb || "",
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleClose = () => {
    if (!initialData) {
      formik.resetForm();
    } else {
      formik.setValues({
        titular: initialData.titular || "",
        acercaDe: initialData.acercaDe || "",
        ubicacion: initialData.ubicacion || "",
        enlaceSitioWeb: initialData.enlaceSitioWeb || "",
      });
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
            Editar información personal
          </Typography>
          <IconButton onClick={handleClose} size="small">
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
              label="Título profesional"
              name="titular"
              value={formik.values.titular}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.titular && Boolean(formik.errors.titular)}
              helperText={formik.touched.titular && formik.errors.titular}
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Acerca de"
              name="acercaDe"
              multiline
              rows={4}
              value={formik.values.acercaDe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.acercaDe && Boolean(formik.errors.acercaDe)}
              helperText={formik.touched.acercaDe && formik.errors.acercaDe}
              inputProps={{ maxLength: 500 }}
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
              label="Sitio web (opcional)"
              name="enlaceSitioWeb"
              placeholder="https://tusitio.com"
              value={formik.values.enlaceSitioWeb}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.enlaceSitioWeb &&
                Boolean(formik.errors.enlaceSitioWeb)
              }
              helperText={
                formik.touched.enlaceSitioWeb && formik.errors.enlaceSitioWeb
              }
            />

            <Divider sx={{ mt: 2 }} />

            {/* Actions */}
            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default AboutModal;
