import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

// Componentes Modales
import ExperienceModal from "./components/ExperienceModal";
import EducationModal from "./components/EducationModal";
import ConfirmationModal from "./components/ConfirmationModal";
import AboutModal from "./components/AboutModal";

// Actions y Helpers
import {
  uploadProfileImage,
  uploadCoverImage,
} from "../../store/slices/profileSlice";
import { handleApiError } from "../../utils/errorHandler";
import {
  createUserExperience,
  updateUserExperience,
  deleteUserExperience,
  getUserExperiences,
} from "../../store/slices/usersExperiencesSlice";
import {
  createUserEducation,
  updateUserEducation,
  deleteUserEducation,
  getUserEducation,
} from "../../store/slices/userEducationSlice";
import {
  getUserInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
} from "../../store/slices/userInfoSlice";
import EducationItem from "./components/EducationItem";
import ExperienceItem from "./components/ExperienceItem";

// Placeholders para datos vacíos
const placeholderEducation = [
  {
    titulo: "Título académico",
    institucion: "Institución educativa",
    fecha: "2020 - 2024",
  },
];

const placeholderExperience = [
  {
    puesto: "Cargo laboral",
    empresa: "Organización",
    fecha: "2023 - actualidad",
  },
];

// Componente Section mejorado
const Section = ({ 
  title, 
  children, 
  icon,
  sx = {},
  paperProps = {},
  titleProps = {},
  descriptionProps = {},
  contentProps = {},
  description = "Muestra tus logros y consigue hasta el doble de visualizaciones del perfil y contactos"
}) => (
  <Paper
    sx={{
      p: 0,
      mb: 2,
      border: "2px dashed #e0e0e0",
      borderRadius: 2,
      backgroundColor: "#fafafa",
      position: "relative",
      ...sx
    }}
    {...paperProps}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        pb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          color="text.primary"
          {...titleProps}
        >
          {title}
        </Typography>
      </Box>
    </Box>
    {description && (
      <Box sx={{ px: 2, pb: 2 }} {...descriptionProps}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    )}
    <Box sx={{ px: 2, pb: 2 }} {...contentProps}>
      {children}
    </Box>
  </Paper>
);

const LinkedInProfileCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || {
    id: null,
    name: "Nombre Apellido",
    direccion: "Ciudad, País",
    telefono: "+504 9999-9999",
    sexo: "Masculino",
    identificacion: "0801-1234-56789",
    acerca: "Breve descripción sobre ti...",
    experiencia: [],
    educacion: [],
    profileImages: [],
    coverImages: [],
  };

  const userId = useSelector((state) => state.auth.user.id);

  // Carga inicial de datos
  useEffect(() => {
    if (userId) {
      dispatch(getUserExperiences(userId));
      dispatch(getUserEducation(userId));
      dispatch(getUserInfo(userId));
    }
  }, [dispatch, userId]);

  // Selectores del store
  const profileImage = useSelector((state) => state.profile.profileImage?.url);
  const coverImage = useSelector((state) => state.profile.coverImage?.url);
  const experiencesFromStore = useSelector(
    (state) => state.userExperiences?.experiences ?? []
  );
  const educationFromStore = useSelector(
    (state) => state.userEducation?.educationList ?? []
  );
  const userAbout = useSelector(
    (state) => state.userInfo?.infoList[0] || null
  );

  // Estados para imágenes
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  // Estados para experiencias
  const [userExperiencesList, setUserExperiencesList] = useState(experiencesFromStore);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  // Estados para educación
  const [userEducationList, setUserEducationList] = useState(educationFromStore);
  const [showAllEducations, setShowAllEducations] = useState(false);
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  // Estados para "Acerca de"
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [editingAbout, setEditingAbout] = useState(null);

  // Estados para eliminación
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  // Sincronizar estados con store
  useEffect(() => {
    setUserExperiencesList(Array.isArray(experiencesFromStore) ? experiencesFromStore : []);
  }, [experiencesFromStore]);

  useEffect(() => {
    setUserEducationList(Array.isArray(educationFromStore) ? educationFromStore : []);
  }, [educationFromStore]);

  // Memo para listas paginadas
  const displayedExperiences = useMemo(() => {
    if (!userExperiencesList) return [];
    return showAllExperiences ? userExperiencesList : userExperiencesList.slice(0, 2);
  }, [showAllExperiences, userExperiencesList]);

  const displayedEducations = useMemo(() => {
    if (!userEducationList) return [];
    return showAllEducations ? userEducationList : userEducationList.slice(0, 2);
  }, [showAllEducations, userEducationList]);

  // Handlers para imágenes
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProfile(true);
    try {
      await dispatch(uploadProfileImage({ uuid: user.id, file })).unwrap();
      toast.success("Imagen de perfil actualizada.");
    } catch (error) {
      handleApiError(error);
    } finally {
      setUploadingProfile(false);
      e.target.value = null;
    }
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      await dispatch(uploadCoverImage({ uuid: user.id, file })).unwrap();
      toast.success("Imagen de portada actualizada.");
    } catch (error) {
      handleApiError(error);
    } finally {
      setUploadingCover(false);
      e.target.value = null;
    }
  };

  // Handlers para experiencias
  const handleOpenModal = (exp = null) => {
    setEditingExperience(exp);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingExperience(null);
    setModalOpen(false);
  };

  const handleSubmitExperience = async (expData) => {
    try {
      if (editingExperience && editingExperience.id) {
        await dispatch(
          updateUserExperience({ id: editingExperience.id, data: expData })
        ).unwrap();
        toast.success("Experiencia actualizada.");
      } else {
        await dispatch(
          createUserExperience({ ...expData, userId: user.id })
        ).unwrap();
        toast.success("Nueva experiencia creada.");
      }
      handleCloseModal();
    } catch (error) {
      handleApiError(error);
    }
  };

  // Handlers para educación
  const handleOpenEducationModal = (edu = null) => {
    setEditingEducation(edu);
    setEducationModalOpen(true);
  };

  const handleSubmitEducation = async (eduData) => {
    try {
      if (editingEducation && editingEducation.id) {
        await dispatch(
          updateUserEducation({ id: editingEducation.id, data: eduData })
        ).unwrap();
        toast.success("Educación actualizada.");
      } else {
        await dispatch(
          createUserEducation({ ...eduData, userId: user.id })
        ).unwrap();
        toast.success("Nueva educación creada.");
      }
      setEducationModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Handlers para "Acerca de"
  const handleOpenAboutModal = () => {
    setEditingAbout(userAbout);
    setAboutModalOpen(true);
  };

const handleSubmitAbout = async (aboutData) => {
  try {
    if (userAbout && userAbout.id) {
      await dispatch(
        updateUserInfo({ id: userId, data: aboutData })
      ).unwrap();

      toast.success("Información actualizada.");
    } else {
      await dispatch(
        createUserInfo({ ...aboutData, userId: user.id })
      ).unwrap();

      await dispatch(getUserInfo(userId));
      toast.success("Información creada.");
    }
    setAboutModalOpen(false);
  } catch (error) {
    handleApiError(error);
  }
};

  // Handler para eliminar
  const handleOpenDeleteModal = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === "education") {
        await dispatch(deleteUserEducation(itemToDelete)).unwrap();
        toast.success("Educación eliminada correctamente");
      } else if (deleteType === "experience") {
        await dispatch(deleteUserExperience(itemToDelete)).unwrap();
        toast.success("Experiencia eliminada correctamente");
      } else if (deleteType === "about") {
        await dispatch(deleteUserInfo({id: userId, idRegister: itemToDelete})).unwrap();
        toast.success("Información eliminada correctamente");
      }
      setItemToDelete(null);
      setDeleteType(null);
      setDeleteModalOpen(false);
    } catch (error) {
      handleApiError(error);
      toast.error("Error al eliminar el registro");
    }
  };

  // Handlers para eliminar items
  const handleDeleteEducation = (id) => handleOpenDeleteModal(id, "education");
  const handleDeleteExperience = (id) => handleOpenDeleteModal(id, "experience");
  const handleDeleteAbout = (id) => handleOpenDeleteModal(id, "about");

  return (
    <Grid item xs={12} md={3}>
      {/* Tarjeta principal */}
      <Paper sx={{ overflow: "hidden", mb: 2 }}>
        {/* Portada */}
        <Box
          sx={{
            position: "relative",
            height: 120,
            backgroundImage: `url(${coverImage || "/Portada3.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mb: 2,
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="upload-cover-image"
            style={{ display: "none" }}
            onChange={handleCoverImageChange}
            disabled={uploadingCover}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.200" },
            }}
            size="small"
            component="label"
            htmlFor="upload-cover-image"
            disabled={uploadingCover}
            title={uploadingCover ? "Subiendo..." : "Cambiar imagen de portada"}
          >
            <ImageIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Foto */}
        <Box sx={{ position: "relative", px: 2, mt: -6, mb: 2 }}>
          <Avatar
            src={profileImage || "/default-avatar.png"}
            alt={user.name}
            sx={{
              width: 96,
              height: 96,
              border: "4px solid white",
              boxShadow: 2,
              opacity: uploadingProfile ? 0.5 : 1,
            }}
          />

          <input
            type="file"
            accept="image/*"
            id="upload-profile-image"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
            disabled={uploadingProfile}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              left: 80,
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.200" },
            }}
            size="small"
            component="label"
            htmlFor="upload-profile-image"
            disabled={uploadingProfile}
            title={uploadingProfile ? "Subiendo..." : "Cambiar foto de perfil"}
          >
            <ImageIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Info básica */}
        <Box sx={{ px: 2, mt: 1, mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📍 {user.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📞 {user.telefono}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⚧ {user.sexo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🆔 {user.identificacion}
          </Typography>
        </Box>
      </Paper>

      {/* Sección Acerca de */}
      <Section
        title="Acerca de"
        icon={<PersonIcon sx={{ color: "primary.main" }} />}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            border: "1px dashed #ccc",
            textAlign: "left",
            minHeight: 80,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#eee"
            }
          }}
          onClick={handleOpenAboutModal}
        >
          {userAbout ? (
            <>
              {userAbout.titular && (
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {userAbout.titular}
                </Typography>
              )}
              <Typography variant="body2" paragraph>
                {userAbout.acercaDe || "No hay descripción"}
              </Typography>
              {userAbout.enlaceSitioWeb && (
                <Typography variant="body2" color="primary">
                  {userAbout.enlaceSitioWeb}
                </Typography>
              )}
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAbout(userAbout.id);
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
                title="Eliminar información"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              Escribe una breve descripción sobre ti...
            </Typography>
          )}
        </Box>
        <Button
          variant="outlined"
          sx={{ mt: 2, borderRadius: 20 }}
          fullWidth
          onClick={handleOpenAboutModal}
        >
          {userAbout ? "Editar información" : "Añadir información"}
        </Button>
      </Section>

      {/* Sección Experiencia */}
      <Section
        title="Experiencia"
        icon={<WorkIcon sx={{ color: "primary.main" }} />}
      >
        {displayedExperiences && displayedExperiences.length > 0
          ? displayedExperiences.map((exp) => (
              <ExperienceItem
                key={exp.id ?? exp._id ?? exp.uuid ?? `exp-${exp.puesto}`}
                exp={exp}
                onEdit={handleOpenModal}
                onDelete={handleDeleteExperience}
              />
            ))
          : placeholderExperience.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} isPlaceholder={true} />
            ))}

        {userExperiencesList.length > 2 && (
          <Button
            variant="text"
            sx={{ mt: 1, borderRadius: 20 }}
            fullWidth
            onClick={() => setShowAllExperiences((prev) => !prev)}
          >
            {showAllExperiences
              ? "Ver menos"
              : `Ver más (${userExperiencesList.length - 2})`}
          </Button>
        )}

        <Button
          variant="outlined"
          sx={{ mt: 1, borderRadius: 20 }}
          fullWidth
          onClick={() => handleOpenModal()}
        >
          Añadir experiencia
        </Button>
      </Section>

      {/* Sección Educación */}
      <Section
        title="Educación"
        icon={<SchoolIcon sx={{ color: "primary.main" }} />}
      >
        {displayedEducations && displayedEducations.length > 0
          ? displayedEducations.map((edu) => (
              <EducationItem
                key={edu.id ?? edu._id ?? edu.uuid ?? `edu-${edu.titulo}`}
                edu={edu}
                onEdit={handleOpenEducationModal}
                onDelete={handleDeleteEducation}
              />
            ))
          : placeholderEducation.map((edu, i) => (
              <EducationItem key={i} edu={edu} isPlaceholder={true} />
            ))}

        {userEducationList.length > 2 && (
          <Button
            variant="text"
            sx={{ mt: 1, borderRadius: 20 }}
            fullWidth
            onClick={() => setShowAllEducations((prev) => !prev)}
          >
            {showAllEducations
              ? "Ver menos"
              : `Ver más (${userEducationList.length - 2})`}
          </Button>
        )}

        <Button
          variant="outlined"
          sx={{ mt: 1, borderRadius: 20 }}
          fullWidth
          onClick={() => handleOpenEducationModal()}
        >
          Añadir educación
        </Button>
      </Section>

      {/* Modales */}
      <ExperienceModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitExperience}
        initialData={editingExperience}
        userId={user.id}
      />

      <EducationModal
        open={educationModalOpen}
        onClose={() => setEducationModalOpen(false)}
        onSubmit={handleSubmitEducation}
        initialData={editingEducation}
        userId={user.id}
      />

      <AboutModal
        open={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        onSubmit={handleSubmitAbout}
        initialData={editingAbout}
        userId={user.id}
      />

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={
          deleteType === "education"
            ? "Eliminar educación"
            : deleteType === "experience"
            ? "Eliminar experiencia"
            : "Eliminar información"
        }
        message={
          deleteType === "education"
            ? "¿Estás seguro de que deseas eliminar este registro de educación?"
            : deleteType === "experience"
            ? "¿Estás seguro de que deseas eliminar este registro de experiencia?"
            : "¿Estás seguro de que deseas eliminar esta información?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Grid>
  );
};

export default LinkedInProfileCard;