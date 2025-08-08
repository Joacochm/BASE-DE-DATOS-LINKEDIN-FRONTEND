// src/components/NavBar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Box,
  InputBase,
  Container,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  const menuItems = [
    { icon: <HomeIcon />, label: "Inicio", path: "/" },
    { icon: <PeopleIcon />, label: "Mi red", path: "/mi-red" },
    { icon: <WorkIcon />, label: "Empleos", path: "/empleos" },
    { icon: <ChatIcon />, label: "Mensajes", path: "/mensajes" },
    {
      icon: <NotificationsIcon />,
      label: "Notificaciones",
      path: "/notificaciones",
    },
  ];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={1}
      sx={{ borderBottom: "1px solid #ddd" }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", gap: 2 }}
        >
          {/* Logo + Búsqueda */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton edge="start" sx={{ p: 0 }} component={NavLink} to="/">
              <Avatar
                src="/Linkedin.jpg"
                alt="logo"
                sx={{ width: 34, height: 34 }}
              />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#eef3f8",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                width: { xs: 150, sm: 250 },
              }}
            >
              <SearchIcon fontSize="small" sx={{ color: "#666" }} />
              <InputBase
                placeholder="Buscar"
                sx={{
                  ml: 1,
                  fontSize: "0.9rem",
                  width: "100%",
                }}
              />
            </Box>
          </Box>

          {/* Menú principal */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, sm: 5 },
            }}
          >
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {({ isActive }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: isActive ? "primary.main" : "#555",
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {item.icon}
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: "none", sm: "block" },
                        mt: 0.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                )}
              </NavLink>
            ))}

            {/* Perfil */}
            <ProfileMenu />
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
