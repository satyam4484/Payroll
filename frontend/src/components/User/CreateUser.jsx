import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/apiClient';
import { createNewUser, getCategoryList, getCompanyList, getUserProfile, userLogin } from '../../api/apiUrl';
import FileUpload from '../../ui/FileUpload';
import ProfileUpload from '../../ui/ProfileUpload';
import { useGlobalContext } from '../../provider/Context';
import FloatingInput from '../../ui/FloatingInput';
import Navbar from '../Homepage/Navbar';

const CreateUser = () => {

    const { isLoggedIn, loginUser, setUserProfile, isLoading, toggleLoading } = useGlobalContext();
    const navigate = useNavigate();

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [messageState, setMessageState] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const aadharInputRef = useRef(null);
    const panInputRef = useRef(null);
    const pfInputRef = useRef(null);
    const esicInputRef = useRef(null);
    const profileInputRef = useRef(null);

    const [aadharFileUrl, setAadharFileUrl] = useState('')
    const [panFileUrl, setPanFileUrl] = useState('')
    const [pfFileUrl, setPfFileUrl] = useState('')
    const [esicFileUrl, setEsicFileUrl] = useState('')
    const [profileFileUrl, setProfileFileUrl] = useState('')

    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch category list
        getCategoryList().then((response) => {
            if (response.error == false) {
                setCategories(response.categories);
                // console.log(response.categories);
            }
        });

        // Fetch company list
        getCompanyList().then((response) => {
            if (response.error == false) {
                setCompanies(response.companies);
                // console.log(response.companies);
            }
        });
    }, []);

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

            if (name === 'aadharCardPhoto') {
                setAadharFileUrl(response.data.data)
            } else if (name === 'panCardPhoto') {
                setPanFileUrl(response.data.data)
            } else if (name === 'pfPhoto') {
                setPfFileUrl(response.data.data)
            } else if (name === 'esicPhoto') {
                setEsicFileUrl(response.data.data)
            } else if (name === 'profilePhoto') {
                setProfileFileUrl(response.data.data)
            } else {
                console.log('No file url found!')
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // function to select files
    const handleSelectFileAadhar = () => {
        aadharInputRef.current.click();
    };

    const handleSelectFilePan = () => {
        panInputRef.current.click();
    };

    const handleSelectFilePf = () => {
        pfInputRef.current.click();
    };

    const handleSelectFileEsic = () => {
        esicInputRef.current.click();
    };

    const handleSelectFileProfile = () => {
        profileInputRef.current.click();
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    // Create state variables to store form data
    const [formData, setFormData] = useState({
        name: '',
        profilePic: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        aadharCardNumber: '',
        aadharCardPhoto: '',
        panCardNumber: '',
        panCardPhoto: '',
        pfNumber: '',
        pfPhoto: '',
        esicNumber: '',
        esicPhoto: '',
        unNumber: '',
        category: '',
        company: '',
        userRole: '',
    });

    const [fieldErrors, setFieldErrors] = useState({
        phoneNumber: '',
        pfNumber: '',
        unNumber: '',
        esicNumber: '',
        aadharCardNumber: '',
        panCardNumber: '',
    });

    // Function to handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target || {};

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle category selection
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setFormData({
            ...formData,
            category: categoryId,
        });
    };

    // Function to handle company selection
    const handleCompanyChange = (e) => {
        const companyId = e.target.value;
        setFormData({
            ...formData,
            company: companyId,
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
            case 'pfNumber':
                isValid = /^[A-Za-z]{5}\d{17}$/.test(value);
                errorMessage = 'PF number must have 5 letters followed by 17 digits!';
                break;
            case 'unNumber':
                isValid = /^\d{12}$/.test(value);
                errorMessage = 'UN number must be 12 digits!';
                break;
            case 'esicNumber':
                isValid = /^\d{10}$/.test(value);
                errorMessage = 'ESIC number must be 10 digits!';
                break;
            case 'aadharCardNumber':
                isValid = /^\d{12}$/.test(value);
                errorMessage = 'Aadhar card number must be 12 digits!';
                break;
            case 'panCardNumber':
                isValid = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(value);
                errorMessage = 'Pan card number must be 10 chars!';
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
            dateOfBirth: '',
            aadharCardNumber: '',
            aadharCardPhoto: '',
            panCardNumber: '',
            panCardPhoto: '',
            pfNumber: '',
            pfPhoto: '',
            esicNumber: '',
            esicPhoto: '',
            unNumber: '',
            category: '',
            company: '',
            userRole: '',
        });

        setAadharFileUrl('')
        setPanFileUrl('')
        setPfFileUrl('')
        setEsicFileUrl('')
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
            profile_pic: profileFileUrl || '',
            email: formData.email || '',
            contact: formData.phoneNumber || '',
            date_of_birth: formData.dateOfBirth || '',
            aadhar: {
                aadhar_no: formData.aadharCardNumber || '',
                aadhar_photo: aadharFileUrl || '',
            },
            pancard: {
                pancard_no: formData.panCardNumber || '',
                pancard_photo: panFileUrl || '',
            },
            pf: {
                pf_no: formData.pfNumber || '',
                pf_photo: pfFileUrl || '',
            },
            esic: {
                esic_no: formData.esicNumber || '',
                esic_photo: esicFileUrl || '',
            },
            un_no: formData.unNumber || '',
            category: formData.category,
            company: formData.company,
            user_role: formData.userRole,
        };

        console.log(commonData)

        // Signup - create new user
        createNewUser(commonData).then((responseSignup) => {
            if (responseSignup.error === false) {
                // console.log("responseSignup:", responseSignup.user)
                setMessageState(true)
                setMessage('New account created succesfully!')
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

            <h1 className="poppins font-semibold text-2xl md:text-3xl lg:text-3xl">Create New Employee / Supervisor</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 items-end gap-x-6 gap-y-4">

                    <FloatingInput type="text" label="Name" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInputChange} />

                    <FloatingInput type="email" label="Email" name="email" placeholder="Enter Email ID" value={formData.email} onChange={handleInputChange} />

                    {/* UpdateProfilePic */}
                    <div className='flex space-x-3 items-end mb-5'>
                        <ProfileUpload inputRef={profileInputRef} name="profilePhoto" handleFileChange={handleFileChange} handleSelectFile={handleSelectFileProfile} fileUrl={profileFileUrl} />
                    </div>

                    <div className='relative'>
                        <FloatingInput type="number" label="Contact Number" name="phoneNumber" placeholder="Enter Contact Number" value={formData.phoneNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.phoneNumber} />
                    </div>

                    <div className='relative'>
                        <FloatingInput type="text" label="UN Number" name="unNumber" placeholder="Enter UN Number" value={formData.unNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.unNumber} />
                    </div>

                    {/* aadharCard */}
                    <div className='relative'>
                        {/* aadharCardNumber */}
                        <FloatingInput name='aadharCardNumber' label='Aadhar Card Number' type='number' placeholder="Enter Aadhar Card Number" value={formData.aadharCardNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.aadharCardNumber} />

                        {/* aadharCardPhoto */}
                        <FileUpload name="aadharCardPhoto" inputRef={aadharInputRef} handleFileChange={handleFileChange} handleSelectFile={handleSelectFileAadhar} fileUrl={aadharFileUrl} />
                    </div>

                    <div className='relative'>
                        <FloatingInput name='panCardNumber' label='Pan Card Number' type='text' placeholder="Enter Pan Card Number" value={formData.panCardNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.panCardNumber} />

                        <FileUpload name="panCardPhoto" inputRef={panInputRef} handleFileChange={handleFileChange} handleSelectFile={handleSelectFilePan} fileUrl={panFileUrl} />
                    </div>

                    <div className='relative'>
                        <FloatingInput name='pfNumber' label='PF Registration Number' type='text' placeholder="Enter PF Registration Number" value={formData.pfNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.pfNumber} />

                        <FileUpload name="pfPhoto" inputRef={pfInputRef} handleFileChange={handleFileChange} handleSelectFile={handleSelectFilePf} fileUrl={pfFileUrl} />
                    </div>

                    <div className='relative'>
                        <FloatingInput name='esicNumber' label='ESIC Registration Card Number' type='text' placeholder="Enter PF Registration Number" value={formData.esicNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.esicNumber} />

                        <FileUpload name="esicPhoto" inputRef={esicInputRef} handleFileChange={handleFileChange} handleSelectFile={handleSelectFileEsic} fileUrl={esicFileUrl} />
                    </div>


                    {/* <label htmlFor="selectCompany" className="text-sm text-gray-500 my-1">
                            Select Company
                        </label> */}

                    <select
                        name="userRole"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="py-4 pl-3 pr-11 w-80 text-base rounded-lg bg-transparent border border-gray-400 focus:border-blue-400 focus:outline-none focus:ring-0"
                    >
                        <option value="" disabled>Select User Role</option>
                        <option value="Employee">Employee</option>
                        <option value="Supervisor">Supervisor</option>
                    </select>

                    <select
                        name="company"
                        id="selectCompany"
                        value={formData.company}
                        onChange={handleCompanyChange}
                        className="py-4 pl-3 pr-11 w-80 text-base rounded-lg bg-transparent border border-gray-400 focus:border-blue-400 focus:outline-none focus:ring-0"
                    >
                        <option value="" disabled>Select Company</option>
                        {companies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="category"
                        id="selectCategory"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        className="py-4 pl-3 pr-11 w-80 text-base rounded-lg bg-transparent border border-gray-400 focus:border-blue-400 focus:outline-none focus:ring-0"
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>

                    <div className='mt-5'>
                        <FloatingInput type="date" label="Date of Birth" name="dateOfBirth" placeholder="Enter Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} />
                    </div>

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

export default CreateUser