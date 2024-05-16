import React, { useEffect, useState } from 'react'
import { getPayrollDetails } from '../../../api/apiUrl'
import UpdateUserPayroll from './UpdateUserPayroll'
import AddUserPayroll from './AddUserPayroll'

const UserPayrollDetails = ({ user, isPayroll, setIsPayroll, onBack, handleOpen, openPayroll, setOpenPayroll, setShowProfile }) => {

    const userId = user._id
    const payrollId = user?.payroll?._id
    if (user?.payroll) {
        localStorage.removeItem('userPayrollId')
    }

    const newPayrollId = localStorage.getItem('userPayrollId')

    const [dataLoaded, setDataLoaded] = useState(false);
    const [payrollDetails, setPayrollDetails] = useState([]);
    const [openAddPayroll, setOpenAddPayroll] = useState(false);

    // Function to handle get Payroll Details
    useEffect(() => {
        if (userId && payrollId ? payrollId : newPayrollId) {
            getPayrollDetails(payrollId ? payrollId : newPayrollId).then((response) => {
                if (response.error === false) {
                    // console.log(response)
                    setPayrollDetails(response.payroll);
                    setOpenPayroll(true);
                    setDataLoaded(true)
                    setIsPayroll(false);
                    setShowProfile(false);
                }
            }).catch((error) => {
                // setError('Unable to view payroll details!')
                // setTimeout(() => {
                //     setError('');
                // }, 2000);
                // setIsPayroll(Object.keys(response.payroll).length > 0)
                setIsPayroll(true);
                setShowProfile(false);
                setOpenPayroll(false);
                setDataLoaded(false)
                setIsPayroll(true);
                console.log(error);
            });
        } else {
            console.log('No Company ID Selected!');
            setIsPayroll(true);
            setShowProfile(false);
            setOpenPayroll(false);
            setDataLoaded(false)
            setIsPayroll(true);
        }
    }, [])


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
                        userProps={user}
                        onClose={onBack}
                    />
                )
            }

            {
                isPayroll && (
                    <div className='bg-white rounded-xl p-4 text-center space-y-3 shadow-md mx-3'>
                        <div className="bg-white px-3 py-1 rounded-xl">
                            <p className='text-gray-500 text-sm'>Name:  <span className='plus-jkrt uppercase text-gray-900 font-semibold'>{user.name}</span></p>
                            <p className='text-gray-500 text-sm'>Userid:  <span className='plus-jkrt text-gray-900 font-semibold'>{user.user_id}</span></p>
                        </div>
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
                        userProps={user}
                        onClose={onBack}
                    />
                )
            }

        </>
    )
}

export default UserPayrollDetails