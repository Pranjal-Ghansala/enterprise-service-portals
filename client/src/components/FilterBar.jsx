function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-6">

      <select
        className="border p-2 rounded"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="hardware">Hardware</option>
        <option value="software">Software</option>
        <option value="network">Network</option>
        <option value="access">Access</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

    </div>
  );
}

export default FilterBar;