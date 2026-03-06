import { Link } from "react-router-dom";

function Navbar() {

const logout = () => {
localStorage.removeItem("token");
window.location = "/login";
};

return (
<div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

<h1 className="text-lg font-semibold">
Service Request Portal
</h1>

<div className="flex gap-4">

<Link to="/" className="hover:text-gray-300">
Dashboard
</Link>

<Link to="/new" className="hover:text-gray-300">
New Request
</Link>

<button
onClick={logout}
className="bg-red-500 px-3 py-1 rounded"
>
Logout
</button>

</div>

</div>
);
}

export default Navbar;