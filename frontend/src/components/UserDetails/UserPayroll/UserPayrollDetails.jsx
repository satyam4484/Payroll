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
    console.log(payrollId)
    const newPayrollId = localStorage.getItem('userPayrollId')
    console.log(newPayrollId)

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
                        userProps={userId}
                        onClose={onBack}
                    />
                )
            }

        </>
    )
}

export default UserPayrollDetails