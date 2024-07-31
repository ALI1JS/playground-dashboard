import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Playground {
  stadiumId: number;
  name: string;
  description: string;
  approvalStatus: 0 | 1;
  owner: {
    userName: string;
  };
  address: string;
}

const PlaygroundList: React.FC = () => {
  const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState<Playground[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Stadium`);
        const data = await response.json();
        setPlaygrounds(data);
        setFilteredPlaygrounds(data);
      } catch (error) {
        console.error("Error fetching playgrounds:", error);
      }
    };

    fetchPlaygrounds();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = playgrounds;

      // Filter by status
      if (statusFilter) {
        const statusValue = statusFilter === "active" ? 1 : 0;
        filtered = filtered.filter(playground => playground.approvalStatus === statusValue);
      }

      // Filter by city
      if (cityFilter) {
        filtered = filtered.filter(playground => playground.address.toLowerCase().includes(cityFilter.toLowerCase()));
      }

      setFilteredPlaygrounds(filtered);
    };

    applyFilters();
  }, [statusFilter, cityFilter, playgrounds]);

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-4">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* City Filter */}
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaygrounds.map(playground => (
          <div key={playground.stadiumId} className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-2">
            <h3 className="text-xl font-semibold mb-2">Owner: {playground.owner.userName}</h3>
            <h3 className="text-xl font-semibold mb-2">Playground Name: {playground.name}</h3>
            <p className="text-gray-600 mb-4"> Description: {playground.description}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {playground.approvalStatus === 1 ? 'Active' : 'Inactive'}</p>
            <p className="text-sm text-gray-500">Address: {playground.address}</p>
            <Link className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-32" to={`/playground/${playground.stadiumId}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaygroundList;
