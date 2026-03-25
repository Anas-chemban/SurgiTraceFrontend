import DashboardLayout from "../../../layouts/DashboardLayout";

export default function VedioPage() {

  
  return (
    <DashboardLayout title="VedioPage">
        <div className="classs">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Videos

                </h1>
                <p className="text-gray-500 text-sm">
                    Manage surgical video recordings
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
