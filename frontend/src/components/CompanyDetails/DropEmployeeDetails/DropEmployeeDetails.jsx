import React, { useState } from 'react'
import { ArrowDownIcon, DoubleArrowDropdownIcon } from '../../../ui/Icons'
import DownloadAttendanceDetails from './DownloadAttendanceDetails/DownloadAttendanceDetails';
import UploadAttendanceDetails from './DownloadAttendanceDetails/UploadAttendanceDetails';

const DropEmployeeDetails = ({ setError }) => {

    const [isEmployeeDetailsOpen, setIsEmployeeDetailsOpen] = useState(false);

    return (
        <>
            {/* Employee Details */}
            <button type='button'
                className='flex justify-between items-center w-full rounded-2xl border-[3px] border-[#69C9EB] shadow-md shadow-gray-500 bg-white px-4 py-2 lg:p-4'
                onClick={() => {
                    setIsEmployeeDetailsOpen(!isEmployeeDetailsOpen)
                }}
            >
                <p className='capitalize lexend font-medium'>Employee Details</p>
                <div className='sm:hidden md:hidden lg:block'>
                    {
                        isEmployeeDetailsOpen ? <ArrowDownIcon /> : <DoubleArrowDropdownIcon />
                    }
                </div>
            </button>

            {isEmployeeDetailsOpen && (
                <div className='mt-6 mx-3'>

                    {/* Download Attendance Details */}
                    <DownloadAttendanceDetails
                        setError={setError}
                    />

                    <UploadAttendanceDetails />

                </div>
            )}


        </>
    )
}

export default DropEmployeeDetails