import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/apiClient';
import { createNewCompany, createNewUser, getCategoryList, getCompanyList, getUserProfile, userLogin } from '../../api/apiUrl';
import FileUpload from '../../ui/FileUpload';
import ProfileUpload from '../../ui/ProfileUpload';
import { useGlobalContext } from '../../provider/Context';
import FloatingInput from '../../ui/FloatingInput';
import Navbar from '../Homepage/Navbar';
import FloatingTextarea from '../../ui/FloatingTextarea';

const CreateCompany = () => {

    const { isLoggedIn, loginUser, setUserProfile, isLoading, toggleLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [messageState, setMessageState] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false);

    const profileInputRef = useRef(null);

    const [profileFileUrl, setProfileFileUrl] = useState('')

    const handleFileChange = async (e) => {

        const { name, files } = e.target || {};

        if (files && files.length > 0) {
            await handleUploadFile(files[0], name);
        } else {
            console.log("Please Select a File!")
        }
    };

    // function to upload files
    const handleUploadFile = async (file, name) => {

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data.message)

            if (name === 'profilePhoto') {
                setProfileFileUrl(response.data.data)
            } else {
                console.log('No file url found!')
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // function to select files

    const handleSelectFileProfile = () => {
        profileInputRef.current.click();
    };

    // Create state variables to store form data
    const [formData, setFormData] = useState({
        name: '',
        profilePic: '',
        email: '',
        phoneNumber: '',
        address: '',
        location: '',
        city: '',
        pincode: '',
    });

    const [fieldErrors, setFieldErrors] = useState({
        phoneNumber: '',
    });

    // Function to handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target || {};

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target || {};

        // Validation checks
        let isValid = true;
        let errorMessage = '';

        switch (name) {
            case 'phoneNumber':
                isValid = /^\d{10}$/.test(value);
                errorMessage = 'Phone number must be 10 digits';
                break;
            default:
                break;
        }

        setErrorMessage(isValid ? '' : errorMessage);
        setIsFormValid(isValid);

        setFieldErrors({
            ...fieldErrors,
            [name]: isValid ? '' : errorMessage,
        });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            profilePic: '',
            email: '',
            phoneNumber: '',
            address: '',
            location: '',
            city: '',
            pincode: '',
        });

        setProfileFileUrl('')
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errorMessage) {
            // If there are errors, don't submit the form
            return;
        }

        // setIsSubmitting(true)

        // Create a function to format the common data
        const commonData = {
            name: formData.name || '',
            logo: profileFileUrl || 'https://example.com/logo.png',
            email: formData.email || '',
            contact: formData.phoneNumber || '',
            address: formData.address || '',
            location: formData.location || '',
            city: formData.city || '',
            pincode: formData.pincode || '',
        };

        // console.log(commonData)

        // create new company
        createNewCompany(commonData).then((response) => {
            if (response.error === false) {
                // console.log("response:", response.savedCompany)

                setMessageState(true)
                setMessage('New company created succesfully!')
                resetForm();

                setTimeout(() => {
                    setMessageState(false)
                    setMessage('')
                }, [2000])
            }
        }).catch((error) => {
            console.log(error)
            setMessageState(false)
            setMessage('Something went wrong! Please fill required fields!')

            setTimeout(() => {
                setMessage('')
            }, [2000])
        }).finally(() => {
            setIsSubmitting(false)
        })

    };


    return (
        <div className="flex flex-col items-center">

            <h1 className="poppins font-semibold text-2xl md:text-3xl lg:text-3xl">Create New Company</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 items-end gap-x-6 gap-y-4">

                    <FloatingInput type="text" label="Company Name" name="name" placeholder="Enter Company Name" value={formData.name} onChange={handleInputChange} />

                    <FloatingInput type="email" label="Company Email" name="email" placeholder="Enter Company Email ID" value={formData.email} onChange={handleInputChange} />

                    {/* UpdateProfilePic */}
                    <div className='flex space-x-3 items-end mb-5'>
                        <ProfileUpload inputRef={profileInputRef} name="profilePhoto" handleFileChange={handleFileChange} handleSelectFile={handleSelectFileProfile} fileUrl={profileFileUrl} />
                    </div>

                    <div className='relative'>
                        <FloatingInput type="number" label="Company Contact Number" name="phoneNumber" placeholder="Enter Company Contact Number" value={formData.phoneNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.phoneNumber} />
                    </div>


                    <FloatingInput type="text" label="Location" name="location" placeholder="Enter Location" value={formData.location} onChange={handleInputChange} />

                    <FloatingTextarea type="text" label="Address" name="address" rows='1' placeholder="Enter Company Address" value={formData.address} onChange={handleInputChange} />

                    <FloatingInput type="text" label="City" name="city" placeholder="Enter City" value={formData.city} onChange={handleInputChange} />

                    <FloatingInput type="number" label="Pincode" name="pincode" placeholder="Enter Pincode" value={formData.pincode} onChange={handleInputChange} />


                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        className='rounded-3xl plus-jkrt shadow-lg text-white bg-[#24B6E9] hover:bg-[#27c0f8] py-2 px-3 w-72 disabled:bg-[#23B0E2]/50 disabled:cursor-not-allowed'
                    // disabled={!isFormValid || isSubmitting}
                    >
                        Submit
                    </button>
                </div>
            </form>

            {
                message && (
                    <div className='text-center'>
                        <p className={`capitalize text-xl poppins ${messageState ? 'text-green-500' : 'text-red-500'} font-semibold`}>{message}</p>
                    </div>
                )
            }
        </div>
    )
}

export default CreateCompany