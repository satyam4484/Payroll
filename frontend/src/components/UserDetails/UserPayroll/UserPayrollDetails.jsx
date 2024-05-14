import React, { useState } from 'react'
import { getPayrollDetails } from '../../../api/apiUrl'
import UpdateUserPayroll from './UpdateUserPayroll'
import AddUserPayroll from './AddUserPayroll'

const UserPayrollDetails = ({ user, payrollDetails, dataLoaded, isPayroll, setIsPayroll, onBack, handleOpen, openPayroll, role }) => {

    const userId = user?._id

    const [openAddPayroll, setOpenAddPayroll] = useState(false);

    const handleAddPayrollDetails = () => {
        if (userId) {
            setOpenAddPayroll(true)
            setIsPayroll(false);
        }
    }

    return (
        <>
            {/* Payroll Modal */}
            {
                dataLoaded && openPayroll && !isPayroll && (
                    <UpdateUserPayroll
                        payrollDetails={payrollDetails}
                        user={userId}
                        onClose={onBack}
                    />
                )
            }

            {
                isPayroll && (
                    <div className='bg-white rounded-xl p-4 text-center space-y-3 shadow-md mx-3'>
                        <p className='text-red-400 italic text-sm'>No Payroll Found!</p>
                        <button
                            className='plus-jkrt font-medium shadow-md bg-green-400 text-white text-xs px-2 py-1 rounded-lg'
                            onClick={() => {
                                handleAddPayrollDetails()
                                handleOpen()
                            }}
                        >Add Payroll</button>
                    </div>
                )
            }

            {
                openAddPayroll && (
                    <AddUserPayroll
                        user={userId}
                        onClose={onBack}
                        userRole={role}
                    />
                )
            }

        </>
    )
}

export default UserPayrollDetails