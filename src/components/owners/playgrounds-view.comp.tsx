import React, { useState } from 'react';
import TableHead from '../table/head.comp';
import axios from 'axios';
import toast from 'react-hot-toast';
import closeIcon from "../../assets/close-icon.png";

interface PlayGround {
    stadiumId: string;
    name: string;
    pricePerHour: number;
    location: string;
    description: string;
    minHoursReservation: number;
    openTimes: { dayOfWeek: number; startTime: string; endTime: string }[];
    approvalStatus: boolean;
}

interface PlayGroundViewProps {
    playgrounds: PlayGround[];
}

const PlayGroundView: React.FC<PlayGroundViewProps> = ({ playgrounds: initialPlaygrounds }) => {
    const [playgrounds, setPlaygrounds] = useState<PlayGround[]>(initialPlaygrounds);
    const [expandedTimes, setExpandedTimes] = useState<{ dayOfWeek: number; startTime: string; endTime: string }[]>([]);

    const deleteHandle = async (id: string) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/Stadium/Delete/${id}`);
            if (response.status === 200) {
                setPlaygrounds(prevPlaygrounds => prevPlaygrounds.filter(playground => playground.stadiumId !== id));
                toast.success('Playground deleted successfully');
            } else {
                toast.error('Failed to delete playground');
            }
        } catch (error: any) {
            toast.error('Error deleting playground: ' + error.message);
        }
    };

    const activateHandle = async (id: string) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/Stadium/Active/${id}`);
            if (response.status === 200) {
                setPlaygrounds(prevPlaygrounds =>
                    prevPlaygrounds.map(playground =>
                        playground.stadiumId === id ? { ...playground, approvalStatus: true } : playground
                    )
                );
                toast.success('Playground activated successfully');
            } else {
                toast.error('Failed to activate playground');
            }
        } catch (error: any) {
            toast.error('Error activating playground: ' + error.message);
        }
    };

    const formatDayOfWeek = (dayOfWeek: number) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayOfWeek];
    };

    const toggleExpandedTimes = (times: { dayOfWeek: number; startTime: string; endTime: string }[]) => {
        setExpandedTimes(times);
    };

    const closeExpandedTimes = () => {
        setExpandedTimes([]);
    };

    return (
        <div className="container mx-auto bg-white rounded py-3">
            <div className="overflow-x-auto">
                <h2 className="font-bold text-slate-400 p-3">All PlayGrounds</h2>
                <table className="table-auto min-w-full">
                    <TableHead
                        label1='Name'
                        label2="Price/Hour"
                        label8="Location"
                        label4="Description"
                        label5="Min Hours Reservation"
                        label6="Open Times"
                        label7="Actions"
                    />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {playgrounds.length > 0 ? (
                            playgrounds.map((playground) => (
                                <tr key={playground.stadiumId}>
                                    <td className="px-4 py-2">{playground.name}</td>
                                    <td className="px-4 py-2">{playground.pricePerHour}</td>
                                    <td className="px-4 py-2">{playground.location}</td>
                                    <td className="px-4 py-2">{playground.description}</td>
                                    <td className="px-4 py-2">{playground.minHoursReservation}</td>
                                    <td className="px-4 py-2">
                                        {playground.openTimes.slice(0, 1).map((openTime, index) => (
                                            <div key={index}>
                                                {formatDayOfWeek(openTime.dayOfWeek)}: {openTime.startTime} - {openTime.endTime}
                                            </div>
                                        ))}
                                        {expandedTimes.length > 0 && (
                                            <div className="absolute bottom-96 right-0 p-5 w-[70vw] md:w-[50wv] lg:w-[30vw] bg-white shadow-md rounded-md mt-5">
                                                <div className="flex justify-end">
                                                    <button className="text-red-500" onClick={closeExpandedTimes}>
                                                        <img src={closeIcon} alt='playgrounds-open-time' className="h-6 w-6"/>
                                                    </button>
                                                </div>
                                                <h3 className="font-bold text-lg mb-3">All Open Times</h3>
                                                {expandedTimes.map((time, index) => (
                                                    <div key={index}>
                                                        {formatDayOfWeek(time.dayOfWeek)}: {time.startTime} - {time.endTime}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {playground.openTimes.length > 3 && (
                                            <button className="text-blue-500 mt-2" onClick={() => toggleExpandedTimes(playground.openTimes)}>
                                                View All
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        {playground.approvalStatus ? (
                                            <button
                                                className="bg-gray-500 text-white font-bold cursor-not-allowed px-3 py-2 rounded"
                                                disabled
                                            >
                                                Active
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => activateHandle(playground.stadiumId)}
                                                className="hover:bg-blue-600 bg-blue-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
                                            >
                                                Activate
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteHandle(playground.stadiumId)}
                                            className="hover:bg-red-600 bg-red-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
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
