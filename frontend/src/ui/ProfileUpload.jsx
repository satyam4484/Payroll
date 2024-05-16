import React from 'react'
import default_image from '../assets/images/default_image.svg';
import { Camera } from './Icons'

const ProfileUpload = ({ inputRef, name, handleFileChange, handleSelectFile, fileUrl }) => {
    return (
        <>
            <input type='file' ref={inputRef} accept='.jpg,.jpeg,.png' className='hidden' name={name} onChange={handleFileChange} />
            <button
                type='button'
                onClick={handleSelectFile}
                className='cursor-pointer focus:outline-none flex items-center space-x-1 bg-gray-300 px-2 py-1 rounded-xl'
            >
                <div className='w-4 h-4 opacity-70'>
                    <Camera />
                </div>
                <p className='pt-sans text-xs'>Update</p>
            </button>

            {/* ViewProfilePic */}
            <div>
                <img src={fileUrl ? fileUrl : default_image} alt='default_image' name='profile' className='w-28 h-28 object-cover rounded-full shadow-gray-400 shadow-md text-xs' />
            </div>
        </>
    )
}

export default ProfileUpload