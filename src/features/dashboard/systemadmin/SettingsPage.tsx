import DashboardLayout from "../../../layouts/DashboardLayout";

export default function SettingsPage() {

  
  return (
    <DashboardLayout title="SettingsPage">
        <div className="classs">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Settings

                </h1>
                <p className="text-gray-500 text-sm">
                    Costemize Settings
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
