// src/app/router.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RequireAuth from "@/components/auth/require-auth";
import PublicOnly from "@/components/auth/public-only";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import ResetPasswordPage from "@/pages/reset-password-page";
import CreateHabitPage from "@/pages/create-habit-page";
import DashboardPage from "@/pages/dashboard-page";
import HabitsPage from "@/pages/habits-page";
import EditHabitPage from "@/pages/edit-habit-page";
import CategoriesPage from "@/pages/categories-page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnly />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/habits/new" element={<CreateHabitPage />} />
            <Route path="/habits/:id/edit" element={<EditHabitPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
