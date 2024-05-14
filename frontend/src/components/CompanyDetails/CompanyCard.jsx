import React from 'react'
import { DoubleOverlappingRightArrow } from '../../ui/Icons'
import default_image from '../../assets/images/default_image.svg'

const CompanyCard = ({ filteredCompanies, handleCompanyCardClick }) => {

    return (
        <div>
            {
                filteredCompanies.map((item, index) => {
                    {/* console.log(item.ceo.user_id) */ }
                    const { _id, name, logo } = item

                    return (
                        <div
                            key={_id}
                            className="flex justify-between items-center border border-[#24B6E959] shadow-lg shadow-blue-gray-900/5 mb-5 rounded-[1.25rem] bg-white py-2 px-4 lg:p-4 relative cursor-pointer "
                            onClick={() => handleCompanyCardClick(_id, name)}
                        >

                            {/* Left Section */}
                            <div className='mr-3 sm:hidden md:hidden lg:block'>
                                <img src={logo === 'https://example.com/logo.png' || '' ? default_image : logo} alt='' className='object-cover text-xs w-9 h-9 rounded-full border' />
                            </div>

                            {/* Center Section */}
                            <div className='flex-grow space-y-1'>
                                <p className='font-medium'>{name}</p>
                            </div>

                            {/* Right Section */}
                            <div className='absolute right-4 ml-2 sm:hidden md:hidden lg:block'>
                                <DoubleOverlappingRightArrow />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CompanyCard