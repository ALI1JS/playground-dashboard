import React, { useContext, useEffect, useState } from "react";
import humbrgerBar from "../assets/menu-icon.png";
import Nav from "../components/nav/nav.comp";
import Navbar from "../components/navbar/navbar.com";
import DisplayNumbers from "../components/numberCart/number-cart";
import OwnerView from "../components/owners/owners.viewcomp";
import { OwnersContext } from "../context/ownersContext";
import establishedConnection from "../utils/signal";

const Dashboard: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  const { fetchOwners, totalOwners } = useContext(OwnersContext);
  console.log("last update");
  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    establishedConnection();
  }, []);

  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img
          onClick={() => navbarDisplayHandle()}
          src={humbrgerBar}
          alt="humbBar"
        />
      </div>
      <Navbar
        closeNavbar={navbarDisplayHandle}
        isHidden={navbarIsHidden}
      />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex flex-col gap-20 w-[100%] p-10 bg-slate-100 absolute top-[150px]">
          <div className="w-[100%] flex gap-5 mt-10">
            <DisplayNumbers
              title="Owners"
              number={totalOwners}
            />
          </div>

          <OwnerView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
