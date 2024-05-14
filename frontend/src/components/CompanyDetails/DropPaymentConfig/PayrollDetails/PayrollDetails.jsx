import React, { useState } from 'react'
import { getPayrollDetails } from '../../../../api/apiUrl'
import PayrollModal from './PayrollModal'

const PayrollDetails = () => {

    const companyId = localStorage.getItem('companyId')

    const [openPayroll, setOpenPayroll] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [payrollDetails, setPayrollDetails] = useState([]);
    const [isPayroll, setIsPayroll] = useState(false);

    const handleOpen = () => {
        setOpenPayroll(!openPayroll)
    };

    // Function to handle get Payroll Details
    const handlePayrollDetails = () => {
        if (companyId) {
            // companyId = 66422d361463bc4e80d0deac
            getPayrollDetails(companyId).then((response) => {
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
            console.log('No Company ID Selected!');
        }
    };

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
                        company={companyId}
                    />
                )
            }

            {
                isPayroll && (
                    <div className='bg-white rounded-xl p-4 text-center space-y-3 shadow-md mx-3'>
                        <p className='text-red-400 italic text-sm'>No Payroll Found!</p>
                        <button className='plus-jkrt font-medium shadow-md bg-green-400 text-white text-xs px-2 py-1 rounded-lg'>Add Payroll</button>
                    </div>
                )
            }

        </>
    )
}

export default PayrollDetails