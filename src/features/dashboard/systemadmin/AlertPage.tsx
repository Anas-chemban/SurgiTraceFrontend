import DashboardLayout from "../../../layouts/DashboardLayout";

export default function AlertPage() {

  
  return (
    <DashboardLayout title="AlertPage">
        <div className="classs">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Alert

                </h1>
                <p className="text-gray-500 text-sm">
                    Manage Alert
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
