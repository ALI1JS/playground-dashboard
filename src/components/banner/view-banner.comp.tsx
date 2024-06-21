import React, { useState } from 'react';
import axios from 'axios';
import plusIcon from "../../assets/plus.png";
import closeIcon from "../../assets/close-icon.png";
import deleteImage from "../../assets/close-icon.png"; // Ensure this path is correct
import toast from 'react-hot-toast';

const ViewBanner: React.FC = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://abdoo120-001-site1.ctempurl.com/api/Banner');
            setBanners(response.data);
            setLoading(false);
            setIsHidden(false);
        } catch (error: any) {
            console.error('Error fetching banners:', error);
            setLoading(false);
        }
    };

    const deleteCategory = async (id: string, url: string) => {
        try {
            const deleteImageResponse = await axios.post('http://abdoo120-001-site1.ctempurl.com/api/Banner/DeleteBannerImage', {
                bannerImageUrl: url
            });

            if (deleteImageResponse.status === 200) {
                const deleteBannerResponse = await axios.delete(`http://abdoo120-001-site1.ctempurl.com/api/Banner/Delete/${id}`);
                if (deleteBannerResponse.status === 200) {
                    toast.success('Banner Deleted');
                    setBanners(banners.filter(banner => banner.bannerId !== id));
                } else {
                    throw new Error("Error occurred while deleting the banner.");
                }
            } else {
                throw new Error("Error occurred while deleting the banner image.");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <div onClick={fetchBanners} className="flex items-center cursor-pointer">
                <img className="w-5 h-5" src={plusIcon} alt="plus-icon" />
                <button className="px-4 py-3 font-bold text-slate-500">View Banners</button>
            </div>
            {!isHidden && (
                <div className="bg-white rounded p-5 shadow-md absolute z-10 top-[30%] sm:left-[400px] transition-transform w-[70vw]">
                    <div>
                        <div className='relative flex justify-center'>
                            <h2 className="text-2xl font-bold mb-4 text-center">Banners</h2>
                            <img onClick={() => { setIsHidden(true) }} className='w-6 h-6 absolute right-0 top-0 cursor-pointer' src={closeIcon} alt='close-icon' />
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {banners.map(banner => (
                                    <div key={banner.bannerId} className="relative group">
                                        <img
                                            src={`http://abdoo120-001-site1.ctempurl.com/${banner.bannerImageUrl}`}
                                            alt="banner-image"
                                            className="h-32 w-full object-cover rounded"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="bg-red-500 text-white p-2 rounded-full"
                                                onClick={() => deleteCategory(banner.bannerId, banner.bannerImageUrl)}
                                            >
                                                <img src={deleteImage} alt="delete-icon" className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBanner;
