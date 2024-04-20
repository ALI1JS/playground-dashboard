import React from "react";
import avatar from "../../assets/2151005751.jpg";

const Feedback: React.FC = ()=>{


    return (
        <div className="font-bold bg-white rounded shadow-lg p-5 w-[90%]">
        <h2 className="text-2xl border-b border-slate-300 pb-3">Clients Feedback</h2>
        <ul className="text-sm flex flex-col gap-5 mt-5">
            <li className="flex gap-10 items-center flex-wrap border-b border-slate-200">
                <div>
                    <img className="w-12 h-12 rounded-full" src={avatar} alt="client-image" />
                    <span className="text-slate-400">Mahmoud</span>
                </div>

                <div>
                    <p>this playground is very good and the owner was so nice i will come back soon</p>
                </div>
            </li>
           
            <li className="flex gap-10 items-center flex-wrap border-b border-slate-200">
                <div>
                    <img className="w-12 h-12 rounded-full" src={avatar} alt="client-image" />
                    <span className="text-slate-400">Mahmoud</span>
                </div>

                <div>
                    <p>this playground is very good and the owner was so nice i will come back soon</p>
                </div>
            </li>
            
        </ul>

    </div>
    )
}


export default Feedback;