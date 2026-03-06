import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", category: "", priority: "" });

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const endpoint = role === "admin" ? "/requests" : "/requests/me";
        const res = await API.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : [];
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [role, token]);

  const filteredRequests = requests.filter(
    (req) =>
      (!filters.status || (req.status || "").toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.category || (req.category || "").toLowerCase() === filters.category.toLowerCase()) &&
      (!filters.priority || (req.priority || "").toLowerCase() === filters.priority.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Service Requests</h2>

        {/* Admin Panel Button */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition mb-4"
          >
            Admin Panel
          </button>
        )}

        <FilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <Loader />
        ) : filteredRequests.length === 0 ? (
          <p className="text-gray-500">No requests found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{req.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{req.description}</p>

                <div className="space-y-1 text-sm text-gray-500">
                  {req.category && <p><strong>Category:</strong> {req.category}</p>}
                  {req.priority && <p><strong>Priority:</strong> {req.priority}</p>}
                  <p className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <StatusBadge status={req.status} />
                  </p>
                  {req.createdBy && (
                    <p><strong>Created by:</strong> {req.createdBy.name || req.createdBy.email}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;