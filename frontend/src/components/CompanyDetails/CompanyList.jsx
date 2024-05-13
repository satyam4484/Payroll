import React, { useEffect, useState } from 'react'
import { getCompanyList } from '../../api/apiUrl'
import { Download } from '../../ui/Icons'
import DropEmployeeDetails from './DropEmployeeDetails/DropEmployeeDetails'
import DropPaymentConfig from './DropPaymentConfig/DropPaymentConfig'
import Search from './Search'
import CompanyCard from './CompanyCard'
import { useGlobalContext } from '../../provider/Context'

const CompanyList = () => {

    const { setCompanyId } = useGlobalContext()

    const [error, setError] = useState('')
    const [message, setMessage] = useState(false)

    const [companies, setCompanies] = useState([])
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [companyName, setCompanyName] = useState('');

    // console.log(companies)

    useEffect(() => {
        getCompanyList()
            .then((response) => {
                if (response.error === false) {
                    // console.log(response.companies)
                    setCompanies(response.companies);
                    setFilteredCompanies(response.companies);
                } else {
                    setError('Unable to fetch companies!')
                }
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCompanyCardClick = (companyId, companyName) => {
        setSelectedCompanyId(companyId);
        setCompanyId(companyId)
        setCompanyName(companyName)
        localStorage.setItem('companyId', companyId)
    }

    return (
        <div>
            <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>COMPANY LIST'S</h1>

            {/* Search input */}
            <Search setFilteredCompanies={setFilteredCompanies} companies={companies} />

            <div className='flex justify-between items-center my-2'>

                {/* Error */}
                {error && (
                    <div>
                        <p className='text-red-500 font-semibold capitalize poppins mx-4'>{error}</p>
                    </div>
                )}

                {/* Company User ID */}
                {companyName && (
                    <div className='flex items-center bg-white shadow-md rounded-lg py-1'>
                        <p className='text-gray-500 font-medium capitalize plusJakartaSans mx-4'>{companyName}</p>
                    </div>
                )
                }

                {/* Warning */}
                {filteredCompanies.length === 0 && (
                    <div>
                        <p className='text-red-500 font-semibold capitalize poppins mx-4'>No Companies available!</p>
                    </div>
                )}


            </div>

            <div className='grid grid-cols-12 gap-10'>

                <div className='col-span-4 w-full'>
                    {/* Company Card */}
                    <CompanyCard filteredCompanies={filteredCompanies} handleCompanyCardClick={handleCompanyCardClick} />
                </div>

                {
                    selectedCompanyId &&
                    <>
                        <div className='col-span-4 w-full '>
                            {/* Employee Details */}
                            <DropEmployeeDetails
                                setError={setError}
                            />
                        </div>

                        <div className='col-span-4 w-full'>
                            {/* Payment Configuration */}
                            <DropPaymentConfig
                                message={message}
                                setMessage={setMessage}
                                setError={setError}
                                selectedCompanyId={selectedCompanyId}
                            />
                        </div>
                    </>
                }
            </div>



        </div>
    )
}

export default CompanyList