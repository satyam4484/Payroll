import React from 'react'

const Input = ({ label, name, value, onChange, handleBlur, type, placeholder, errorMessage }) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className='text-sm text-[#78828A] my-1' >
                {label}
            </label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                type={type}
                placeholder={placeholder}
                className={`focus:outline-0 focus:ring-1 focus:ring-[#E87F01] focus:border-transparent border border-blue-gray-100 rounded-xl w-72 md:w-80 lg:w-80 shadow-md py-2 px-3 md:p-3 lg:p-3 ${errorMessage && 'border-red-300'}`}
            />
            <p className={`absolute bottom-[-1.15rem] px-1 my-0 py-0 text-xs bg-transparent ${errorMessage && 'text-red-400'}`}>{errorMessage}</p>
        </div>
    )
}

export default Input