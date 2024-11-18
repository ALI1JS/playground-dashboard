import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the interface for the reservation data
interface StadiumImage {
  stadiumImageId: number;
  stadiumImageUrl: string;
}

interface Stadium {
  stadiumId: number;
  name: string;
  address: string;
  stadiumImages: StadiumImage[];
}

interface Reservation {
  reservationId: number;
  stadiumId: number;
  playerId: number;
  reservationPrice: number;
  reservationStartTime: string;
  reservationEndTime: string;
  approvalStatus: number;
  stadium: Stadium;
  playerName: string; // Assuming the player name is included in the response
}

const PlayerReservations: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get playerId from URL
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string>('');
  const [cancelModal, setCancelModal] = useState<{ show: boolean; reservationId: number | null }>({
    show: false,
    reservationId: null,
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reservationsPerPage = 5; // Number of reservations to display per page

  useEffect(() => {
    // Fetch reservations for the player
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Player/StadiumReservations/${id}`);
        console.log(response.data); // Log the response to inspect the structure
        // Ensure the data is an array before setting it
        if (Array.isArray(response.data)) {
          setReservations(response.data);
        } else {
          setError('Unexpected data format. Failed to load reservations.');
        }
      } catch (error) {
        setError('Failed to load reservations. Please try again.');
      }
    };

    fetchReservations();
  }, [id]);

  const handleCancel = async (reservationId: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/Player/CancelStadiumReservation/${reservationId}`);
      
      // Update the status of the reservation instead of removing it
      setReservations((prevReservations) =>
        prevReservations.map((reservation) => {
          if (reservation.reservationId === reservationId) {
            return { ...reservation, approvalStatus: 3 }; // Assuming 3 represents 'Cancelled'
          }
          return reservation;
        })
      );
      setCancelModal({ show: false, reservationId: null });
    } catch (error) {
      setError('Failed to cancel reservation. Please try again.');
    }
  };

  const renderApprovalStatus = (status: number) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Confirmed';
      case 3:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  // Logic for pagination
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);

  return (
    <div className="md:w-[80vw] mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-start">Player Reservations</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {currentReservations.length === 0 ? (
        <p className="text-center">No reservations found.</p>
      ) : (
        currentReservations.map((reservation) => (
          <div key={reservation.reservationId} className="border-b py-4">
            <div className="flex space-x-4">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${reservation.stadium.stadiumImages[0]?.stadiumImageUrl}`}
                alt="Stadium"
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{reservation.stadium.name}</h2>
                <p>{reservation.stadium.address}</p>
                <p>Price: ${reservation.reservationPrice}</p>
                <p>
                  Time: {new Date(reservation.reservationStartTime).toLocaleString()} -{' '}
                  {new Date(reservation.reservationEndTime).toLocaleString()}
                </p>
                <p>Status: {renderApprovalStatus(reservation.approvalStatus)}</p>
                {reservation.approvalStatus !== 3 && ( // Show cancel button only if not cancelled
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded-md mt-2 hover:bg-red-700"
                    onClick={() => setCancelModal({ show: true, reservationId: reservation.reservationId })}
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 text-black py-1 px-3 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 text-black py-1 px-3 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModal.show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this reservation?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
                onClick={() => setCancelModal({ show: false, reservationId: null })}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleCancel(cancelModal.reservationId!)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerReservations;
