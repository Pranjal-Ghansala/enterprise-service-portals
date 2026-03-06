import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function RequestCard({ request }) {

return (

<Link to={`/request/${request._id}`}>

<div className="bg-white shadow p-4 rounded hover:shadow-lg transition">

<h3 className="font-semibold text-lg mb-2">
{request.title}
</h3>

<p className="text-sm text-gray-500 mb-2">
{request.category}
</p>

<div className="flex justify-between items-center">

<StatusBadge status={request.status} />

<span className="text-xs text-gray-400">
{new Date(request.createdAt).toLocaleDateString()}
</span>

</div>

</div>

</Link>

);

}

export default RequestCard;