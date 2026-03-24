import { useState } from "react";
import { useCreateSurgery } from "./hooks";
import { useNavigate } from "react-router-dom";

const SurgeryCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = useCreateSurgery();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutate(
      {
        title,
        description,
        status: "scheduled",
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

      <button className="bg-blue-500 text-white px-4 py-2">
        Create
      </button>
    </form>
  );
};

export default SurgeryCreatePage;