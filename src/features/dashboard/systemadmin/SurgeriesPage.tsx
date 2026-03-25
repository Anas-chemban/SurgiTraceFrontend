import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

type Surgery = {
  id: number;
  title: string;
  patient_reference: string;
  doctor: number;
  doctor_name: string;
  department: number;
  department_name: string;
  room: number;
  room_number: string;
  scheduled_start: string;
  scheduled_end: string;
  status: "scheduled" | "in_progress" | "completed";
  consent_signed: boolean;
};

type User = {
  id: number;
  name: string;
  role: string;
  department_name?: string;
};

type Department = {
  id: number;
  name: string;
};

type Room = {
  id: number;
  room_number: string;
  status: string;
  department: number;
};

export default function SurgeriesPage() {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [editItem, setEditItem] = useState<Surgery | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [doctors, setDoctors] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [form, setForm] = useState({
    title: "",
    patient_reference: "",
    doctor: "",
    department: "",
    room: "",
    scheduled_start: "",
    scheduled_end: "",
    status: "scheduled",
    consent_signed: false,
  });

  //////////////////////////////////////
  // FETCH
  //////////////////////////////////////
  const fetchAll = async () => {
    try {
      const [s, u, d, r] = await Promise.all([
        api.get("/surgeries/surgeries/"),
        api.get("/accounts/users/"),
        api.get("/accounts/departments/"),
        api.get("/surgeries/rooms/"),
      ]);

      setSurgeries(s.data);
      setDoctors(u.data);
      setDepartments(d.data);
      setRooms(r.data);
    } catch (err) {
      console.error(err);
    }
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
  // FILTER
  //////////////////////////////////////
  const selectedDepartment = departments.find(
    (d) => String(d.id) === String(form.department)
  );

  const filteredDoctors = selectedDepartment
    ? doctors.filter(
        (d) =>
          d.role === "doctor" &&
          d.department_name === selectedDepartment.name
      )
    : [];

  const filteredRooms = rooms.filter(
    (r) =>
      String(r.department) === String(form.department) &&
      r.status === "available"
  );

  //////////////////////////////////////
  // DATE FIX
  //////////////////////////////////////
  const formatDate = (val: string) => (val ? val + ":00Z" : "");

  //////////////////////////////////////
  // CREATE
  //////////////////////////////////////
  const handleCreate = async () => {
    const payload = {
      ...form,
      doctor: Number(form.doctor),
      department: Number(form.department),
      room: Number(form.room),
      scheduled_start: formatDate(form.scheduled_start),
      scheduled_end: formatDate(form.scheduled_end),
    };

    await api.post("/surgeries/surgeries/", payload);
    setOpen(false);
    fetchAll();
  };

  //////////////////////////////////////
  // UPDATE
  //////////////////////////////////////
  const handleUpdate = async () => {
    if (!editItem || !editForm) return;

    const payload = {
      ...editForm,
      doctor: Number(editForm.doctor),
      department: Number(editForm.department),
      room: Number(editForm.room),
      scheduled_start: formatDate(editForm.scheduled_start),
      scheduled_end: formatDate(editForm.scheduled_end),
    };

    await api.patch(`/surgeries/surgeries/${editItem.id}/`, payload);

    setEditItem(null);
    setEditForm(null);
    fetchAll();
  };

  //////////////////////////////////////
  // DELETE
  //////////////////////////////////////
  const confirmDelete = async () => {
    if (!deleteId) return;

    await api.delete(`/surgeries/surgeries/${deleteId}/`);
    setDeleteId(null);
    fetchAll();
  };

  //////////////////////////////////////
  // STATUS STYLE
  //////////////////////////////////////
  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "in_progress":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Surgeries">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Surgeries</h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            + New Surgery
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th>Title</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Consent</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {surgeries.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-3">S{s.id}</td>
                    <td>{s.title}</td>
                    <td>{s.doctor_name}</td>
                    <td>{s.department_name}</td>
                    <td>{s.room_number}</td>

                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusClass(s.status)}`}>
                        {s.status}
                      </span>
                    </td>

                    <td>{s.consent_signed ? "Yes" : "No"}</td>

                    <td className="space-x-2">
                      <button
                        onClick={() => {
                          setEditItem(s);
                          setEditForm({
                            title: s.title,
                            patient_reference: s.patient_reference,
                            doctor: s.doctor,
                            department: s.department,
                            room: s.room,
                            scheduled_start: s.scheduled_start.slice(0, 16),
                            scheduled_end: s.scheduled_end.slice(0, 16),
                            status: s.status,
                            consent_signed: s.consent_signed,
                          });
                        }}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(s.id)}
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
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[400px] space-y-3">

              <h2 className="font-semibold">New Surgery</h2>

              <input placeholder="Title" className="w-full border p-2"
                onChange={(e) => setForm({ ...form, title: e.target.value })} />

              <input placeholder="Patient Ref" className="w-full border p-2"
                onChange={(e) => setForm({ ...form, patient_reference: e.target.value })} />

              <select className="w-full border p-2"
                onChange={(e) => setForm({ ...form, department: e.target.value })}>
                <option>Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <select className="w-full border p-2"
                onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
                <option>Select Doctor</option>
                {filteredDoctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <select className="w-full border p-2"
                onChange={(e) => setForm({ ...form, room: e.target.value })}>
                <option>Select Room</option>
                {filteredRooms.map((r) => (
                  <option key={r.id} value={r.id}>{r.room_number}</option>
                ))}
              </select>

              <input type="datetime-local" className="w-full border p-2"
                onChange={(e) => setForm({ ...form, scheduled_start: e.target.value })} />

              <input type="datetime-local" className="w-full border p-2"
                onChange={(e) => setForm({ ...form, scheduled_end: e.target.value })} />

              <label>
                <input type="checkbox"
                  onChange={(e) => setForm({ ...form, consent_signed: e.target.checked })} />
                Consent
              </label>

              <div className="flex justify-end gap-2">
                <button onClick={() => setOpen(false)}>Cancel</button>
                <button onClick={handleCreate}
                  className="bg-teal-600 text-white px-3 py-1 rounded">
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {/* EDIT MODAL */}
        {editItem && editForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[420px] space-y-3">

              <h2 className="font-semibold text-lg">Edit Surgery</h2>

              {/* TITLE */}
              <input
                placeholder="Title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              {/* PATIENT REF */}
              <input
                placeholder="Patient Ref"
                value={editForm.patient_reference}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    patient_reference: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              {/* DEPARTMENT */}
              <select
                value={editForm.department}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    department: e.target.value,
                    doctor: "",
                    room: "",
                  })
                }
              >
                <option>Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* DOCTOR (FILTERED) */}
              <select
                value={editForm.doctor}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setEditForm({ ...editForm, doctor: e.target.value })
                }
              >
                <option>Select Doctor</option>
                {doctors
                  .filter(
                    (doc) =>
                      String(doc.department_name) ===
                        departments.find(
                          (d) => String(d.id) === String(editForm.department)
                        )?.name && doc.role === "doctor"
                  )
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
              </select>

              {/* ROOM (FILTERED) */}
              <select
                value={editForm.room}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setEditForm({ ...editForm, room: e.target.value })
                }
              >
                <option>Select Room</option>
                {rooms
                  .filter(
                    (r) =>
                      String(r.department) === String(editForm.department) &&
                      r.status === "available"
                  )
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.room_number}
                    </option>
                  ))}
              </select>

              {/* START */}
              <input
                type="datetime-local"
                value={editForm.scheduled_start}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    scheduled_start: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              {/* END */}
              <input
                type="datetime-local"
                value={editForm.scheduled_end}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    scheduled_end: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              {/* CONSENT */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.consent_signed}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      consent_signed: e.target.checked,
                    })
                  }
                />
                Consent
              </label>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditItem(null);
                    setEditForm(null);
                  }}
                  className="px-4 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="bg-teal-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[300px] text-center space-y-4">

              <h2 className="font-semibold">Delete Surgery?</h2>
              <p className="text-sm text-gray-500">This cannot be undone</p>

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