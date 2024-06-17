import React from "react";

interface BasicInfoProps {
    username: string;
    email: string;
    avatar: string;
}

const OwnerBasicInfo: React.FC<BasicInfoProps> = ({ username, email, avatar}) => {
    return (
        <div className="flex flex-col gap-5 p-5 bg-white rounded">
            <h2 className="font-bold text-2xl border-b border-slate-400 pb-3">Basic Info</h2>
            <div className="flex justify-around items-center flex-wrap gap-5">
                <div className="flex flex-col items-center">
                    <img className="w-20 h-20 rounded-full" src={`abdoo120-001-site1.ctempurl.com/${avatar}`} alt="avatar-image" />
                    <h2 className="font-bold text-xl">{username}</h2>
                </div>
                <div>
                    <p className="font-bold text-xl">
                        Email: <span className="text-sm text-slate-500">{email}</span>
                    </p>
                    {/* <p className="font-bold text-xl">
                        Phone: <span className="text-sm text-slate-500">01120450953</span>
                    </p>
                    <p className="font-bold text-xl">
                        Location: <span className="text-sm text-slate-500">Egypt-Minya</span>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default OwnerBasicInfo;
