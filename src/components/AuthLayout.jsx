import React from "react";
import { Container, Paper, Box, Avatar, Typography } from "@mui/material";

export default function AuthLayout({ title, children }) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 30,
        }}
      >
        <Avatar
          src="/LogoLinkedin.png"
          alt="Logo Linkedin"
          sx={{ width: 150, height: 120 }}
        />
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            width: "100%",
            maxWidth: 500,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              src="/Linkedin.png"
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
              }}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {title}
          </Typography>

          {children}
        </Paper>
      </Container>
    </>
  );
}
