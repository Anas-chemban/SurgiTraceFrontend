import { useParams, useNavigate } from "react-router-dom";
import { useUpdateSurgery } from "./hooks";
import { useState } from "react";

const SurgeryEditPage = () => {
  const { id } = useParams();
  const { mutate } = useUpdateSurgery();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutate(
      {
        id,
        data: { title, description },
      },
      {
        onSuccess: () => navigate("/surgeries"),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-green-500 text-white px-4 py-2">
        Update
      </button>
    </form>
  );
};

export default SurgeryEditPage;