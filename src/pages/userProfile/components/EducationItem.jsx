import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";

const EducationItem = ({ edu, onEdit, onDelete, isPlaceholder = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 2,
      p: 2,
      backgroundColor: isPlaceholder ? "#f5f5f5" : "white",
      borderRadius: 2,
      border: isPlaceholder ? "1px dashed #ccc" : "1px solid #e0e0e0",
      mb: 2,
      position: "relative",
      "&:hover": !isPlaceholder ? { backgroundColor: "rgba(0,0,0,0.04)" } : {},
      cursor: isPlaceholder ? "default" : "pointer",
    }}
    onClick={() => !isPlaceholder && onEdit(edu)}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        backgroundColor: isPlaceholder ? "#e0e0e0" : "#f0f0f0",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <SchoolIcon
        sx={{ color: isPlaceholder ? "#999" : "#666", fontSize: 24 }}
      />
    </Box>
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color={isPlaceholder ? "text.secondary" : "text.primary"}
      >
        {edu.titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {edu.institucion}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {edu.fecha || `${edu.fechaInicio || ""} - ${edu.fechaFin || ""}`}
      </Typography>
      {edu.nota && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.5 }}
        >
          Nota: {edu.nota}
        </Typography>
      )}
    </Box>

    {!isPlaceholder && (
      <IconButton
        size="small"
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(edu.id);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          },
        }}
        title="Eliminar educación"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);

export default EducationItem;
