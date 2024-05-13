import React, { useState } from 'react'
import { ArrowDownIcon, DoubleArrowDropdownIcon } from '../../../ui/Icons'
import PayrollDetails from './PayrollDetails/PayrollDetails'

const DropPaymentConfig = ({ message, setMessage, selectedCompanyId }) => {

    const [isPaymentConfigurationOpen, setIsPaymentConfigurationOpen] = useState(false);

    return (
        <>
            {/* Payment Configuration */}
            <button type='button'
                className='flex justify-between items-center w-full rounded-2xl border-[3px] border-[#69C9EB] shadow-md shadow-gray-500 bg-white px-4 py-2 lg:p-4'
                onClick={() => {
                    setIsPaymentConfigurationOpen(!isPaymentConfigurationOpen)
                }}
            >
                <p className='capitalize lexend font-medium'>Payment Configuration</p>
                <div className='sm:hidden md:hidden lg:block'>
                    {
                        isPaymentConfigurationOpen ? <ArrowDownIcon /> : <DoubleArrowDropdownIcon />
                    }
                </div>
            </button>

            {isPaymentConfigurationOpen && (
                <div className='mt-6 mx-3'>

                    {/* Payroll Details */}
                    <PayrollDetails selectedCompanyId={selectedCompanyId} />

                </div>
            )}


        </>
    )
}

export default DropPaymentConfig