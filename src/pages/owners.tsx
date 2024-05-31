import React, { useState, useContext } from 'react';
import Navbar from '../components/navbar/navbar.com';
import DisplayNumbers from '../components/numberCart/number-cart';
import TableHead from '../components/table/head.comp';
import OwnerRow from '../components/table/row.comp';
import Nav from '../components/nav/nav.comp';
import humbrgerBar from '../assets/menu-icon.png';
import Footer from '../components/footer/footer.comp';
import { OwnersContext } from '../context/ownersContext';

const OwnersDisplay: React.FC = () => {
  const [navbarIsHidden, setNavbarIsDisplay] = useState(true);
  const { displayedOwners, loadMoreOwners } = useContext(OwnersContext); // Ensure context is correct

  const navbarDisplayHandle = (bool: boolean) => {
    setNavbarIsDisplay(!bool); // Fix toggle behavior
  };

  const viewHandle = () => {
    console.log('view');
  };

  return (
    <div className="flex gap-5 w-full min-h-screen relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle(true)} src={humbrgerBar} alt="menu-icon" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-full xl:w-[72%] 2xl:w-[78%] min-h-full flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex flex-col gap-20 w-full p-10 bg-slate-100 absolute top-[150px]">
          <div className="w-full flex gap-5 mt-20">
            <DisplayNumbers title="Revenue" number={200} sign="$" />
            <DisplayNumbers title="Owners" number={200} />
          </div>

          <div className="container mx-auto bg-white rounded py-3">
            <div className="overflow-x-auto">
              <h2 className="font-bold text-slate-400 p-3">All Owners</h2>
              <table className="table-auto min-w-full">
                <TableHead
                  label1="Name"
                  label2="Email"
                  label3="Phone"
                  label4="Location"
                  label5="Price/Hour"
                  label6="Clients"
                  label7="Actions"
                />
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Conditional rendering to ensure displayedOwners is an array */}
                  {Array.isArray(displayedOwners) ? (
                    displayedOwners.map((owner) => (
                      <OwnerRow
                        key={owner.id} // Use a unique key
                        id={owner.id}
                        label1={owner.name}
                        label2={owner.email}
                        label3={owner.phone}
                        label4={owner.location}
                        label5={100}
                        label6={200}
                        view={viewHandle}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className='font-bold text-xl text-center'>Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={loadMoreOwners}
              className="hover:bg-blue-600 bg-blue-500 rounded px-5 py-3 font-bold text-white"
            >
              More
            </button>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OwnersDisplay;
