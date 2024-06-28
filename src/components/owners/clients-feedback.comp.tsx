import React, { useState, useEffect } from "react";
import axios from "axios";
import fullStar from "../../assets/rate.png";
import emptyStar from "../../assets/rate2.png";
import defaultAvatar from "../../assets/avatar.png"; // Make sure to have a default avatar image
import toast from "react-hot-toast";

interface Review {
    playerId: string;
    comment: string;
}

interface ReviewWithUser extends Review {
    userName: string;
    profilePictureUrl: string;
}

interface FeedbackProps {
    reviews: Review[];
    rate: number;
}

const Feedback: React.FC<FeedbackProps> = ({ reviews, rate }) => {
    const [reviewsWithUser, setReviewsWithUser] = useState<ReviewWithUser[]>([]);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            const updatedReviews = await Promise.all(
                reviews.map(async (review) => {
                    try {
                        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Player/${review.playerId}`);
                        const userData = response.data;
                        
                        return {
                            ...review,
                            userName: userData.userName || 'Anonymous',
                            profilePictureUrl: userData.profilePictureUrl || defaultAvatar,
                        };
                    } catch (error:any) {
                        toast.error(`Failed to fetch user info for player ID: ${review.playerId}`, error);
                        return {
                            ...review,
                            userName: 'Anonymous',
                            profilePictureUrl: defaultAvatar,
                        };
                    }
                })
            );
            setReviewsWithUser(updatedReviews);
        };

        fetchUserInfo();
    }, [reviews]);

    const renderStars = (rate: number) => {
        const validRate = Math.max(0, Math.min(rate, 5));
        const fullStars = Math.floor(validRate);
        const emptyStars = 5 - fullStars;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <img key={`full-${index}`} src={fullStar} alt="full star" className="w-4 h-4 inline-block" />
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <img key={`empty-${index}`} src={emptyStar} alt="empty star" className="w-4 h-4 inline-block" />
                ))}
            </>
        );
    };

    return (
        <div className="font-bold bg-white rounded shadow-lg p-5 w-[90%]">
            <h2 className="text-2xl border-b border-slate-300 pb-3">Clients Feedback</h2>
            <div className="flex items-center gap-2 mt-3">
                {renderStars(rate)}
                <span className="text-slate-400">({rate})</span>
            </div>
            <ul className="text-sm flex flex-col gap-5 mt-5">
                {reviewsWithUser.length > 0 ? (
                    reviewsWithUser.map((review, index) => (
                        <li key={index} className="flex gap-10 items-center flex-wrap border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-3">
                                <img className="w-12 h-12 rounded-full" src={review.profilePictureUrl} alt="client" />
                                <span className="text-slate-400">{review.userName}</span>
                            </div>
                            <div className="flex-1">
                                <p>{review.comment}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-slate-400">No feedback available.</li>
                )}
            </ul>
        </div>
    );
};

export default Feedback;
