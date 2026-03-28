// src/pages/ExternalDashboard.tsx

import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Users,
  Activity,
  HardDrive,
  ShieldCheck,
} from "lucide-react";


export default function ExternalDashboard() {
  return (
    <DashboardLayout title="External Dashboard">
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">
            System Administration
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor system health and manage users
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Active Users" value="24" icon={<Users size={18} />} />
          <Card title="System Uptime" value="99.8%" icon={<Activity size={18} />} />
          <Card
            title="Storage Used"
            value="78%"
            sub="6.2 TB / 8 TB"
            icon={<HardDrive size={18} />}
            highlight
          />
          <Card title="Security Events" value="3" icon={<ShieldCheck size={18} />} />
        </div>

        {/* LOWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b font-medium">
              Recent Audit Activity
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="text-left">Action</th>
                  <th className="text-left">Time</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["Dr. Sarah Chen", "Viewed video", "09:45:00"],
                  ["James Wilson", "Created surgery", "08:30:00"],
                  ["Patricia Huang", "Searched records", "10:15:00"],
                  ["Michael Torres", "Updated user role", "07:00:00"],
                  ["Dr. Maria Lopez", "Approved video access", "15:30:00"],
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3 font-medium">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-xl shadow p-4 space-y-4">
            <h2 className="font-medium">System Health</h2>

            <Progress label="CPU Usage" value={42} color="bg-green-500" />
            <Progress label="Memory" value={67} color="bg-orange-400" />
            <Progress label="Storage" value={78} color="bg-orange-500" />
            <Progress label="Network" value={23} color="bg-green-500" />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

//////////////////////////////////////////////////////////////////
// ✅ Card (ONLY ONCE)
//////////////////////////////////////////////////////////////////
function Card({
  title,
  value,
  icon,
  sub,
  highlight,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-semibold">{value}</h2>

        {sub && (
          <p className={`text-sm ${highlight ? "text-red-500" : "text-gray-400"}`}>
            {sub}
          </p>
        )}
      </div>

      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
        {icon}
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////
// ✅ Progress (YOU WERE MISSING THIS)
//////////////////////////////////////////////////////////////////
function Progress({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}