import { useSurgeries, useDeleteSurgery } from "./hooks";
import { useNavigate } from "react-router-dom";

const SurgeryListPage = () => {
  const { data, isLoading } = useSurgeries();
  const { mutate: deleteSurgery } = useDeleteSurgery();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Surgeries</h1>

      <button
        onClick={() => navigate("/surgeries/create")}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Create Surgery
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((s) => (
            <tr key={s.id} className="border-t">
              <td>{s.id}</td>
              <td>{s.title}</td>
              <td>{s.status}</td>

              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/surgeries/${s.id}`)}
                  className="text-blue-500"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/surgeries/edit/${s.id}`)}
                  className="text-green-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSurgery(s.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurgeryListPage;