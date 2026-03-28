import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

type Room = {
  id: number;
  room_number: string;
  camera_id: string;
  status: string;
  department: number;
  department_name: string;
};

type Department = {
  id: number;
  name: string;
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<Room | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    room_number: "",
    department: "",
    camera_id: "",
    status: "available",
  });

  //////////////////////////////////////
  // FETCH
  //////////////////////////////////////
  const fetchAll = async () => {
    const [r, d] = await Promise.all([
      api.get("/surgeries/rooms/"),
      api.get("/accounts/departments/"),
    ]);

    setRooms(r.data);
    setDepartments(d.data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    };
    load();
  }, []);

  //////////////////////////////////////
  // CREATE
  //////////////////////////////////////
  const handleCreate = async () => {
    await api.post("/surgeries/rooms/", {
      ...form,
      department: Number(form.department),
    });

    setOpen(false);
    setForm({
      room_number: "",
      department: "",
      camera_id: "",
      status: "available",
    });

    fetchAll();
  };

  //////////////////////////////////////
  // UPDATE
  //////////////////////////////////////
  const handleUpdate = async () => {
    if (!editItem || !editForm) return;

    await api.patch(`/surgeries/rooms/${editItem.id}/`, {
      ...editForm,
      department: Number(editForm.department),
    });

    setEditItem(null);
    setEditForm(null);
    fetchAll();
  };

  //////////////////////////////////////
  // DELETE
  //////////////////////////////////////
  const confirmDelete = async () => {
    if (!deleteId) return;

    await api.delete(`/surgeries/rooms/${deleteId}/`);
    setDeleteId(null);
    fetchAll();
  };

  //////////////////////////////////////
  // STATUS STYLE
  //////////////////////////////////////
  const getStatusClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-600";
      case "occupied":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Operating Rooms">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
                <h1 className="text-2xl font-semibold">
                    Operating Room

                </h1>
                <p className="text-gray-500 text-sm">
                    Manage Operating Room
                </p>
            </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Room
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Room</th>
                  <th>Department</th>
                  <th>Camera</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
              {rooms.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 font-medium">{r.room_number}</td>
                  <td>{r.department_name}</td>
                  <td>{r.camera_id}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(r);
                        setEditForm({
                          room_number: r.room_number,
                          department: r.department,
                          camera_id: r.camera_id,
                          status: r.status,
                        });
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(r.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            </table>
          )}
        </div>

        {/* CREATE MODAL */}
        {open && (
          <Modal
            title="Create Operating Room"
            form={form}
            setForm={setForm}
            departments={departments}
            onClose={() => setOpen(false)}
            onSubmit={handleCreate}
            buttonText="Create"
          />
        )}

        {/* EDIT MODAL */}
        {editItem && editForm && (
          <Modal
            title="Edit Operating Room"
            form={editForm}
            setForm={setEditForm}
            departments={departments}
            onClose={() => {
              setEditItem(null);
              setEditForm(null);
            }}
            onSubmit={handleUpdate}
            buttonText="Update"
          />
        )}

        {/* DELETE MODAL */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[300px] text-center space-y-4">

              <h2 className="font-semibold">Delete Room?</h2>
              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

//////////////////////////////////////
// REUSABLE MODAL
//////////////////////////////////////

function Modal({ title, form, setForm, departments, onClose, onSubmit, buttonText }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-[420px] space-y-3">

        <h2 className="font-semibold">{title}</h2>

        <input
          placeholder="Room Number"
          value={form.room_number}
          onChange={(e) => setForm({ ...form, room_number: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((d: any) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <input
          placeholder="Camera ID"
          value={form.camera_id}
          onChange={(e) => setForm({ ...form, camera_id: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onSubmit}
            className="bg-teal-600 text-white px-3 py-1 rounded"
          >
            {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
}