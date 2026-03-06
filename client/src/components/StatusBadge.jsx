function StatusBadge({ status }) {

const colors = {
Pending: "bg-yellow-200 text-yellow-800",
"In Progress": "bg-blue-200 text-blue-800",
Completed: "bg-green-200 text-green-800",
Rejected: "bg-red-200 text-red-800"
};

return (
<span className={`px-2 py-1 text-xs rounded ${colors[status] || "bg-gray-200"}`}>
{status}
</span>
);
}

export default StatusBadge;