import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  Button,
} from "@mui/material";

export default function Home() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
      {/* Columna Izquierda */}
      <Grid
        item
        xs={12}
        md={3}
        sx={{ width: 200 }} // ancho fijo, puedes ajustar
      >
        <Paper sx={{ overflow: "hidden", p: 0 }}>
          {/* Portada */}
          <Box
            component="img"
            src="/Portada3.jpg"
            alt="Portada"
            sx={{
              width: "100%",
              height: 80,
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Avatar sobrepuesto alineado a la izquierda */}
          <Box sx={{ textAlign: "left", mt: -6, pl: 2 }}>
            <Avatar
              src="/default-avatar.png"
              sx={{
                width: 72,
                height: 72,
                border: "8px solid white",
              }}
            />
          </Box>

          {/* Información alineada a la izquierda con truncado */}
          <Box sx={{ textAlign: "left", p: 2, maxWidth: "280px" }}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title="Fer Suazo" // tooltip con el texto completo al hacer hover
            >
              Fernando Joel Suazo Molina
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title="Dev con una descripción muy larga que se truncará"
            >
              La Paz, La Paz, Honduras
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Link
              component={RouterLink}
              to="/perfil"
              variant="body2"
              color="primary"
              underline="hover"
            >
              Ver perfil
            </Link>
          </Box>
        </Paper>
      </Grid>

      {/* Columna Central */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
                gap: 2,
                my: 2,
                mx: 2,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                borderRadius: "20px",
                border: "2px solid",
                borderColor: "divider",
                minHeight: "32px",
                padding: "6px 16px",
                transition: "all 0.3s ease",
              },
              "& .Mui-selected": {
                backgroundColor: "#1b5e20",
                color: "#fff !important",
                borderColor: "#1b5e20",
              },
              "& .MuiTab-root:hover": {
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "primary.main",
              },
            }}
          >
            <Tab label="Todo" />
            <Tab label="Empleos" />
            <Tab label="Mis publicaciones" />
            <Tab label="Menciones" />
          </Tabs>
        </Paper>

        {[1, 2, 3].map((post) => (
          <Paper key={post} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src="/default-avatar.png" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Usuario {post}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Hace {post} h
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Esta es una publicación de ejemplo número {post}.
            </Typography>
            <img
              src={`https://via.placeholder.com/500x250?text=Post+${post}`}
              alt={`Post ${post}`}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Paper>
        ))}
      </Grid>

      {/* Columna Derecha */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Novedades de la App
          </Typography>
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ mb: 2 }}>
              <Typography variant="subtitle2">
                Publicación destacada {item}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Breve descripción de la publicación o novedad {item}.
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Button variant="text" fullWidth>
            Ver más
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
