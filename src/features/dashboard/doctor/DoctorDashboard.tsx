// src/pages/DoctorDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";



export default function DoctorDashboard() {
  return (
    <DashboardLayout title="Doctor Dashboard">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          Doctor Dashboard
        </h1>

        <div className="bg-white p-4 rounded-xl shadow">
          Your surgeries & alerts
        </div>

      </div>
    </DashboardLayout>
  );
}