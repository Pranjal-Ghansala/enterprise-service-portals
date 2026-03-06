 import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUsers(res.data);
  };

  const updateRole = async (id, role) => {
    await API.put(`/users/${id}`, { role }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await API.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="py-2 px-4">{u.name}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
}