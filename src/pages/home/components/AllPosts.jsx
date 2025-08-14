import React, { useState, useRef } from "react";
import {
  Paper,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector, useDispatch } from "react-redux";
import { createPostUser, getPosts } from "../../../store/slices/userPostSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

export default function AllPosts({ postContent, onPostChange, onPostSubmit }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { postList, loading, error } = useSelector((state) => state.userPost);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      file,
      type,
      preview: type === "imagen" ? URL.createObjectURL(file) : null,
      name: file.name,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${files.length} archivo(s) ${type} seleccionado(s)`);
    e.target.value = null;
  };

  const removeFile = (index) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!postContent.trim() && (!selectedFiles || selectedFiles.length === 0)) {
      toast.warning("Debes escribir contenido o seleccionar un archivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("userId", user.id);

      if (selectedFiles && selectedFiles.length > 0) {
        for (const fileObj of selectedFiles) {
          if (fileObj?.file instanceof File) {
            formData.append("files", fileObj.file);
          }
        }
      }

      await dispatch(createPostUser(formData)).unwrap();
      toast.success("Publicación creada con éxito");
      onPostSubmit();
      setSelectedFiles([]);
      dispatch(getPosts());
    } catch (error) {
      handleApiError(error);
    }
  };

  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  return (
    <>
      {/* Formulario para crear post */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="¿Qué estás pensando?"
            variant="outlined"
            value={postContent}
            onChange={onPostChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
          />
        </Box>

        {/* Vista previa de imágenes seleccionadas */}
        {selectedFiles.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Archivos seleccionados:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              {selectedFiles.map((file, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  {file.preview ? (
                    <>
                      <Box
                        component="img"
                        src={file.preview}
                        alt="Vista previa"
                        sx={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid #ddd",
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                          },
                        }}
                        onClick={() => removeFile(index)}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <Chip
                      label={file.name}
                      onDelete={() => removeFile(index)}
                      deleteIcon={<CancelIcon />}
                      variant="outlined"
                      sx={{ maxWidth: 150 }}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              color="primary"
              aria-label="subir foto"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => handleFileChange(e, "imagen")}
                ref={fileInputRef}
              />
              <AddPhotoAlternateIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="subir video"
              component="label"
            >
              <input
                hidden
                accept="video/*"
                type="file"
                onChange={(e) => handleFileChange(e, "video")}
              />
              <VideoCameraBackIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="subir documento"
              component="label"
            >
              <input
                hidden
                accept=".pdf,.doc,.docx"
                type="file"
                onChange={(e) => handleFileChange(e, "documento")}
              />
              <InsertDriveFileIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px" }}
            onClick={handleSubmit}
            disabled={!postContent.trim() && selectedFiles.length === 0}
          >
            Publicar
          </Button>
        </Box>
      </Paper>

      {/* Lista de posts */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      ) : (
        postList.map((post) => (
          <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
            {/* Info de usuario */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={
                  post.user?.profileImages?.[0]?.url || "/default-avatar.png"
                }
                sx={{ mr: 1 }}
              />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.user?.name || "Usuario"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Contenido */}
            <Typography variant="body1" sx={{ mb: 2 }}>
              {post.content}
            </Typography>

            {post.media && post.media.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))`,
                  gap: 8,
                  mt: 1,
                }}
              >
                {post.media.map((file, i) =>
                  file.type === "image" ? (
                    <Box
                      key={i}
                      component="img"
                      src={file.url}
                      alt="Post media"
                      sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                  ) : (
                    <Box
                      key={i}
                      component="video"
                      src={file.url}
                      controls
                      sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1,
                        backgroundColor: "black",
                      }}
                    />
                  )
                )}
              </Box>
            )}
          </Paper>
        ))
      )}
    </>
  );
}
