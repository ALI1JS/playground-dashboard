import React from 'react';
import TableHead from '../table/head.comp';
import OwnerRow from '../table/row.comp';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PlayGround {
    stadiumId: string;
    reservationPrice: number;
    reservationStartTime: string;
    reservationEndTime: string;
}

interface PlayGroundViewProps {
    playgrounds: PlayGround[];
}

const PlayGroundView: React.FC<PlayGroundViewProps> = ({ playgrounds }) => {

    const deleteHandle = async (id: string) => {
        try {
            const response = await axios.delete(`http://abdoo120-001-site1.ctempurl.com/api/Stadium/Delete/${id}`);
            if (response.status === 200) {
                toast.success('Playground deleted successfully');
            } else {
                toast.error('Failed to delete playground');
            }
        } catch (error: any) {
            toast.error('Error deleting playground: ' + error.message);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container mx-auto bg-white rounded py-3">
            <div className="overflow-x-auto">
                <h2 className="font-bold text-slate-400 p-3">All PlayGrounds</h2>
                <table className="table-auto min-w-full">
                    <TableHead
                        label1='Price/Hour'
                        label2="Reservation Start"
                        label4="Reservation End"
                        label7="Actions"
                    />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {playgrounds.length > 0 ? (
                            playgrounds.map((playground) => (
                                <OwnerRow
                                    key={playground.stadiumId}
                                    id={playground.stadiumId}
                                    label1={playground.reservationPrice}
                                    label2={formatDate(playground.reservationStartTime)}
                                    label4={formatDate(playground.reservationEndTime)}
                                    delete={() => deleteHandle(playground.stadiumId)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center font-bold text-xl py-5">
                                    PlayGrounds Not Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayGroundView;
