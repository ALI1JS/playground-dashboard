import React from "react";
import Input from "../login/input.comp";
import addBanner from "../../assets/plus-icon.png";


const AddBanner:React.FC = () => {

    return (
        <div className="flex gap-3 mt-3">
            <img className="w-5 h-5" src={addBanner} alt="add-banner"/>
                <Input type="file" name="file" accept="image/*" label="Add Banner"
                    isHidden="hidden" rounded="rounded" textColor="black" font="font-bold"
                    pointer="cursor-pointer"
                />

        </div>
    )
}


export default AddBanner;