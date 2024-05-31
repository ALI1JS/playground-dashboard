import React, { useEffect, useContext, useState } from "react";
import Navbar from "../components/navbar/navbar.com";
import DisplayNumbers from "../components/numberCart/number-cart";
import ChartComponent from "../components/charts/owners-chrts.comp";
import RevenueChart from "../components/charts/revenue-charts.comp";
import OwnerView from "../components/owners/owners.viewcomp";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import Footer from "../components/footer/footer.comp";
import axios from "axios";
import { OwnersContext } from "../context/ownersContext";



const Dashboard: React.FC = () => {

     const [navbarIsHidden, setNavbarIsHidden] = useState(true);
     const {storeOwners} = useContext(OwnersContext);
     const navbarDisplayHandle = (bool: boolean) => {
          setNavbarIsHidden(bool);
     }

     useEffect( ()=>{

          const fetchOwners = async()=>{

               const ownersBasicInfo = await axios.get('/api/owners/basic-info');
               console.log(ownersBasicInfo.data);
               storeOwners(ownersBasicInfo.data);
          }

          fetchOwners();
     }, [storeOwners])
     
     return (
          <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
               <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
                    <img onClick={() => { navbarDisplayHandle(false) }} src={humbrgerBar} alt="humbBar" />
               </div>
               <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

               <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
                    <Nav />
                    <div className="flex flex-col gap-20 w-[100%] p-10 bg-slate-100 absolute top-[150px]">
                         <div className="w-[100%] flex gap-5 mt-10">
                              <DisplayNumbers title="Revenue" number={200} sign="$" />
                              <DisplayNumbers title="Owners" number={200} />
                         </div>
                         <div className="w-[100%] flex justify-between gap-2 flex-wrap">
                              <ChartComponent />
                              <RevenueChart />
                         </div>

                            <OwnerView />

                         <Footer />

                    </div>
               </div>
          </div>
     )
}


export default Dashboard;