import React from "react";
import avatar from "../../assets/2151005751.jpg";


const OwnerBasicInfo:React.FC = ()=>{


    return (
        <div className="flex flex-col gap-5 p-5 bg-white rounded">
                        <h2 className="font-bold text-2xl border-b border-slate-400 pb-3">Basic Info</h2>
                       <div className="flex justify-around items-center flex-wrap gap-5">
                       <div className="flex flex-col">
                            <img className="w-20 h-20 rounded-full" src={avatar} alt="avatar-image" />
                            <h2 className="font-bold text-xl">Mohamed ashraf</h2>
                        </div>
                        <div>
                            <p className="font-bold text-xl">Email : <span className="text-sm text-slate-500">mohamed@gmail.com</span></p>
                            <p className="font-bold text-xl">Phone : <span className="text-sm text-slate-500">01120450953</span></p>
                            <p className="font-bold text-xl">Location : <span className="text-sm text-slate-500">Minya - Minya</span></p>
                        </div>
                       </div>
                    </div>
    )
}

export default OwnerBasicInfo;