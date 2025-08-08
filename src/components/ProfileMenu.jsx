import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goToProfile = () => {
    navigate("/perfil");
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          mt: 1,
          pl: 2,
          userSelect: "none",
          width: 48,
        }}
        onClick={handleClick}
      >
        <Avatar
          src="/default-avatar.png"
          sx={{
            width: 32,
            height: 32,
            border: "2px solid white",
            mb: 0.5,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Yo
          </Typography>
          <ArrowDropDownIcon fontSize="small" />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 280, p: 1 } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            px: 2,
            py: 0.5,
            gap: 2,
          }}
        >
          <Avatar src="/default-avatar.png" sx={{ width: 48, height: 48 }} />
          <Typography variant="subtitle1" noWrap>
            Fernando Suazo
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 1,
            px: 2,
            pb: 2,
            display: "flex",
            gap: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={goToProfile}
          >
            Ver perfil
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            onClick={() => {
              handleClose();
            }}
          >
            Verificar
          </Button>
        </Box>

        <MenuItem onClick={handleClose}>Cuenta</MenuItem>
        <MenuItem onClick={handleClose}>
          Iniciar prueba gratis de Premium
        </MenuItem>
        <MenuItem onClick={handleClose}>Ajustes y privacidad</MenuItem>
        <MenuItem onClick={handleClose}>Ayuda</MenuItem>
        <MenuItem onClick={handleClose}>Idioma</MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleClose}>Gestionar</MenuItem>
        <MenuItem onClick={handleClose}>Publicaciones y actividad</MenuItem>
        <MenuItem onClick={handleClose}>Cuenta de anuncios de empleo</MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
