import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CloseIcon from "@mui/icons-material/Close";

// Componente ExperienceItem
const ExperienceItem = ({ exp, onEdit, onDelete, isPlaceholder = false }) => (
  <Box
    sx={{
      position: "relative",
      cursor: isPlaceholder ? "default" : "pointer",
      display: "flex",
      alignItems: "flex-start",
      gap: 2,
      p: 2,
      backgroundColor: isPlaceholder ? "#f5f5f5" : "white",
      borderRadius: 2,
      border: isPlaceholder ? "1px dashed #ccc" : "1px solid #e0e0e0",
      mb: 2,
      "&:hover": !isPlaceholder ? { backgroundColor: "rgba(0,0,0,0.04)" } : {},
    }}
    onClick={() => !isPlaceholder && onEdit(exp)}
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
      <WorkIcon sx={{ color: isPlaceholder ? "#999" : "#666", fontSize: 24 }} />
    </Box>
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color={isPlaceholder ? "text.secondary" : "text.primary"}
      >
        {exp.puesto}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {exp.empresa}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {exp.fecha || `${exp.fechaInicio || ""} - ${exp.fechaFin || ""}`}
      </Typography>
    </Box>

    {!isPlaceholder && (
      <IconButton
        size="small"
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(exp.id);
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
        title="Eliminar experiencia"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);

export default ExperienceItem;
