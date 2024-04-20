import React from "react";
import Input from "../login/input.comp";
import closeIcon from "../../assets/close-icon.png";

interface CatogeryFormProps {
    isHidden: boolean,
    addCatogeryHandle: (bool:boolean)=>void
}

const CatogeryForm:React.FC<CatogeryFormProps> = ({isHidden, addCatogeryHandle})=>{

    return (
        <div className={`${isHidden && 'hidden'} bg-white rounded p-5 shadow-md absolute z-10 top-[30%] sm:left-[400px] transition-transform w-[300px]`}>
                <div className='relative flex justify-center'>
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Catogery</h2>
                    <img onClick={() => { addCatogeryHandle(true) }} className='w-6 h-6 absolute right-0 cursor-pointer' src={closeIcon} alt='close-icon' />
                </div>
                <form className="flex flex-col gap-5 justify-center">
                    <Input name="catogery" type="text" label="add catogery" />
                    <Input type="file" name="catogery-image" label="Upload image" accept="image/*" isHidden="hidden" bg="bg-green-500" px="px-4" py="py-3" font="font-bold" rounded="rounded" pointer="cursor-pointer" textCenter="center" textColor="white" />
                    <button type="submit" className="rounded w-32 px-4 py-3 bg-blue-500 hover:bg-blue-600 font-bold text-white"> Add</button>
                </form>
            </div>
    )
}

export default CatogeryForm;