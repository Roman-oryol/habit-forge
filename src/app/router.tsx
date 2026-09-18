import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/app-layout";
import CreateHabitPage from "@/pages/create-habit-page";
import DashboardPage from "@/pages/dashboard-page";
import HabitsPage from "@/pages/habits-page";
import EditHabitPage from "@/pages/edit-habit-page";
import CategoriesPage from "@/pages/categories-page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/new" element={<CreateHabitPage />} />
          <Route path="/habits/:id/edit" element={<EditHabitPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
