import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Home from "../pages/home/Home";
import Profile from "../pages/userProfile/Profile";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isActive = user?.isActive === 1;

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/cambio-contraseña" element={<ResetPassword />} />

        {/* Rutas privadas */}
        <Route
          element={
            isAuthenticated && isActive ? (
              <MainLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        {/* Redireccionamiento */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
