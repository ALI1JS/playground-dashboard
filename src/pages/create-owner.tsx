import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar.com";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import { OwnersContext } from "../context/ownersContext";
import OwnerSignup from "../components/user/create-owner";
import axios from "axios"; // Import axios for making HTTP requests

const CreateOwner: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  const { fetchOwners } = useContext(OwnersContext);
  
  // State for image upload and preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the uploaded image URL

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
    formData.append('image', imageFile);

    try {
      const response = await axios.post(`${import.meta}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrl = response.data.url; // Assuming your response returns the URL
      setImageUrl(uploadedImageUrl); // Set the URL
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const handleCreateOwner = () => {
    // Create owner logic, including imageUrl in the data
    const ownerData = {
      // Add other owner details here
      profilePictureUrl: imageUrl, // Use the uploaded image URL
    };

    // Call the create owner function with ownerData
  };

  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={navbarDisplayHandle} src={humbrgerBar} alt="humbBar" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex flex-col gap-20 w-[100%] p-10 bg-slate-100 absolute top-[150px]">

          <OwnerSignup />
        </div>
      </div>
    </div>
  );
};

export default CreateOwner;
