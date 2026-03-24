// src/pages/HospitaladminDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";



export default function HospitaladminDashboard() {
  return (
    <DashboardLayout title="Hospital Overview">
      <div className="space-y-6">

        <h1 className="text-xl font-semibold">
          Hospital Admin Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Surgeries" value="8" />
          <Card title="Completed" value="4" />
          <Card title="Missing Videos" value="1" />
          <Card title="Active Alerts" value="4" />
        </div>

      </div>
    </DashboardLayout>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}