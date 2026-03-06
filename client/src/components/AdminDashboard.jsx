import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch requests and users
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch requests");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRequests();
      await fetchUsers();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Approve/Reject requests
  const updateRequestStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setRequests(requests.map(r => (r._id === id ? { ...r, status } : r)));
      toast.success(`Request ${status}`);
    } catch (err) {
      toast.error("Failed to update request");
    }
  };

  // Update user role
  const updateUserRole = async (id, role) => {
    try {
      await API.put(`/users/${id}`, { role }, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.map(u => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.filter(u => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  // Save & go back to normal dashboard
  const handleSaveAndExit = () => {
    toast.success("Redirecting to Dashboard...");
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100 space-y-8">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* Requests Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Requests</h2>
        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500">No requests found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map(r => (
              <div key={r._id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{r.title}</h3>
                  <p>{r.description}</p>
                  <p className="text-sm text-gray-500">By: {r.createdBy?.name || "Unknown"}</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-semibold 
                    ${r.status === "approved" ? "bg-green-100 text-green-800" :
                      r.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {r.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 bg-green-500 text-white py-1 rounded disabled:opacity-50"
                    disabled={r.status === "approved"}
                    onClick={() => updateRequestStatus(r._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="flex-1 bg-red-500 text-white py-1 rounded disabled:opacity-50"
                    disabled={r.status === "rejected"}
                    onClick={() => updateRequestStatus(r._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Users Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-2">
            {users.map(u => (
              <li key={u._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  {u.name} - {u.email} - Role: 
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                    className="ml-2 border px-2 py-1 rounded"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Save & Exit */}
      <div className="mt-8">
        <button
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          onClick={handleSaveAndExit}
        >
          Save & Go to Dashboard
        </button>
      </div>
    </div>
  );
}