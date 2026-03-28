import DashboardLayout from "../../../layouts/DashboardLayout";

export default function PengingVedioPage() {

  
  return (
    <DashboardLayout title="Penging Vedio">
            <div className="classs">
                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold">
                        PendingnVideos
    
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage surgical video recordings
                    </p>
                </div>
            </div>
        </DashboardLayout>
  );
}
