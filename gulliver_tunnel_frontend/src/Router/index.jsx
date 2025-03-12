import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Documentation from "../pages/home/documentation";
import Profile from "../pages/home/profile";
import Home from "../pages/home";

export default function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to='/home'/>} />
    </Routes>
  );
}
