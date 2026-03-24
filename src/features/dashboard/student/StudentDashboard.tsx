// src/pages/StudentDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";



export default function StudentDashboard() {
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          Student Dashboard
        </h1>

        <div className="bg-white p-4 rounded-xl shadow">
          Learning videos
        </div>

      </div>
    </DashboardLayout>
  );
}