import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";

import Unauthorized from "../pages/Unauthorized";

import { RoleRoute } from "./RoleRoute";


import DashboardRouter from "../pages/DashboardRouter";
import UsersDepartmentsPage from "../features/dashboard/systemadmin/UsersDepartmentsPage";
import SurgeriesPage from "../features/dashboard/systemadmin/SurgeriesPage";
import RoomsPage from "../features/dashboard/systemadmin/RoomPage";
import VedioPage from "../features/dashboard/systemadmin/VedioPage";
import AlertPage from "../features/dashboard/systemadmin/AlertPage";
import ReportsPage from "../features/dashboard/systemadmin/ReportsPage";
import AuditPage from "../features/dashboard/systemadmin/AuditPage";
import AiPage from "../features/dashboard/systemadmin/AiPage";
import SettingsPage from "../features/dashboard/systemadmin/SettingsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
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
              <SurgeriesPage />
            </RoleRoute>
          }
        />

         {/* alert */}
        <Route
            path="/alerts"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <AlertPage />
              </RoleRoute>
            }
          />
         {/* Reports */}
        <Route
            path="/reports"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <ReportsPage />
              </RoleRoute>
            }
          />
          {/* audit */}
        <Route
            path="/audit"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <AuditPage />
              </RoleRoute>
            }
          />
          {/* audit */}
        <Route
            path="/ai"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <AiPage />
              </RoleRoute>
            }
          />
          {/* audit */}
        <Route
            path="/settings"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <SettingsPage />
              </RoleRoute>
            }
          />

           

        {/* Videos */}
        <Route
          path="/videos"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <VedioPage />
            </RoleRoute>
          }
        />
        {/* Room */}
        <Route
          path="/rooms"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <RoomsPage/>  
            </RoleRoute>
          }
        />

        <Route
            path="/users"
            element={
              <RoleRoute allowedRoles={["system_admin", "hospital_admin"]}>
                <UsersDepartmentsPage />
              </RoleRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;