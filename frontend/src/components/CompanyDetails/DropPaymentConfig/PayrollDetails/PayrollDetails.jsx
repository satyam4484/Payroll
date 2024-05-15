import React, { useState } from 'react'
import { getPayrollDetails } from '../../../../api/apiUrl'
import PayrollModal from './PayrollModal'
import AddPayroll from './AddPayroll'

const PayrollDetails = ({ companyProps }) => {

    console.log("company ID: ", companyProps._id)
    console.log("company payroll: ", companyProps.payroll)
    const { _id, payroll } = companyProps

    const [openPayroll, setOpenPayroll] = useState(false);
    const [openAddPayroll, setOpenAddPayroll] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [payrollDetails, setPayrollDetails] = useState([]);
    const [isPayroll, setIsPayroll] = useState(false);

    const handleOpen = () => {
        setOpenPayroll(!openPayroll)
    };

    // Function to handle get Payroll Details
    const handlePayrollDetails = () => {
        if (_id && payroll) {
            getPayrollDetails(payroll).then((response) => {
                if (response.error === false) {
                    // console.log(response.payroll)
                    setPayrollDetails(response.payroll);
                    setOpenPayroll(true);
                    setDataLoaded(true)
                    setIsPayroll(false);
                }
            }).catch((error) => {
                // setError('Unable to view payroll details!')
                // setTimeout(() => {
                //     setError('');
                // }, 2000);
                // setIsPayroll(Object.keys(response.payroll).length > 0)
                setIsPayroll(true);
                console.log(error);
            });
        } else {
            setIsPayroll(true);
            console.log('No Company ID Selected!');
        }
    };

    const handleAddPayrollDetails = () => {
        if (_id) {
            setOpenAddPayroll(true)
            setIsPayroll(false);
        }
    }

    return (
        <>
            <button
                type='button'
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#FFC1078A] shadow-md rounded-2xl py-2 px-4 lg:p-3 my-3'
                onClick={() => {
                    handlePayrollDetails()
                    handleOpen()
                }}
            >
                <p className='lexend font-medium text-md'>Payroll Details</p>
            </button>

            {/* Payroll Modal */}
            {
                dataLoaded && openPayroll && !isPayroll && (
                    <PayrollModal
                        open={openPayroll}
                        handleOpen={() => setOpenPayroll(false)}
                        payrollDetails={payrollDetails}
                        company={payroll}
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
                openAddPayroll && !isPayroll && (
                    <AddPayroll
                        open={openAddPayroll}
                        handleOpen={() => setOpenAddPayroll(false)}
                        company={_id}
                    />
                )
            }

        </>
    )
}

export default PayrollDetails