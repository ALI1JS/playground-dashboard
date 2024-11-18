import React, { useState } from 'react';
import axios from 'axios';

// Define the interface for the form data
interface OwnerSignupData {
  username: string;
  email: string;
  password: string;
  profilePictureUrl: string; // Used to store the uploaded image URL
}

const OwnerSignup: React.FC = () => {
  const [formData, setFormData] = useState<OwnerSignupData>({
    username: '',
    email: '',
    password: '',
    profilePictureUrl: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Handle input changes
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the preview of the image
      };
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setError('Please select an image to upload.');
      return;
    }

    setError(''); // Clear previous error messages

    try {
      // Create FormData to upload the image
      const formData = new FormData();
      formData.append('image', imageFile);

      // Make the POST request to upload the image
      const uploadResponse = await axios.post(
        'https://hawihub1-001-site1.gtempurl.com/api/Owner/UploadProfilePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Get the image URL from the response
      const uploadedImageUrl = uploadResponse.data.imageUrl; // Adjust based on your API response
      setFormData((prevData) => ({
        ...prevData,
        profilePictureUrl: uploadedImageUrl, // Update the formData with the uploaded image URL
      }));
      setSuccessMessage('Image uploaded successfully!');
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data || 'An error occurred while uploading the image.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Proceed to create the owner after the image is uploaded
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Owner/Signup`,
        { ...formData } // Send formData including uploaded image URL
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setFormData({ username: '', email: '', password: '', profilePictureUrl: '' });
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data || 'An error occurred during signup.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="md:w-[60vw] mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Owner Account</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-4">
        <label className="block text-sm font-medium mb-2">Upload Profile Picture</label>
        
        {/* Circular Image Preview */}
        <div className="relative mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            required
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer w-32 h-32 rounded-full border-4 border-blue-600 flex items-center justify-center overflow-hidden bg-gray-200 hover:bg-blue-100 transition duration-200"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-blue-600 text-lg">Choose Image</span>
            )}
          </label>
        </div>

        {/* Upload Image Button */}
        <button
          type="button"
          onClick={handleImageUpload}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
        >
          Upload Image
        </button>
      </div>

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
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Owner
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerSignup;
