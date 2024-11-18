// src/components/AdminList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Admin {
  id: number;
  email: string;
  userName: string;
  profilePictureUrl: string | null;
  role: number;
}

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newRole, setNewRole] = useState<number>(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Admin`);
        setAdmins(response.data);
      } catch (err) {
        setError('Failed to fetch admins');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Function to convert numeric role to readable role string
  const getRoleString = (role: number): string => {
    switch (role) {
      case 1:
        return 'Super Admin';
      case 2:
        return 'Admin';
      case 3:
        return 'Admin2';
      case 4:
        return 'Support';
      default:
        return 'Unknown';
    }
  };

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setNewRole(admin.role);
    setEditModalOpen(true);
  };

  const openDeleteModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setDeleteModalOpen(true);
  };

  const handleRoleChange = async () => {
    if (selectedAdmin) {
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Admin/UpdateRole/${selectedAdmin.id}`, {
          role: newRole
        });
        setAdmins(admins.map(admin =>
          admin.id === selectedAdmin.id ? { ...admin, role: newRole } : admin
        ));
        toast.success("Update Admin Role SUccessfully");
        setEditModalOpen(false);
      } catch (err) {
        setError('Failed to update role');
      }
    }
  };

  const handleDelete = async () => {
    if (selectedAdmin) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/Admin/${selectedAdmin.id}`);
        setAdmins(admins.filter(admin => admin.id !== selectedAdmin.id));
        setDeleteModalOpen(false);
      } catch (err) {
        setError('Failed to delete admin');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-left mb-6">Admin List</h1>
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Profile Picture</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-300">{admin.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{admin.userName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{admin.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {admin.profilePictureUrl ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/${admin.profilePictureUrl}`}
                      alt={`${admin.userName}'s profile`}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span>No picture</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{getRoleString(admin.role)}</td>
                <td className="flex gap-2 py-2 px-4 border-b border-gray-300">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => openEditModal(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => openDeleteModal(admin)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Role Modal */}
      {/* Edit Role Modal */}
      {isEditModalOpen && selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Role for {selectedAdmin.userName}</h2>
            <select
              value={newRole}
              onChange={(e) => setNewRole(Number(e.target.value))}
              className="border border-gray-300 p-2 mb-4 w-full"
            >
              <option value={1}>Super Admin</option>
              <option value={2}>Admin</option>
              <option value={3}>Admin2</option>
              <option value={4}>Support</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">
              Are you sure you want to delete {selectedAdmin.userName}?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList;
