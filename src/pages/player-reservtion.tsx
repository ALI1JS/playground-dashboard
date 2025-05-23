import React, { useState} from "react";
import Navbar from "../components/navbar/navbar.com";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import PlayerReservations from "../components/reservations/player.resvition";

const PLayerReservtion: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);

  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };


  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle()} src={humbrgerBar} alt="humbBar" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex justify-center w-[100%] mt-10 p-10 bg-slate-100">
            <PlayerReservations/>
        </div>
      </div>
    </div>
  );
};

export default PLayerReservtion;
