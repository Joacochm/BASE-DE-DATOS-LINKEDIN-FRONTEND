import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Grid,
  Paper,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  Button,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchProfileImage,
  fetchCoverImage,
} from "../../store/slices/profileSlice";
import MyPosts from "./components/MyPosts";
import Jobs from "./components/Jobs";
import Mentions from "./components/Mentions";
import AllPosts from "./components/AllPosts";

export default function Home() {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector((state) => state.auth);

  // Estado para publicación
  const [postContent, setPostContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // Estado para novedades (mostrar más/menos)
  const [showMoreNews, setShowMoreNews] = useState(false);

  //Store de imagenes
  const profileImage = useSelector((state) => state.profile.profileImage?.url);
  const coverImage = useSelector((state) => state.profile.coverImage?.url);

  useEffect(() => {
    if (user?.id) {
      if (!profileImage) {
        dispatch(fetchProfileImage(user.id));
      }
      if (!coverImage) {
        dispatch(fetchCoverImage(user.id));
      }
    }
  }, [dispatch, user?.id, profileImage, coverImage]);

  // Array fijo de novedades
  const novedades = [
    {
      id: 1,
      title: "Bienvenido a la App",
      description:
        "Gracias por unirte. Explora las funciones y conecta con la comunidad.",
    },
    {
      id: 2,
      title: "Nueva función: Feed",
      description:
        "Ahora puedes publicar estados o información relacionada a tus trabajos.",
    },
    {
      id: 3,
      title: "Mejoras en perfil",
      description:
        "Actualiza tu perfil con más información y comparte tu experiencia.",
    },
    {
      id: 4,
      title: "Próximamente: Mensajería",
      description:
        "Estamos trabajando para que puedas chatear con otros usuarios en tiempo real.",
    },
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleFileInput = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(`Archivo ${type} seleccionado:`, file.name);
    setSnackbarMsg(`${type} cargado (simulación).`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    e.target.value = null;
  };

  const handleAttachFileClick = () => {
    setSnackbarMsg("Subir archivos no está disponible por ahora.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleShowMore = () => {
    setShowMoreNews((prev) => !prev);
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 1, sm: 0, md: 0 } }}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 2 }}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Columna Izquierda */}
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Paper sx={{ overflow: "hidden", p: 0, width: "100%" }}>
            <Box
              component="img"
              src={coverImage || "/Portada3.jpg"}
              alt="Portada"
              sx={{
                width: "100%",
                height: { sx: 100, md: 80 },
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box sx={{ textAlign: "left", mt: -6, pl: 2 }}>
              <Avatar
                src={profileImage || "/default-avatar.png"}
                alt={user?.name || "Usuario"}
                sx={{ width: 72, height: 72, border: "8px solid white" }}
              />
            </Box>
            <Box sx={{ textAlign: "left", p: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { sx: "100%", sm: 200 },
                }}
                title={user?.name || "Usuario"}
              >
                {user?.name || "Usuario"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
                title={user?.direccion || "Ubicación"}
              >
                {user?.direccion || "Ubicación"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  mt: 2,
                  p: 0.5,
                  backgroundColor: "#f3f2ef",
                  border: "1px dotted #ccc",
                  borderRadius: 1,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                  gap: 0.5,
                  "&:hover": { backgroundColor: "#e1dfdb" },
                }}
                onClick={() => {}}
              >
                <AddIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Link
                  component={RouterLink}
                  to="/perfil"
                  variant="body2"
                  color="primary"
                  underline="hover"
                  sx={{ fontWeight: "bold" }}
                >
                  Experiencia
                </Link>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Columna Central */}
        <Grid item xs={12} sm={8} md={8} lg={6}>
          {/* Tabs */}
          <Paper sx={{ mb: 2, width: "100%" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              centered
              variant={window.innerWidth < 600 ? "scrollable" : "standard"}
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                  gap: { xs: 0, sm: 2 },
                  my: 2,
                  mx: 2,
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  borderRadius: "20px",
                  border: "2px solid",
                  borderColor: "divider",
                  minHeight: "32px",
                  padding: { xs: "4px 8px", sm: "6px 16px" },
                  transition: "all 0.3s ease",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  minWidth: { xs: "auto", sm: "90px" },
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

          {/* Render dinámico según tab */}
          {tabValue === 0 && (
            <AllPosts
              postContent={postContent}
              onPostChange={handlePostChange}
              onPostSubmit={() => {
                setSnackbarMsg("Publicación creada correctamente.");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setPostContent("");
              }}
              onFileInput={handleFileInput}
              onAttachFileClick={handleAttachFileClick}
            />
          )}
          {tabValue === 1 && <Jobs />}
          {tabValue === 2 && <MyPosts userId={user?.id} />}
          {tabValue === 3 && <Mentions />}
        </Grid>

        {/* Columna Derecha */}
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Título */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Novedades de la App
            </Typography>

            {/* Mensaje de bienvenida */}
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: "text.primary",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "100%", sm: 350 },
              }}
            >
              Hola <strong>{user?.name || "Usuario"}</strong>. Aquí encontrarás
              las últimas novedades y actualizaciones de la app.
            </Typography>

            {/* Publicaciones */}
            {novedades
              .slice(0, showMoreNews ? novedades.length : 2)
              .map(({ id, title, description }) => (
                <Paper
                  key={id}
                  elevation={1}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                  onClick={() => {
                    // Aquí podrías agregar lógica para navegar o mostrar detalle
                    console.log(`Clicked on noticia ${id}`);
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 0.5, color: "text.primary" }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 300,
                    }}
                  >
                    {description}
                  </Typography>
                </Paper>
              ))}

            <Divider sx={{ my: 2 }} />

            <Button
              variant="outlined"
              fullWidth
              onClick={toggleShowMore}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "primary.light",
                  color: "primary.dark",
                },
                transition: "all 0.3s ease",
              }}
            >
              {showMoreNews ? "Ver menos" : "Ver más"}
            </Button>
          </Paper>
        </Grid>

        {/* Snackbar para mensajes */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
