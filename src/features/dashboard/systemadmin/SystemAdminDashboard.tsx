// src/pages/SystemAdminDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";

export default function SystemAdminDashboard() {
  return (
    <DashboardLayout title="System Admin Dashboard">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          System Admin Dashboard
        </h1>

        <div className="bg-white p-4 rounded-xl shadow">
          Full system control panel
        </div>

      </div>
    </DashboardLayout>
  );
}