import React, { useState } from 'react';
import axios from 'axios';

// Define the interface for the form data
interface AdminSignupData {
  username: string;
  email: string;
  password: string;
  role: number;
}

const AdminSignup: React.FC = () => {
  const [formData, setFormData] = useState<AdminSignupData>({
    username: '',
    email: '',
    password: '',
    role: 2147483647, // Set default role
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'role' ? Number(value) : value, // Convert role to a number
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Admin/Signup`,
        formData
      );

      if (response.data.message)
      {
        setSuccessMessage(response.data.message);
        setFormData({ username: '', email: '', password: '', role: 2147483647 });
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data || 'An error occurred. Please try again.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="md:w-[60vw] mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Admin Account</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="number"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSignup;
