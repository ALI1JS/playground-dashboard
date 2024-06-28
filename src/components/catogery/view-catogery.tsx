import React, { useState } from 'react';
import axios from 'axios';
import plusIcon from "../../assets/plus.png";
import closeIcon from "../../assets/close-icon.png";


const ViewCategories: React.FC = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Category`);
            setCategories(response.data);
            setLoading(false);
            setIsHidden(false);
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/Category/Delete/${id}`);
            setCategories(categories.filter(category => category.categoryId !== id));
        } catch (error: any) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <div onClick={fetchCategories} className="flex items-center cursor-pointer">
                <img className="w-5 h-5" src={plusIcon} alt="plus-icon" />
                <button className="px-4 py-3 font-bold text-slate-500">View Categories</button>
            </div>
            {!isHidden && (
                <div className="bg-white rounded p-5 shadow-md absolute z-10 top-[30%] sm:left-[400px] transition-transform w-[50vw]">
                    <div>
                        <div className='relative flex justify-center'>
                            <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
                            <img onClick={() => { setIsHidden(true) }} className='w-6 h-6 absolute right-0 cursor-pointer' src={closeIcon} alt='close-icon' />
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-1">Arabic Name</th>
                                        <th className="px-4 py-1">English Name</th>
                                        <th className="px-4 py-1">Image</th>
                                        <th className="px-4 py-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(category => (
                                        <tr key={category.categoryId
                                            }>
                                            <td className="border px-4 py-1">{category.categoryNameAr}</td>
                                            <td className="border px-4 py-1">{category.categoryNameEn}</td>
                                            <td className="border px-4 py-1">
                                                <img src={`${import.meta.env.VITE_BASE_URL}/${category.categoryImageUrl}`} alt={category.categoryNameEn} className="h-16 w-16 object-cover" />
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button 
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                    onClick={() => deleteCategory(category.categoryId)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCategories;
