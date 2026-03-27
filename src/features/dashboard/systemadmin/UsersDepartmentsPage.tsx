import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { api } from "../../../api/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  department_name: string | null;
};

type Department = {
  id: number;
  name: string;
};

export default function UsersDepartmentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "doctor",
    password: "",
    department: "",
  });

  //////////////////////////////////////
  // FETCH
  //////////////////////////////////////
  const fetchUsers = async () => {
    try {
      const res = await api.get("/accounts/users/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/accounts/departments/");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchDepartments()]);
      setLoading(false);
    };
    load();
  }, []);

  //////////////////////////////////////
  // CREATE
  //////////////////////////////////////
  const handleCreate = async () => {
    try {
      // 🔥 simple validation
      if (!form.name || !form.email || !form.password) {
        alert("Please fill all required fields");
        return;
      }

      const payload: any = {
        name: form.name,
        email: form.email,
        role: form.role,
        password: form.password,
      };

      if (
        form.role === "doctor" ||
        form.role === "department_head"
      ) {
        if (!form.department) {
          alert("Select department");
          return;
        }
        payload.department = Number(form.department);
      }

      await api.post("/accounts/users/", payload);

      // reset
      setOpen(false);
      setForm({
        name: "",
        email: "",
        role: "doctor",
        password: "",
        department: "",
      });

      fetchUsers();
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  //////////////////////////////////////
  // UI
  //////////////////////////////////////
  return (
    <DashboardLayout title="Users & Departments">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">
              Users & Departments
            </h1>
            <p className="text-gray-500 text-sm">
              Manage system users and department assignments
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            + Add User
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3 font-medium">{u.name}</td>
                    <td>{u.email}</td>
                    <td className="capitalize">
                      {formatRole(u.role)}
                    </td>
                    <td>{u.department_name ?? "—"}</td>
                    <td>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

        {/* 🔥 MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* ✅ FORM FIXED HERE */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
              className="bg-white p-6 rounded-xl w-[400px] space-y-4"
            >

              <h2 className="text-lg font-semibold">Add User</h2>

              {/* NAME */}
              <input
                className="w-full border p-2 rounded"
                placeholder="Full Name"
                autoComplete="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* EMAIL */}
              <input
                type="email"
                className="w-full border p-2 rounded"
                placeholder="Email"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              {/* PASSWORD */}
              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* ROLE */}
              <select
                className="w-full border p-2 rounded"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                    department: "",
                  })
                }
              >
                <option value="doctor">Doctor</option>
                <option value="hospital_admin">Hospital Admin</option>
                <option value="department_head">Department Head</option>
                <option value="student">Student</option>
                <option value="external_entity">External</option>
                <option value="system_admin">System Admin</option>
              </select>

              {/* DEPARTMENT */}
              {(form.role === "doctor" ||
                form.role === "department_head") && (
                <select
                  className="w-full border p-2 rounded"
                  value={form.department}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      department: e.target.value,
                    })
                  }
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-teal-600 text-white px-3 py-1 rounded"
                >
                  Create
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

// FORMAT ROLE
function formatRole(role: string) {
  return role
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}