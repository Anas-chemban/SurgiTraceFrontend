import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";

import Unauthorized from "../pages/Unauthorized";

import { RoleRoute } from "./RoleRoute";



import UsersDepartmentsPage from "../features/dashboard/systemadmin/UsersDepartmentsPage";
import SurgeriesPage from "../features/dashboard/systemadmin/SurgeriesPage";
import RoomsPage from "../features/dashboard/systemadmin/RoomPage";
import VedioPage from "../features/dashboard/systemadmin/VedioPage";
import AlertPage from "../features/dashboard/systemadmin/AlertPage";
import ReportsPage from "../features/dashboard/systemadmin/ReportsPage";
import AuditPage from "../features/dashboard/systemadmin/AuditPage";
import AiPage from "../features/dashboard/systemadmin/AiPage";
import SettingsPage from "../features/dashboard/systemadmin/SettingsPage";
import PengingVedioPage from "../features/dashboard/systemadmin/PengingVedioPage";
import SystemAdminDashboard from "../features/dashboard/systemadmin/SystemAdminDashboard";
import DoctorDashboard from "../features/dashboard/doctor/DoctorDashboard";
import DepartmentDashboard from "../features/dashboard/department/DepartmentDashboard";
import StudentDashboard from "../features/dashboard/student/StudentDashboard";
import ExternalDashboard from "../features/dashboard/external/ExternalDashboard";
import DepartmentSurgeriesPage from "../features/dashboard/department/DepartmentSurgeriesPage";
import DepartmentAlertPage from "../features/dashboard/department/DepartmentAlertPage";
import DocterAlertPage from "../features/dashboard/doctor/DocterAlertPage";
import DocterSurgeriesPage from "../features/dashboard/doctor/DocterSurgeriesPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>


        {/* Public */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboards */}

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRoles={["system_admin", "hospital_admin"]}>
              <SystemAdminDashboard />
            </RoleRoute>
          }
        />

        {/* DOCTOR */}
        <Route
          path="/doctor/dashboard"
          element={
            <RoleRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </RoleRoute>
          }
        />

        {/* DEPARTMENT */}
        <Route
          path="/department/dashboard"
          element={
            <RoleRoute allowedRoles={["department_head"]}>
              <DepartmentDashboard />
            </RoleRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <RoleRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleRoute>
          }
        />

        {/* EXTERNAL */}
        <Route
          path="/external/dashboard"
          element={
            <RoleRoute allowedRoles={["external_entity"]}>
              <ExternalDashboard />
            </RoleRoute>
          }
        />
        

        {/* Surgeries */}
        <Route
          path="/admin/surgeries"
          element={
            <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
              <SurgeriesPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department/surgeries"
          element={
            <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
              < DepartmentSurgeriesPage/>
            </RoleRoute>
          }
        />
        <Route
          path="/doctor/surgeries"
          element={
            <RoleRoute allowedRoles={["external_entity","system_admin","student", "hospital_admin", "doctor", "department_head"]}>
              < DocterSurgeriesPage/>
            </RoleRoute>
          }
        />

         {/* alert */}
        <Route
            path="/admin/alerts"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <AlertPage />
              </RoleRoute>
            }
          />
        <Route
            path="/department/alerts"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <DepartmentAlertPage />
              </RoleRoute>
            }
          />
        <Route
            path="/doctor/alerts"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <DocterAlertPage />
              </RoleRoute>
            }
          />
         {/* Pending Video */}
        <Route
            path="/admin/pending-videos"
            element={
              <RoleRoute allowedRoles={["external_entity","system_admin","student","hospital_admin", "doctor", "department_head"]}>
                <PengingVedioPage />
              </RoleRoute>
            }
          />
         {/* Reports */}
        <Route
            path="reports"
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
            path="/admin/settings"
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
          path="/admin/rooms"
          element={
            <RoleRoute allowedRoles={["external_entity","student","system_admin", "hospital_admin", "doctor", "department_head"]}>
              <RoomsPage/>  
            </RoleRoute>
          }
        />

        <Route
            path="/admin/users"
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