import React from "react";
import fullStar from "../../assets/rate.png";
import emptyStar from "../../assets/rate2.png";

interface Review {
    username: string;
    avatar: string;
    comment: string;
}

interface FeedbackProps {
    reviews: Review[];
    rate: number;
}

const Feedback: React.FC<FeedbackProps> = ({ reviews, rate }) => {
    const renderStars = (rate: number) => {
        // Ensure rate is within the valid range of 0 to 5
        const validRate = Math.max(0, Math.min(rate, 5));
        
        console.log(`Original rate: ${rate}, Validated rate: ${validRate}`);

        const fullStars = Math.floor(validRate);
        const emptyStars = 5 - fullStars;

        console.log(`Full stars: ${fullStars}, Empty stars: ${emptyStars}`);

        // Ensure valid array lengths
        if (fullStars < 0 || fullStars > 5 || emptyStars < 0 || emptyStars > 5) {
            return null;
        }

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
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <li key={index} className="flex gap-10 items-center flex-wrap border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-3">
                                <img className="w-12 h-12 rounded-full" src={review.avatar} alt="client" />
                                <span className="text-slate-400">{review.username}</span>
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
