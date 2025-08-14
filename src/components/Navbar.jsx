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
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6 } }}>
        <Toolbar
          disableGutters
          sx={{ 
            justifyContent: "space-between", 
            gap: { xs: 0.5, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Logo + Búsqueda */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: { xs: 0.5, sm: 1.5 },
            flex: { xs: "0 1 auto", sm: "0 0 auto" },
            minWidth: 0,
          }}>
            <IconButton 
              edge="start" 
              sx={{ p: 0 }} 
              component={NavLink} 
              to="/"
            >
              <Avatar
                src="/Linkedin.jpg"
                alt="logo"
                sx={{ 
                  width: { xs: 28, sm: 34 }, 
                  height: { xs: 28, sm: 34 } 
                }}
              />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#eef3f8",
                px: { xs: 1, sm: 1.5 },
                py: 0.5,
                borderRadius: 2,
                width: { xs: "120px", sm: "200px", md: "250px" },
                maxWidth: "250px",
              }}
            >
              <SearchIcon 
                fontSize="small" 
                sx={{ 
                  color: "#666", 
                  fontSize: { xs: "1rem", sm: "1.25rem" } 
                }} 
              />
              <InputBase
                placeholder="Buscar"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  width: "100%",
                  "& input::placeholder": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Menú principal */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 2, md: 3, lg: 5 },
              flex: "1 1 auto",
              justifyContent: "flex-end",
              minWidth: 0,
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
                      minWidth: { xs: "auto", sm: "60px" },
                      px: { xs: 0.5, sm: 1 },
                      py: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        "& svg": {
                          fontSize: { xs: "1.2rem", sm: "1.5rem" },
                        },
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: "none", sm: "block" },
                        mt: 0.5,
                        fontSize: { xs: "0.6rem", sm: "0.75rem" },
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                )}
              </NavLink>
            ))}

            {/* Perfil */}
            <Box
              sx={{
                ml: { xs: 0.5, sm: 1 },
                flexShrink: 0,
              }}
            >
              <ProfileMenu />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}