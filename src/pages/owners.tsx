import React, { useState } from "react";
import Navbar from "../components/navbar/navbar.com";
import DisplayNumbers from "../components/numberCart/number-cart";
import TableHead from "../components/table/head.comp";
import OwnerRow from "../components/table/row.comp";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";
import Footer from "../components/footer/footer.comp";



const OwnersDidpaly: React.FC = () => {

    const [navbarIsHidden, setNavbarIsDisplay] = useState(true);

    const navbarDisplayHandle = (bool: boolean) => {
        setNavbarIsDisplay(bool);
    }

    const deleteHandle = () => {
        console.log("deleted")
    }
    const viewHandle = () => {
        console.log("view")
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
                    <div className="w-[100%] flex gap-5 mt-20">
                        <DisplayNumbers title="Revenue" number={200} sign="$" />
                        <DisplayNumbers title="Owners" number={200} />
                    </div>

                    <div className="container mx-auto bg-white rounded py-3">
                        <div className="overflow-x-auto">
                            <h2 className="font-bold text-slate-400 p-3">All Owners</h2>
                            <table className="table-auto min-w-full">
                                <TableHead label1="name" label2="email" label3="Phone" label4="Location" label5="Price / Hour" label6="Clients Number" label7="Actions" />
                                <tbody className="bg-white divide-y divide-gray-200">
                                <OwnerRow id="1" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="2" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="3" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="4" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="5" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="6" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                <OwnerRow id="7" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="hover:bg-blue-600 bg-blue-500 rounded px-5 py-3 font-bold text-white">More</button>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}


export default OwnersDidpaly;