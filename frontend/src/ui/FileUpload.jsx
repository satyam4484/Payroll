import React from 'react'
import { UploadIcon } from './Icons'

const FileUpload = ({ name, inputRef, handleFileChange, handleSelectFile, fileUrl }) => {
    return (
        <>
            <div className='absolute top-10 right-3'>
                <input type='file' ref={inputRef} accept='.jpg,.jpeg,.png' className='hidden' name={name} onChange={handleFileChange} />
                <button
                    type='button'
                    onClick={handleSelectFile}
                    className='cursor-pointer bg-white p-1 focus:outline-none'
                >
                    <UploadIcon />
                </button>
            </div>

            {
                fileUrl && (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                        File Uploaded Successfully!
                    </p>
                )
            }

        </>
    )
}

export default FileUpload