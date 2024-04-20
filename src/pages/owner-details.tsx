import React, { useState } from "react";
import Navbar from "../components/navbar/navbar.com";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import avatar from "../assets/2151005751.jpg";
import TableHead from "../components/table/head.comp";
import OwnerRow from "../components/table/row.comp";
import { useAuth } from "../context/authContext";
import RevenueChart from "../components/charts/revenue-charts.comp";
import DisplayNumbers from "../components/numberCart/number-cart";
import Footer from "../components/footer/footer.comp";
import OwnerBasicInfo from "../components/owners/owner-basicinfo.comp";
import OwnerRevenue from "../components/owners/owner-revenue.comp";
import PlayGroundView from "../components/owners/playgrounds-view.comp";
import Feedback from "../components/owners/clients-feedback.comp";



const OwnerDetailsPage: React.FC = () => {

    const { user } = useAuth()

    const [navbarIsHidden, setNavbarIsHidden] = useState(true);

    const navbarDisplayHandle = (bool: boolean) => {
        setNavbarIsHidden(bool);
    }

    const deleteHandle = () => {
        console.log("deleted");
    }

    return (
        <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">

            <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
                <img onClick={() => { navbarDisplayHandle(false) }} src={humbrgerBar} alt="humbBar" />
            </div>
            <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

            <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
                <Nav />
                <div className="flex flex-col gap-20 w-[100%] p-10 bg-slate-100 absolute top-[150px]">
                    <div className="flex gap-5 mt-10">
                        <DisplayNumbers title="Revenue" number={1000} sign="$" />
                        <DisplayNumbers title="Clients" number={200} />
                    </div>
                    <OwnerBasicInfo />

                    <OwnerRevenue />
                    <PlayGroundView />

                    <Feedback />
                    <Footer />
                </div>
            </div>
        </div>
    )
}


export default OwnerDetailsPage;