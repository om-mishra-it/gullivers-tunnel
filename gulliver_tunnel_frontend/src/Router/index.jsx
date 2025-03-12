import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Home from "../pages/home/index";
export default function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to='/home'/>} />
    </Routes>
  );
}
