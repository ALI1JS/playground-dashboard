import { useState, useEffect, ChangeEvent } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportDocument from './report-document';
import axios from 'axios';
import Navbar from '../navbar/navbar.com';
import Nav from '../nav/nav.comp';
import humbrgerBar from "../../assets/menu-icon.png";


interface PlayerData {
  activePlayersCount: number;
  approvedPlayersCount: number;
  femalePlayersCount: number;
  malePlayersCount: number;
  pendingPlayersCount: number;
  playersCount: number;
  totalPlayers: number;
  unActivePlayersCount: number;
}

interface OwnerData {
  approvedOwnersCount: number;
  ownersCount: number;
  ownersHaveStdiumsCount: number;
  ownersNotHaveStdiumsCount: number;
  pendingOwnersCount: number;
  totalOwners: number
}

interface Category {
  categoryId: number;
  categoryNameEn: string;
}

interface StadiumData {
  totalStadiums: number;
  activeStadiumsCount: number;
  unActiveStadiumsCount: number;
  approvedStadiumsCount: number;
  bothGenderStdiumsCount: number;
  femaleStdiumsCount: number;
  maleStdiumsCount: number;
  pendingStadiumsCount: number;
  stadiumsCount: number;
  categories: Category[];
}

interface ReservationData {
  gamesCount: number;
  gamesPrice: number;
  reservationsCount: number;
  reservationsPrice: number;
}


const Report: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState<'year' | 'month' | 'week'>('year');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);
  const [stadiumData, setStadiumData] = useState<StadiumData | null>(null);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);


  const [loading, setLoading] = useState<boolean>(true);


  const getStartAndEndDates = (period: 'year' | 'month' | 'week') => {
    const now = new Date();
    let startDate: string = '';
    let endDate: string = now.toISOString();

    if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1).toISOString();
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    } else if (period === 'week') {
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek).toISOString();
    }

    return { startDate, endDate };
  };


  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      const { startDate, endDate } = getStartAndEndDates(reportPeriod);
      try {
        // Fetch player data
        const playerResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Admin/PlayersReport`, {
          params: { startDate, endDate },
        });
        setPlayerData(playerResponse.data);

        // Fetch owner data
        const ownerResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Admin/OwnersReport`, {
          params: { startDate, endDate },
        });
        console.log("ownerData", ownerResponse.data)
        setOwnerData(ownerResponse.data);


        const staduimResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Admin/StadiumsReport`, {
          params: { startDate, endDate },
        });
        console.log(staduimResponse.data);
        setStadiumData(staduimResponse.data);


        const reservationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Admin/ReservationsReport`,
          {
            params: { startDate, endDate },
          }
        );
        setReservationData(reservationResponse.data);
        console.log("reservationResponse", reservationResponse.data)


      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportPeriod]);

  const handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setReportPeriod(e.target.value as 'year' | 'month' | 'week');
  };

  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle()} src={humbrgerBar} alt="Menu" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />
        <div className="p-8 bg-white mt-10 shadow-md rounded-lg space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-blue-600">Reports</h2>
            <select
              onChange={handlePeriodChange}
              value={reportPeriod}
              className="p-2 border border-gray-300 rounded-lg text-blue-600 font-semibold"
            >
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>
          </div>

          {loading ? (
            <p>Loading report data...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playerData && (
                <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">Players</h3>
                  <p>Total Players: {playerData.totalPlayers}</p>
                  <p>Active Players: {playerData.activePlayersCount}</p>
                  <p>Inactive Players: {playerData.unActivePlayersCount}</p>
                  <p>Approved Players: {playerData.approvedPlayersCount}</p>
                  <p>Pending Players: {playerData.pendingPlayersCount}</p>
                  <p>Male Players: {playerData.malePlayersCount}</p>
                  <p>Female Players: {playerData.femalePlayersCount}</p>
                </div>
              )}

              {ownerData && (
                <div className="p-6 bg-green-50 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Owners</h3>
                  <p>Total Owners: {ownerData.totalOwners}</p>
                  <p>approved Owners: {ownerData.approvedOwnersCount}</p>
                  <p>owners Have Stdiums: {ownerData.ownersHaveStdiumsCount}</p>
                  <p>owners Haven't Stdiums: {ownerData.ownersNotHaveStdiumsCount}</p>
                  <p>pending Owners: {ownerData.pendingOwnersCount}</p>
                </div>
              )}

              {
                stadiumData && (
                  <div className="p-6 bg-yellow-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-yellow-600">Stadiums</h3>
                    <p>Total Stadiums: {stadiumData.totalStadiums}</p>
                    <p>Approved Stadiums: {stadiumData.approvedStadiumsCount}</p>
                    <p>Male Stadiums: {stadiumData.maleStdiumsCount}</p>
                    <p>Female Stadiums: {stadiumData.femaleStdiumsCount}</p>
                    <p>Both Gender Stadiums: {stadiumData.bothGenderStdiumsCount}</p>
                    <p>Pending Stadiums: {stadiumData.pendingStadiumsCount}</p>
                    <h4 className="text-lg font-semibold mt-4 text-yellow-500">Categories:</h4>
                    <ul className="list-disc ml-6">
                      {stadiumData.categories.map((category) => (
                        <li key={category.categoryId}>{category.categoryNameEn}</li>
                      ))}
                    </ul>
                  </div>
                )
              }
              {
                reservationData && (
                  <div className="p-6 bg-green-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-green-600">Reservations</h3>
                    <p>Total Reservations: {reservationData.reservationsCount}</p>
                    <p> Game Price: {reservationData.gamesPrice}</p>
                    <p>Game Count: {reservationData.gamesCount}</p>
                    <p>reservations Price: {reservationData.reservationsPrice}</p>
                  </div>
                )

              }
            </div>
          )}

          {(playerData || ownerData) && (
            <PDFDownloadLink
              document={
                <ReportDocument
                  reportData={{
                    players: playerData,
                    owners: ownerData,
                    stadiums: stadiumData,
                    reservations: reservationData,
                  }}
                  reportType={reportPeriod}
                />
              }
              fileName={`${reportPeriod}_report.pdf`}
            >

              <div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Download {reportPeriod.charAt(0).toUpperCase() + reportPeriod.slice(1)} Report as PDF
                </button>
              </div>
            </PDFDownloadLink>
          )}

        </div>

      </div>
    </div>
  );
};

export default Report;
