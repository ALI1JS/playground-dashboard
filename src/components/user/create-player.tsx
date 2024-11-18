import React, { useState } from 'react';
import axios from 'axios';

// Define the interface for the form data
interface PlayerSignupData {
  username: string;
  email: string;
  password: string;
  birthDate: string;
  gender: number; // 0 for female, 1 for male
  profilePictureUrl: string;
}

const PlayerSignup: React.FC = () => {
  const [formData, setFormData] = useState<PlayerSignupData>({
    username: '',
    email: '',
    password: '',
    birthDate: '',
    gender: 0, // Default is female
    profilePictureUrl: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null); // State for the selected file

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'gender') {
      // Map the gender value to 0 (female) or 1 (male)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === 'female' ? 0 : 1,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle file change for the profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Function to upload the profile picture
  const uploadProfilePicture = async (): Promise<string> => {
    if (!file) {
      throw new Error('No file selected.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      'https://hawihub1-001-site1.gtempurl.com/api/Player/UploadProfilePicture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.profilePictureUrl; // Adjust according to your API response
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const uploadedProfilePictureUrl = await uploadProfilePicture();
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Player/Signup`,
        { ...formData, profilePictureUrl: uploadedProfilePictureUrl }
      );

      console.log(response.data);
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setFormData({
          username: '',
          email: '',
          password: '',
          birthDate: '',
          gender: 0,
          profilePictureUrl: '',
        });
        setFile(null); // Reset the file input
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setError(error.response.data || 'An error occurred. Please try again.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="md:w-[60vw] mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Player Account</h1>
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
          <label className="block text-sm font-medium">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender === 0 ? 'female' : 'male'}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 py-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerSignup;
