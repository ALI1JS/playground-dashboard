import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    username: "",
    email: "",
    password: "",
    birthDate: "",
    gender: 0, // Default is female
    profilePictureUrl: "",
  });

  const [error, setError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImageFile(selectedFile);

      // Create a preview URL
      const preview = URL.createObjectURL(selectedFile);
      setImagePreview(preview);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("ProfilePicture", imageFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Player/UploadProfilePicture`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const uploadedUrl = response.data.imageUrl;
      setFormData((prevData) => ({ ...prevData, profilePictureUrl: uploadedUrl }));
      toast.success(response.data.message);
    } catch (err: any) {
      const message = err.response?.data?.message || "Image upload failed.";
      toast.error(message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? (value === "female" ? 0 : 1) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!formData.profilePictureUrl) {
        toast.error("Please upload a profile picture first.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Player/Signup`,
        formData
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setFormData({
          username: "",
          email: "",
          password: "",
          birthDate: "",
          gender: 0,
          profilePictureUrl: "",
        });
        setImageFile(null);
        setImagePreview("");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "An error occurred.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="md:w-[40vw] mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Player Account</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Image Upload Section */}
      <div className="mb-6 text-center">
        <label className="block text-sm font-medium mb-2">Profile Picture</label>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="upload-image"
          />
          <label htmlFor="upload-image" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 text-gray-500">
                Upload Image
              </div>
            )}
          </label>
          {imageFile && (
            <button
              onClick={uploadImage}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Upload
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Birth Date */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender === 0 ? "female" : "male"}
            onChange={handleChange}
            required
            className="mt-1 py-1 block w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md w-full"
        >
          Create Player
        </button>
      </form>
    </div>
  );
};

export default PlayerSignup;
