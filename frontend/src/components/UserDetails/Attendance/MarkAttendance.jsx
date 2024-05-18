import React, { useEffect, useState } from 'react'
import { CrossIcon } from '../../../ui/Icons'
import { getTodayAttendance, getMonthlyAttendance, markAttendance } from '../../../api/apiUrl'

const MarkAttendance = ({ user, onBack }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState(0); // Default to absent
    const [overtime, setOvertime] = useState('');
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);

    // Fetch monthly attendance data when the component mounts or selectedDate changes
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const formattedDate = `${year}-${month}`

                const attendData = {
                    user: user._id,
                    date: formattedDate
                }

                const response = await getMonthlyAttendance(attendData);
                if (!response.error) {
                    console.log(response.attendance)
                    setAttendanceData(response.attendance);
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };
        fetchAttendanceData();
    }, [selectedDate, user._id]);

    const handleMarkAttendance = () => {
        setAttendanceMarked(false)
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const attendanceData = {
            user: user._id,
            date: formattedDate,
            status: status,
            overtime: overtime ? overtime : 0
        };

        // console.log(attendanceData)

        markAttendance(attendanceData).then((response) => {
            if (!response.error) {
                console.log(response.Mesage);
                setAttendanceMarked(true)

                setTimeout(() => {
                    setAttendanceMarked(false)
                }, 2000)

                // Refetch attendance data after marking attendance
                const fetchAttendanceData = async () => {
                    try {
                        const year = selectedDate.getFullYear();
                        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                        const formattedDate = `${year}-${month}`

                        const attendData = {
                            user: user._id,
                            date: formattedDate
                        }

                        const response = await getMonthlyAttendance(attendData);

                        if (!response.error) {
                            setAttendanceData(response.attendance);
                        }
                    } catch (error) {
                        console.error("Error fetching attendance data:", error);
                    }
                };
                fetchAttendanceData();

            }
        }).catch((error) => {
            console.log(error);
            setAttendanceMarked(false)
        });

        setModalOpen(false);
    }

    const handleDateClick = (date) => {
        const today = new Date();
        if (date > today) return;
        setSelectedDate(date);
        setModalOpen(true);
    };

    const renderCalendar = () => {
        const today = new Date();
        const daysInMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ).getDate();

        const firstDayIndex = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        ).getDay();

        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                i
            );
            const isToday =
                i === today.getDate() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getFullYear() === today.getFullYear();

            const isFutureDate = date > today;
            const isSelectedDate = date.toDateString() === selectedDate.toDateString();

            const attendanceRecord = attendanceData.find(record => {
                const recordDate = new Date(record.date);
                return recordDate.getFullYear() === date.getFullYear() &&
                    recordDate.getMonth() === date.getMonth() &&
                    recordDate.getDate() === date.getDate();
            });

            const isPresent = attendanceRecord !== undefined  ;

            days.push(
                <div className='flex justify-center' key={i}>
                    <div
                        className={`day calendar hover:bg-gray-200 hover:text-black ${isToday ? 'bg-blue-200' : ''} ${isSelectedDate ? 'bg-blue-500 text-white' : ''} ${isFutureDate ? 'hover:text-gray-400 text-gray-400 cursor-not-allowed' : 'cursor-pointer'} ${!isFutureDate && isPresent ? 'hover:bg-green-100 bg-green-500/70 border border-green-500' : !isFutureDate ? 'hover:bg-red-100 bg-red-500/50 border border-red-500' : ''}`}
                        onClick={() => !isFutureDate && handleDateClick(date)}
                    >
                        {i}
                    </div>
                </div>
            );
        }

        return days;
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startDayIndex = firstDayOfMonth.getDay(); // Get the index of the starting day of the month

        return daysOfWeek.map((day, index) => {
            const adjustedIndex = (index + startDayIndex) % 7; // Adjust index to start from the correct day
            return (
                <div
                    key={index}
                    className={`text-center text-gray-500`}
                >
                    {daysOfWeek[adjustedIndex]}
                </div>
            );
        });
    };


    // formatted date
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return (

        <div>
            <div className="flex items-center justify-evenly">
                <p className="text-2xl font-bold plusJakartaSans uppercase">Attendance</p>
                <div className="bg-white px-3 py-1 rounded-xl">
                    <p className='text-gray-500 text-sm'>Name:  <span className='plus-jkrt uppercase text-gray-900 font-semibold'>{user.name}</span></p>
                    <p className='text-gray-500 text-sm'>Userid:  <span className='plus-jkrt text-gray-900 font-semibold'>{user.user_id}</span></p>
                    <p className='text-gray-500 text-sm'>Today's Date:  <span className='plus-jkrt text-gray-900 font-semibold'>{formattedDate}</span></p>
                </div>
            </div>
            {/* close button */}
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    onClick={onBack}
                    className=" p-3 hover:shadow-md hover:rounded-full hover:bg-white"
                >
                    <CrossIcon />
                </button>
            </div>

            <div className="grid grid-cols-7 bg-white p-5 rounded-xl shadow-md gap-3 mt-4">
                {renderDaysOfWeek()}
                {renderCalendar()}
            </div>

            {
                attendanceMarked && (
                    <p className={`poppins text-center my-4 font-semibold ${attendanceMarked ? 'text-green-500' : 'text-red-500'} `}>
                        {attendanceMarked ? 'Attendance Marked Successfully!' : 'Error!'}
                    </p>
                )
            }

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">

                    <div className="bg-white p-6 rounded-lg w-96">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Mark Attendance</h2>
                            <button className="text-gray-500 rounded-full p-1 hover:bg-gray-200 hover:shadow-md" onClick={() => setModalOpen(false)}>
                                <CrossIcon />
                            </button>
                        </div>

                        {/* Selected Date */}
                        <p className='text-sm text-gray-500'>Date: <span className='text-gray-900 font-medium text-base'>{selectedDate.toDateString()}</span></p>

                        {/* Status */}
                        <label className="flex items-center mt-2">
                            Status:
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(parseFloat(e.target.value))
                                }
                                className="w-16 ml-10 p-1 font-medium border border-gray-300 focus:border-blue-400 outline-none rounded-md shadow-sm"
                            >
                                <option value="0">0</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                            </select>
                            <p className='text-gray-500 text-sm mx-2'>{status === 0.5 && 'Half Day' || status === 1 && 'Full Day' || status === 0 && 'Absent'}</p>
                        </label>

                        {/* Overtime */}
                        {(status === 0.5 || status === 1) && (
                            <label className="flex items-center mt-2">
                                Overtime:
                                <input
                                    type="number"
                                    value={overtime}
                                    onChange={(e) => setOvertime(parseInt(e.target.value))}
                                    placeholder='E.g 4'
                                    className="w-16 ml-10 p-1 font-medium border border-gray-300 focus:border-blue-400 outline-none rounded-md shadow-sm"
                                />
                            </label>
                        )}
                        <button
                            onClick={handleMarkAttendance}
                            className="mt-4 float-end bg-blue-500 text-white rounded-lg px-4 py-1 hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>


                </div>
            )}
        </div>
    )
}

export default MarkAttendance