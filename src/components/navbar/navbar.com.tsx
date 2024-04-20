import React from 'react';
import { Link } from 'react-router-dom';
import AddCatoggery from '../catogery/add-catogery.comp';
import AddBanner from '../banner/add-banner.comp';
import CreateOwner from '../owners/create-owner.comp';
import closeIcon from "../../assets/close-icon.png";
import homeIcon from "../../assets/home-icon.png";
import ownersIcon from "../../assets/all-user.png";
import activeIcon from "../../assets/active-user.png";


interface NavbarProps {
  isHidden?: boolean,
  closeNavbar: (bool:boolean)=> void
}

const Navbar: React.FC<NavbarProps> = (props) => {
  

  return (
    <div className={`bg-slate-100 xl:bg-white shadow-xl absolute top-[150px] xl:top-0 -translate-x-96 xl:translate-x-0 ${props.isHidden ? '-translate-x-96' : 'translate-x-0'} z-10 transition-transform min-h-[100%] w-[300px] flex flex-col gap-5`}>
      <div className='block xl:hidden'>
        <img onClick={() => { props.closeNavbar(true)}} className='w-6 h-6 absolute right-0 cursor-pointer' src={closeIcon} alt='close-icon' />
      </div>
      <div className='flex flex-col gap-5 font-bold cursor-pointer bg-slate-100 p-5 '>
        <Link to="/dashboard"><h1 className='mt-20 font-bold text-2xl p-2'>Dashboard</h1></Link>
        <Link className='flex gap-3' to="/dashboard"> <img className='w-6 h-6' src={homeIcon} alt="home-icon"/> Home</Link>
        <Link className='flex gap-3' to="/all-owners"> <img className='w-6 h-6' src={ownersIcon} alt="home-icon"/>All Owners</Link>
        <Link className='flex gap-3' to="/active-users"> <img className='w-6 h-6' src={activeIcon} alt="home-icon"/> Active Users</Link>
      </div>
      <div className='flex flex-col bg-slate-100 p-5'>
        <h2 className='font-bold text-2xl'>Catogery</h2>
         <AddCatoggery />
      </div>
      <div className='flex flex-col bg-slate-100 p-5'>
        <h2 className='font-bold text-2xl'>Banners</h2>
        <AddBanner />
      </div>

      <div className='flex flex-col bg-slate-100 p-5'>
        <h2 className='font-bold text-2xl'>Add Owner</h2>
        <CreateOwner />
      </div>
    </div>
  );
};

export default Navbar;
