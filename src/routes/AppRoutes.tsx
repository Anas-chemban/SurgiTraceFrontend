import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";

import Unauthorized from "../pages/Unauthorized";

import SurgeryListPage from "../features/surgeries/SurgeryListPage";
import SurgeryCreatePage from "../features/surgeries/SurgeryCreatePage";
import SurgeryEditPage from "../features/surgeries/SurgeryEditPage";

import VideoListPage from "../features/videos/VideoListPage";
import VideoDetailPage from "../features/videos/VideoDetailPage";

import { RoleRoute } from "./RoleRoute";
import AuditListPage from "../features/audit/AuditListPage";
import AlertsPage from "../features/alerts/AlertsPage";
import DashboardRouter from "../pages/DashboardRouter";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
              <DashboardRouter />
            </RoleRoute>
          }
        />

        {/* Surgeries */}
        <Route
          path="/surgeries"
          element={
            <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
              <SurgeryListPage />
            </RoleRoute>
          }
        />

         {/* alert */}
        <Route
            path="/alerts"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <AlertsPage />
              </RoleRoute>
            }
          />

           {/* audit */}
        <Route
            path="/audit/logs"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
                <AuditListPage />
              </RoleRoute>
            }
          />

        <Route
          path="/surgeries/create"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <SurgeryCreatePage />
            </RoleRoute>
          }
        />

        <Route
          path="/surgeries/edit/:id"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <SurgeryEditPage />
            </RoleRoute>
          }
        />

        {/* Videos */}
        <Route
          path="/videos"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <VideoListPage />
            </RoleRoute>
          }
        />

        <Route
          path="/videos/:id"
          element={
            <RoleRoute
              allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}
            >
              <VideoDetailPage />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;