import DashboardLayout from "../../../layouts/DashboardLayout";

export default function AuditPage() {

  
  return (
    <DashboardLayout title="AuditPage">
        <div className="classs">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Audit

                </h1>
                <p className="text-gray-500 text-sm">
                    Manage Audit
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
