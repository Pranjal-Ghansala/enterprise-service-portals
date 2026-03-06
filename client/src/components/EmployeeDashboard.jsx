 import { useEffect, useState } from "react";
import API from "../api/axios";

export default function EmployeeDashboard() {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchRequests = async () => {
    const res = await API.get("/requests/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRequests(res.data);
  };

  const submitRequest = async () => {
    await API.post("/requests", { title, description }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTitle("");
    setDescription("");
    fetchRequests();
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded mr-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={submitRequest}>Submit</button>
      </div>

      <ul className="space-y-2">
        {requests.map((r) => (
          <li key={r._id} className="border p-4 rounded">
            <p className="font-semibold">{r.title}</p>
            <p>{r.description}</p>
            <p className="text-sm text-gray-500">Status: {r.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}