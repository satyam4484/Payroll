import React from 'react'

const Input = ({ label, value }) => {
    return (
        <div>
            <p className="capitalize plus-jkrt font-medium text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md">{label}</p>
            <div className="border border-gray-400 rounded-lg px-2 lg:px-4 py-1 lg:py-2 w-auto md:w-52 lg:w-80">
                <p className="plusJakartaSans text-black text-sm sm:text-base md:text-md lg:text-md">{value}</p>
            </div>
        </div>
    )
}

export default Input