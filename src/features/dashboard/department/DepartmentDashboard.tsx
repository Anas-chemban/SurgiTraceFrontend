// src/pages/DepartmentDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";



export default function DepartmentDashboard() {
  return (
    <DashboardLayout title="Department Dashboard">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          Department Dashboard
        </h1>

        <div className="bg-white p-4 rounded-xl shadow">
          Department analytics & surgeries overview
        </div>

      </div>
    </DashboardLayout>
  );
}