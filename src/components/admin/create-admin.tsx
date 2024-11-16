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
    role: 1, // Default role set to 'Super Admin'
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // State for toggling password visibility

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'role' ? Number(value) : value, // Convert role to a number
    }));
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Admin/Signup`,
        formData
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setFormData({ username: '', email: '', password: '', role: 1 }); // Reset form after success
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
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value={1}>Super Admin</option>
            <option value={2}>Admin1</option>
            <option value={3}>Admin2</option>
            <option value={4}>Support</option>
          </select>
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
