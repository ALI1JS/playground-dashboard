import React, { useState } from "react";
import plusIcon from "../../assets/plus-icon.png";
import BannerForm from "./add-banner-form";


const AddCatoggery: React.FC = () => {

    const [isHidden, setIsHidden] = useState(true);


    const addCatogeryHandle = (bool: boolean) => {
        setIsHidden(bool);
    }

    return (
        <div>
            <div onClick={() => { addCatogeryHandle(false) }} className="flex items-center cursor-pointer">
                <img className="w-5 h-5" src={plusIcon} alt="plus-icon" />
                <button className="px-4 py-3 font-bold text-slate-500">Add Banner</button>
            </div>
             <BannerForm isHidden={isHidden} addBannerHandle={()=>{addCatogeryHandle(true)}}/>
              
        </div>
    )
}


export default AddCatoggery;