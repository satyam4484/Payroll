import React, { useRef, useState } from 'react'
import { UploadIcon } from '../../../../ui/Icons'
import Message from '../../../../ui/Message'
import { BASE_URL } from '../../../../api/apiClient';
import axios from 'axios';

const UploadAttendanceDetails = () => {

    const companyId = localStorage.getItem('companyId')

    const attendanceSheetRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [generating, setGenerating] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [messageState, setMessageState] = useState(false)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    };

    // function to upload files
    const handleUploadFile = async () => {

        if (selectedFile && selectedDate) {
            try {
                setGenerating(true)
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("date", selectedDate);

                const headers = {
                    "Content-Type": "multipart/form-data",
                };
                const response = await axios.post(`${BASE_URL}attendance/mark_sheet`,
                    formData,
                    { headers }
                )

                if (response.data.error == false) {
                    // console.log(response.data.Message)
                    setMessageState(false)
                    setMessage(response.data.Message)
                }

                setSelectedFile(null);
                if (attendanceSheetRef.current) {
                    attendanceSheetRef.current.value = ''; // Reset the file input value
                }
                setSelectedDate('')

                setTimeout(() => {
                    setMessage('');
                }, 2000);

            } catch (error) {
                console.error("Error uploading file:", error);
                setMessageState(true)
                setMessage('Error')
            } finally {
                setGenerating(false);
            }
        } else {
            setMessageState(true)
            setMessage('Please fill in required fields')
        }
    }

    // function to select files
    const handleSelectFileAttendanceSheet = () => {
        attendanceSheetRef.current.click();
    };

    const handleSelectDate = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }

    const handleCancel = () => {
        setSelectedFile(null);
        setSelectedDate('');
        setMessage('')
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type='button'
                className="flex items-center justify-center w-full bg-white border-[3px] border-[#80D69C] shadow-md rounded-2xl py-2 px-4 lg:p-3 my-3"
                onClick={handleSelectDate}
            >
                <p className='lexend font-medium text-md flex items-center gap-2'>
                    Upload Attendance Details
                </p>
            </button>

            {
                isModalOpen && (

                    <div className='p-4 bg-white shadow-lg rounded-xl overflow-auto'>

                        {/* Upload Attendance File */}
                        <div>
                            {/* <p className='text-xs text-center mb-1'>Upload Attendance File</p> */}
                            <div className='relative border border-gray-400 rounded-lg m-2'>
                                <p
                                    className="px-3 py-4 text-xs cursor-pointer"
                                    onClick={handleSelectFileAttendanceSheet}
                                >
                                    {selectedFile ? selectedFile.name : 'Upload Attendance Sheet'}
                                </p>
                                <input
                                    type="file"
                                    ref={attendanceSheetRef}
                                    accept=".xlsx"
                                    name="attendanceSheet"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={handleSelectFileAttendanceSheet}
                                    className="absolute top-3 right-3 cursor-pointer focus:outline-none"
                                >
                                    <UploadIcon />
                                </button>
                            </div>
                        </div>

                        {/* Select a Month and Year */}
                        <div className='space-y-3'>
                            <div className='border border-gray-400 rounded-lg m-2 p-2'>
                                <p className='text-xs text-center mb-1'>Select a Month and Year</p>
                                <div className='text-center my-2'>
                                    <input
                                        type="month"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        className='text-center w-40 text-sm border rounded-lg px-2 outline-none'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                <button
                                    className='bg-red-400 px-2 text-sm rounded-lg text-white shadow-md focus:shadow-none'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUploadFile}
                                    className='bg-green-400 px-2 text-sm rounded-lg text-white shadow-md focus:shadow-none'
                                >
                                    {generating ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                            {/* Error Message */}
                            {
                                message &&
                                <p className={`mx-2 text-center font-medium text-xs capitalize italic ${messageState ? 'text-red-400' : 'text-green-400'} `}>
                                    {message}!
                                </p>
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UploadAttendanceDetails