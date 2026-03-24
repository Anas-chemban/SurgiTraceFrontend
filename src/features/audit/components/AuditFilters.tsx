import { useState } from "react";

type Props = {
  onFilter: (filters: any) => void;
};

const AuditFilters = ({ onFilter }: Props) => {
  const [user, setUser] = useState("");
  const [action, setAction] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onFilter({
      user,
      action,
      start,
      end,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        placeholder="User ID"
        className="border p-2"
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        placeholder="Action"
        className="border p-2"
        onChange={(e) => setAction(e.target.value)}
      />

      <input
        type="date"
        className="border p-2"
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="date"
        className="border p-2"
        onChange={(e) => setEnd(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4">
        Filter
      </button>
    </form>
  );
};

export default AuditFilters;