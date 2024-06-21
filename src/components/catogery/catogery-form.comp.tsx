import React, { useState } from "react";
import Input from "../login/input.comp";
import closeIcon from "../../assets/close-icon.png";
import toast from "react-hot-toast";
import axios from "axios";

interface CatogeryFormProps {
    isHidden: boolean;
    addCatogeryHandle: (isAdded: boolean) => void;
}

const CatogeryForm: React.FC<CatogeryFormProps> = ({ isHidden, addCatogeryHandle }) => {
    const [image, setImage] = useState<File | null>(null);
    const [categoryImageUrl, setImageUrl] = useState<string>('');
    const [nameAr, setNameAr] = useState<string>('');
    const [nameEn, setNameEn] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!image) {
            toast.error('The image is required');
            return;
        }

        const formData = new FormData();
        formData.append('CategoryImage', image);

        try {
            const response = await axios.post('https://abdoo120-001-site1.ctempurl.com/api/Category/UploadCategoryImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success('Image uploaded successfully!');
                setImageUrl(response.data.categoryImageUrl);
            } else {
                toast.error('Failed to upload image: ' + response.data.message);
            }
        } catch (error: any) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image: ' + error.message);
        }
    };

    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameAr || !nameEn) {
            toast.error('All fields are required');
            return;
        }

        if(!categoryImageUrl)
        {
            toast.error("You must upload image")
        }

        const categoryData = {
            nameAr,
            nameEn,
            categoryImageUrl,
        };

        try {
            const response = await axios.post('https://abdoo120-001-site1.ctempurl.com/api/Category/Add', categoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log(response)
                toast.success('Category added successfully!');
                setImage(null);
                setImageUrl('');
                setNameAr('');
                setNameEn('');
                addCatogeryHandle(true);
            } else {
                toast.error('Failed to add category: ' + response.data.message);
            }
        } catch (error: any) {
            console.error('Error adding category:', error);
            toast.error('Error adding category: ' + error.message);
        }
    };

    return (
        <div className={`${isHidden ? 'hidden' : ''} bg-white rounded p-5 shadow-md absolute z-10 top-[30%] sm:left-[400px] transition-transform w-[300px]`}>
            <div className='relative flex justify-center'>
                <h2 className="text-2xl font-bold mb-4 text-center">Add Category</h2>
                <img onClick={() => { addCatogeryHandle(true) }} className='w-6 h-6 absolute right-0 cursor-pointer' src={closeIcon} alt='close-icon' />
            </div>
            <form className="flex flex-col gap-5 justify-center" onSubmit={handleAddCategory}>
                <Input type="file" name="category-image" label="Upload Image" accept="image/*" handleOnChange={handleImageChange} />
                <button type="button" className="rounded w-60 px-4 py-2 bg-green-500 hover:bg-green-600 font-bold text-white" onClick={handleUploadImage}>Upload Image</button>
                <Input type="text" name="nameAr" label="Name in Arabic" value={nameAr} handleOnChange={(e) => setNameAr(e.target.value)} />
                <Input type="text" name="nameEn" label="Name in English" value={nameEn} handleOnChange={(e) => setNameEn(e.target.value)} />
                <button type="submit" className="rounded w-60 px-4 py-2 bg-green-500 hover:bg-green-600 font-bold text-white">Add Category</button>
            </form>
        </div>
    );
};

export default CatogeryForm;
