import DashboardLayout from "../../../layouts/DashboardLayout";

export default function ReportsPage() {

  
  return (
    <DashboardLayout title="ReportsPage">
        <div className="classs">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Reports

                </h1>
                <p className="text-gray-500 text-sm">
                    Manage Reports
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
