import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/navbar/navbar.com';
import DisplayNumbers from '../components/numberCart/number-cart';
import TableHead from '../components/table/head.comp';
import OwnerRow from '../components/table/row.comp';
import Nav from '../components/nav/nav.comp';
import humbrgerBar from '../assets/menu-icon.png';
import { OwnersContext } from '../context/ownersContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const OwnersDisplay: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  const { displayedOwners, loadMoreOwners, fetchOwners, totalOwners } = useContext(OwnersContext);

  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  const viewHandle = () => {
    console.log('View owner');
  };

  const deleteOwner = async (id: string) => {
    try {
      const res = await axios.delete(`https://abdoo120-001-site1.ctempurl.com/api/Owner/UnActive/${id}`);

      if (res.status === 200) {
        toast.success('The Owner Deleted Successfully');
        fetchOwners();
      } else {
        throw new Error("The Owner isn't deleted, try again");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const viewProofIdentifier = (url: string) => {
    const baseUrl = 'https://abdoo120-001-site1.ctempurl.com';
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}/${url}`;
    window.open(fullUrl, '_blank');
  };

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  const handleLoadMore = () => {
    const moreOwnersLoaded = loadMoreOwners();
    if (!moreOwnersLoaded) {
      toast('No more owners to load', { icon: '🚫' });
    }
  };

  return (
    <div className="flex gap-5 w-full min-h-screen relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle()} src={humbrgerBar} alt="menu-icon" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-full xl:w-[72%] 2xl:w-[78%] min-h-full flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="flex flex-col gap-20 w-full p-10 bg-slate-100 absolute top-[150px]">
          <div className="w-full flex gap-5 mt-20">
            <DisplayNumbers title="Owners" number={totalOwners} />
          </div>

          <div className="container mx-auto bg-white rounded py-3">
            <div className="overflow-x-auto">
              <h2 className="font-bold text-slate-400 p-3">All Owners</h2>
              <table className="table-auto min-w-full">
                <TableHead
                  label1="Name"
                  label2="Email"
                  label3="Proof of Identity"
                  label7="Actions"
                />
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(displayedOwners) ? (
                    displayedOwners.map((owner) => (
                      <OwnerRow
                        key={owner.ownerId}
                        id={owner.ownerId}
                        label1={owner.userName}
                        label2={owner.email}
                        label3={owner.proofOfIdentityUrl}
                        delete={() => deleteOwner(owner.ownerId)}
                        viewProofIdentifier={viewProofIdentifier}
                        view={viewHandle}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className='font-bold text-xl text-center' colSpan={4}>Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="hover:bg-green-600 bg-green-500 rounded px-5 py-3 font-bold text-white"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnersDisplay;
