import { useAuthStore } from "../app/store";
import DepartmentDashboard from "../features/dashboard/department/DepartmentDashboard";
import DoctorDashboard from "../features/dashboard/doctor/DoctorDashboard";
import ExternalDashboard from "../features/dashboard/external/ExternalDashboard";
import StudentDashboard from "../features/dashboard/student/StudentDashboard";
import SystemAdminDashboard from "../features/dashboard/systemadmin/SystemAdminDashboard";


const DashboardRouter = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case "system_admin":
      return <SystemAdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "department_head":
      return <DepartmentDashboard />;
    case "student":
      return <StudentDashboard />;
    case "external_entity":
      return <ExternalDashboard />;
    case "hospital_admin":
      return <SystemAdminDashboard />;
    default:
      return <p>No dashboard available</p>;
  }
};

export default DashboardRouter;