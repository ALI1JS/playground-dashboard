import React, { useState } from 'react';
import ownerIcon from "../../assets/plus-icon.png";
import closeIcon from "../../assets/close-icon.png";
import Input from '../login/input.comp';

const CreateOwner: React.FC = () => {

    const [isHidden, setIsHidden] = useState(true);
    // State to hold owner information
    const [ownerInfo, setOwnerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        password: ''
    });

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOwnerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to submit owner information to backend or perform any other action
        console.log('Owner info:', ownerInfo);
        // Reset form fields
        setOwnerInfo({
            name: '',
            email: '',
            phone: '',
            location: '',
            password: ''
        });
    };
   
   

    const CreateOwnerHandle = (bool: boolean) => {
        setIsHidden(bool);
    }
    return (
        <div className="">
              <div className='flex gap-3 cursor-pointer' onClick={()=>{CreateOwnerHandle(false)}}>
                  <img className='w-5 h-5' src={ownerIcon} alt='create owner'/>
                   <h2 className='font-bold text-slate-500'>Create Owner</h2>
              </div>
              {
                !isHidden && 
                <div className={`w-[330px] sm:w-[50vw] xl:w-[30vw] p-10 absolute top-0 md:top[20%] sm-left-[350px] z-10 bg-white rounded shadow-lg transition-transform`}>
                 <div className='relative flex justify-center'>
                   <h2 className="text-2xl font-bold mb-4 text-center">Create Owner</h2>
                   <img  onClick={()=>{CreateOwnerHandle(true)}} className='w-6 h-6 absolute right-0 cursor-pointer' src={closeIcon} alt='close-icon'/>
                 </div>
                <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-5">
                    
                    <Input type='text' name='name' value={ownerInfo.name} label='Owner name' handleOnChange={handleChange}/>
                    <Input type='email' name='email' value={ownerInfo.email} label='Owner Email' handleOnChange={handleChange}/>
                    <Input type='tel' name='phone' value={ownerInfo.phone} label='Owner Phone' handleOnChange={handleChange}/>
                    <Input type='text' name='location' value={ownerInfo.location} label='Owner Location' handleOnChange={handleChange}/>
                    <Input type='password' name='password' value={ownerInfo.password} label='password' handleOnChange={handleChange}/>
                    <button type="submit" className="rounded p-3 bg-blue-500 hover:bg-blue-600 font-bold text-white"> Create Owner</button>
                </form>
            </div>
              }
            
        </div>
    );
};

export default CreateOwner;
