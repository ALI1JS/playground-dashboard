import React, { useState } from "react";
import avatar from "../../assets/2151005751.jpg";
import { useAuth } from "../../context/authContext";

const Nav: React.FC = () => {

    const [catogeryDispaly, setcatogeryDispaly] = useState(false);
    const {user} = useAuth()
   
    const displayCatogeiesHandle = ()=>{
        setcatogeryDispaly(!catogeryDispaly);
    }

    return (
        <div className="flex items-center justify-between mt-5">

            <div className="flex gap-5 items-center">
                <div>
                  <button onClick={displayCatogeiesHandle} className=" transition-transform rounded px-2 lg:px-4 xl:py-3 py-2 ml-20 xl:ml-0 bg-blue-500 hover:bg-blue-600 font-bold text-white">Catogeries</button>
                  <div className={`${catogeryDispaly ?'block': 'hidden' } bg-white rounded shadow-md absolute z-10 top-15`}>
                        <ul className="flex flex-col w-[200px]">
                            <li className="hover:bg-slate-100 p-2 cursor-pointer">Football</li>
                            <li className="hover:bg-slate-100 p-2 cursor-pointer">Football</li>
                            <li className="hover:bg-slate-100 p-2 cursor-pointer">Football</li>
                            <li className="hover:bg-slate-100 p-2 cursor-pointer">Football</li>
                        </ul>
                  </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 font-bold items-center mr-10 xl:mr-0">
                <img src={avatar} alt="admin-image" className="w-12 h-12 rounded-full cursor-pointer" />
                <span>{user.username}</span>
            </div>

        </div>
    )
}

export default Nav;