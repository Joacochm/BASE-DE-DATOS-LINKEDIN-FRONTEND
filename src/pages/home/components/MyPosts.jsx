import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostUser,
  updatePostUser,
  deletePostUser,
} from "../../../store/slices/userPostSlice";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  TextField,
  Button,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";

export default function MyPosts({ userId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profileImage = useSelector((state) => state.profile.profileImage?.url);
  const { postList, loading, error } = useSelector((state) => state.userPost);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editFiles, setEditFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userId) dispatch(getPostUser(userId));
  }, [dispatch, userId]);

  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setEditFiles([]);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
    setEditFiles([]);
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      file,
      type,
      preview: type === "imagen" ? URL.createObjectURL(file) : null,
      name: file.name,
    }));

    setEditFiles((prev) => [...prev, ...newFiles]);
    e.target.value = null;
  };

  const removeFile = (index) => {
    const fileToRemove = editFiles[index];
    if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
    setEditFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitEdit = async (postId) => {
    if (!editContent.trim() && editFiles.length === 0) return;

    const filesToSend = editFiles.map((f) => f.file);

    try {
      await dispatch(
        updatePostUser({
          userId,
          id: postId,
          content: editContent,
          files: filesToSend,
        })
      ).unwrap();
      cancelEdit();
    } catch (err) {
      console.error("Error editando post:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await dispatch(deletePostUser({ userId, id: postId })).unwrap();
    } catch (err) {
      console.error("Error eliminando post:", err);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  if (!postList.length)
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        No tienes publicaciones todavía.
      </Typography>
    );

  return (
    <>
      {postList.map((post) => (
        <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
          {/* Info Usuario */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              src={profileImage || "/default-avatar.png"}
              sx={{ mr: 1 }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.name || "Usuario"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </Box>
            {editingPostId !== post.id && (
              <Box>
                <Button size="small" onClick={() => startEdit(post)}>
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </Box>

          {/* Contenido o edición */}
          {editingPostId === post.id ? (
            <>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                sx={{ mb: 1 }}
              />

              {editFiles.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexWrap: "wrap", gap: 1, mb: 1 }}
                >
                  {editFiles.map((file, idx) => (
                    <Box key={idx} sx={{ position: "relative" }}>
                      {file.preview ? (
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
                      ) : (
                        <Chip
                          label={file.name}
                          onDelete={() => removeFile(idx)}
                          deleteIcon={<CancelIcon />}
                          variant="outlined"
                        />
                      )}
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => removeFile(idx)}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}

              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <IconButton color="primary" component="label">
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleFileChange(e, "imagen")}
                    ref={fileInputRef}
                  />
                  <AddPhotoAlternateIcon />
                </IconButton>
                <IconButton color="primary" component="label">
                  <input
                    hidden
                    accept="video/*"
                    type="file"
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                  <VideoCameraBackIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => submitEdit(post.id)}
                >
                  Guardar
                </Button>
                <Button size="small" variant="outlined" onClick={cancelEdit}>
                  Cancelar
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>
              {(post.media || []).length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))`,
                    gap: 1,
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
            </>
          )}
        </Paper>
      ))}
    </>
  );
}
