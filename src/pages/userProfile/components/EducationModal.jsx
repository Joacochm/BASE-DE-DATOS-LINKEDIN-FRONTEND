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
  titulo: yup.string().required("El título es obligatorio"),
  institucion: yup.string().required("La institución es obligatoria"),
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
  aptitudes: yup.string().required("Aptitudes son obligatorias"),
  nota: yup.string(),
  disciplina_academia: yup.string().required("Disciplina es obligatoria"),
});

const EducationModal = ({ open, onClose, onSubmit, initialData, userId }) => {
  const formik = useFormik({
    initialValues: {
      titulo: "",
      institucion: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: "",
      aptitudes: "",
      nota: "",
      disciplina_academia: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, userId });
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        titulo: initialData.titulo || "",
        institucion: initialData.institucion || "",
        fechaInicio: initialData.fechaInicio || "",
        fechaFin: initialData.fechaFin || "",
        descripcion: initialData.descripcion || "",
        aptitudes: initialData.aptitudes || "",
        nota: initialData.nota || "",
        disciplina_academia: initialData.disciplina_academia || "",
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
            {initialData ? "Editar educación" : "Añadir educación"}
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
              label="Título académico"
              name="titulo"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.titulo && Boolean(formik.errors.titulo)}
              helperText={formik.touched.titulo && formik.errors.titulo}
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Institución educativa"
              name="institucion"
              value={formik.values.institucion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.institucion && Boolean(formik.errors.institucion)}
              helperText={formik.touched.institucion && formik.errors.institucion}
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
                error={formik.touched.fechaInicio && Boolean(formik.errors.fechaInicio)}
                helperText={formik.touched.fechaInicio && formik.errors.fechaInicio}
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
                error={formik.touched.fechaFin && Boolean(formik.errors.fechaFin)}
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
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Aptitudes adquiridas"
              name="aptitudes"
              multiline
              rows={2}
              value={formik.values.aptitudes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aptitudes && Boolean(formik.errors.aptitudes)}
              helperText={formik.touched.aptitudes && formik.errors.aptitudes}
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Nota/Promedio"
              name="nota"
              value={formik.values.nota}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nota && Boolean(formik.errors.nota)}
              helperText={formik.touched.nota && formik.errors.nota}
            />

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Disciplina académica"
              name="disciplina_academia"
              value={formik.values.disciplina_academia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.disciplina_academia && Boolean(formik.errors.disciplina_academia)}
              helperText={formik.touched.disciplina_academia && formik.errors.disciplina_academia}
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

export default EducationModal;