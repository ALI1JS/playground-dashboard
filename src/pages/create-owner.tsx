import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar.com";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import { OwnersContext } from "../context/ownersContext";
import axios from "axios";
import toast from "react-hot-toast";

const CreateOwner: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  const { fetchOwners } = useContext(OwnersContext);

  // State for image upload and preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the uploaded image URL

  // State for owner details
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State for password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("ProfilePicture", imageFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Owner/UploadProfilePicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = response.data.imageUrl; // Assuming your response returns the URL
      setImageUrl(uploadedImageUrl);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const handleCreateOwner = async () => {
    if (imageUrl === null) {
      toast.error("You must upload an avatar");
      return;
    }

    if (username === "") {
      toast.error("You must fill the username field");
      return;
    }

    if (email === "") {
      toast.error("You must fill the email field");
      return;
    }

    if (password === "") {
      toast.error("You must fill the password field");
      return;
    }

    const ownerData = {
      username,
      email,
      password,
      profilePictureUrl: imageUrl, // Use the uploaded image URL
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/Owner/Signup`,
        ownerData
      );

      if (response.data.id) {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setImageFile(null);
        setImagePreview(null);
        setImageUrl(null);
        fetchOwners();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (

    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle()} src={humbrgerBar} alt="humbBar" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex justify-center w-[100%] mt-10 p-10 bg-slate-100">
          <div className="flex flex-col gap-6 w-[90%] max-w-md p-6 bg-white shadow-lg rounded-lg">
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
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Upload
                </button>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Enter email"
              />
            </div>
            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              onClick={handleCreateOwner}
              className="bg-green-500 text-white px-6 py-2 rounded mt-4"
            >
              Create Owner
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOwner;
