import React, { useEffect, useState } from 'react';
import { CrossIcon, DownloadIcon } from '../../ui/Icons';
import ProfileForm from './ProfileForm';
import { getCompanyById, getTodayAttendance } from '../../api/apiUrl';
import UpdateProfilePhoto from './ViewFields/UpdateProfilePhoto';
import UpdateFileUpload from './ViewFields/UpdateFileUpload';
import default_image from '../../assets/images/default_image.svg'

const Profile = ({ user, companyDetails, onBack, formatDate }) => {
    // console.log(user)

    const companyName = companyDetails?.name

    // user
    const { _id, contact, date_of_birth, aadhar, pancard, payroll, category, email, name, profile_pic, user_id, user_role, pf, esic, un_no } = user

    const profilePic = profile_pic === 'profile_pic_url' || '' ? default_image : profile_pic

    // category
    const { _id: categoryID, category_name } = category

    const [message, setMessage] = useState('')
    const [isEditMode, setIsEditMode] = useState(false);
    const [attendance, setAttendance] = useState(null)

    const [editedName, setEditedName] = useState(name);
    const [editedDateOfBirth, setEditedDateOfBirth] = useState(date_of_birth);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(contact);
    const [editedUnNo, setEditedUnNo] = useState(un_no);

    const [editedAadharNo, setEditedAadharNo] = useState(aadhar?.aadhar_no);
    const [editedAadharPhoto, setEditedAadharPhoto] = useState(aadhar?.aadhar_photo);

    const [editedPancardNo, setEditedPancardNo] = useState(pancard?.pancard_no);
    const [editedPancardPhoto, setEditedPancardPhoto] = useState(pancard?.pancard_photo);

    const [editedPfNo, setEditedPfNo] = useState(pf?.pf_no);
    const [editedPfPhoto, setEditedPfPhoto] = useState(pf?.pf_photo);

    const [editedEsicNo, setEditedEsicNo] = useState(esic?.esic_no);
    const [editedEsicPhoto, setEditedEsicPhoto] = useState(esic?.esic_photo);

    const [profileFileUrl, setProfileFileUrl] = useState(profilePic)

    const handleFieldChange = (fieldName, value) => {
        switch (fieldName) {
            case "aadharNo":
                setEditedAadharNo(value);
                break;
            case "pancardNo":
                setEditedPancardNo(value);
                break;
            case "pfNo":
                setEditedPfNo(value);
                break;
            case "esicNo":
                setEditedEsicNo(value);
                break;
            case "unNo":
                setEditedUnNo(value);
                break;
            case "name":
                setEditedName(value);
                break;
            case "dateOfBirth":
                setEditedDateOfBirth(value);
                break;
            case "email":
                setEditedEmail(value);
                break;
            case "phoneNumber":
                setEditedPhoneNumber(value);
                break;
            default:
                break;
        }
    };

    const handleAadharPhotoUpload = (uploadedUrl) => {
        setEditedAadharPhoto(uploadedUrl);
    };

    const handlePancardPhotoUpload = (uploadedUrl) => {
        setEditedPancardPhoto(uploadedUrl);
    };

    const handlePfPhotoUpload = (uploadedUrl) => {
        setEditedPfPhoto(uploadedUrl);
    };

    const handleEsicPhotoUpload = (uploadedUrl) => {
        setEditedEsicPhoto(uploadedUrl);
    };

    // function to save updated changes
    const handleSaveChanges = () => {
        const updatedData = {
            // _id: _id,
            name: editedName,
            profile_pic: profileFileUrl,
            date_of_birth: editedDateOfBirth,
            email: editedEmail,
            contact_no: editedPhoneNumber,
            un_no: editedUnNo,
            aadhar: {
                aadhar_no: editedAadharNo,
                aadhar_photo: editedAadharPhoto,
            },
            pancard: {
                pancard_no: editedPancardNo,
                pancard_photo: editedPancardPhoto,
            },
            pf: {
                pf_no: editedPfNo,
                pf_photo: editedPfPhoto,
            },
            esic: {
                esic_no: editedEsicNo,
                esic_photo: editedEsicPhoto,
            },
        }

        // console.log(_id, updatedData)

        // updateEmployee(_id, updatedData).then((response) => {
        //     if (response.error === false) {
        //         console.log(response.message)

        //         setIsEditMode(false);
        //         // setMessage('User data updated successfully!');

        //         setTimeout(() => {
        //             setMessage('')
        //         }, [2000])
        //     }
        // }).catch((error) => {
        //     console.log(error);
        //     setMessage('Failed to update user data!');
        // });
    };

    // Get the current date
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // console.log(formattedDate);

    useEffect(() => {
        getTodayAttendance(_id, formattedDate).then((response) => {
            if (response.error === false) {
                // console.log(response);
                setAttendance(response.attendance);
            }
        });
    }, []);

    return (
        <div>

            {/* close button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onBack}
                    className=" p-3 hover:shadow-md hover:rounded-full hover:bg-white"
                >
                    <CrossIcon />
                </button>
            </div>

            <div className="flex justify-evenly items-center mb-4">
                {/* name */}
                <h1 className="text-center uppercase font-semibold text-2xl pb-4 poppins">
                    {name}
                </h1>

                {/* profile Pic */}
                <UpdateProfilePhoto
                    isEditMode={isEditMode}
                    profileFileUrl={profileFileUrl}
                    setProfileFileUrl={setProfileFileUrl}
                />

                <div>
                    {/* save / edit button */}
                    {isEditMode ? (
                        <button
                            onClick={() => {
                                handleSaveChanges()
                                setIsEditMode(false)
                            }}
                            className="py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans border border-green-400 bg-green-500 text-white shadow-md hover:bg-green-700"
                        >
                            Save Profile
                        </button>
                    ) : (

                        <button
                            onClick={() => setIsEditMode(true)}
                            className="py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans border border-red-400 outline-none text-red-400 shadow-md hover:bg-red-400 hover:text-white"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* COLUMN 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 rounded-md">
                <div>
                    {/* user_id */}
                    <ProfileForm
                        label="User ID"
                        fieldName={user_id ? user_id : "-"}
                    />

                    {/* date_of_birth */}
                    {
                        isEditMode ? (
                            <div className='border border-gray-500 bg-white rounded-lg px-4 pt-1 pb-2 mb-4 '>
                                <p className='text-xs pt-1'>Update Date of Birth</p>
                                <input
                                    type="date"
                                    value={editedDateOfBirth}
                                    onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                                    disabled={!isEditMode}
                                    className="w-full outline-none"
                                />
                            </div>
                        ) : (
                            <ProfileForm
                                label="Date of Birth"
                                isEditMode={isEditMode}
                                fieldName={formatDate(editedDateOfBirth)}
                                handleFieldChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                            />
                        )
                    }

                    {/* aadhar */}
                    <div className='relative' >
                        <ProfileForm
                            label="Aadhar Card Number"
                            isEditMode={isEditMode}
                            fieldName={editedAadharNo}
                            handleFieldChange={(e) => handleFieldChange("aadharNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handleAadharPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedAadharPhoto} rel="noopener noreferrer">
                                    {editedAadharPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* pf */}
                    <div className='relative' >
                        <ProfileForm
                            label="PF Registration Number"
                            isEditMode={isEditMode}
                            fieldName={editedPfNo}
                            handleFieldChange={(e) => handleFieldChange("pfNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handlePfPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedPfPhoto} rel="noopener noreferrer">
                                    {editedPfPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* un_no */}
                    <ProfileForm
                        label="UN Number"
                        isEditMode={isEditMode}
                        fieldName={editedUnNo}
                        handleFieldChange={(e) => handleFieldChange("unNo", e.target.value)}
                    />
                </div>

                {/* COLUMN 2 */}
                <div>

                    {/* name */}
                    <ProfileForm
                        label="Name"
                        fieldName={editedName}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("name", e.target.value)}
                    />

                    {/* contact_no */}
                    <ProfileForm
                        label="Phone Number"
                        fieldName={editedPhoneNumber}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                    />

                    {/* pancard */}
                    <div className='relative'>
                        <ProfileForm
                            label="Pan Card Number"
                            isEditMode={isEditMode}
                            fieldName={editedPancardNo}
                            handleFieldChange={(e) => handleFieldChange("pancardNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handlePancardPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedPancardPhoto} rel="noopener noreferrer">
                                    {editedPancardPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>


                    {/* esic */}
                    <div className='relative'>
                        <ProfileForm
                            label="ESIC Registration Number"
                            isEditMode={isEditMode}
                            fieldName={editedEsicNo}
                            handleFieldChange={(e) => handleFieldChange("esicNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handleEsicPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedEsicPhoto} rel="noopener noreferrer">
                                    {editedEsicPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                </div>

                {/* COLUMN 3 */}
                <div>
                    {/* user_roles */}
                    <ProfileForm
                        label="User Role"
                        fieldName={user_role ? user_role : "-"}
                    />

                    {/* contactEmail */}
                    <ProfileForm
                        label="Email ID"
                        // newClass="lowercase"
                        fieldName={editedEmail}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("email", e.target.value)}
                    />

                    {/* company_name */}
                    <ProfileForm
                        label="Company Name"
                        fieldName={companyName ? companyName : "-"}
                    />

                    {/* category_name */}
                    <ProfileForm
                        label="Category Name"
                        fieldName={category_name ? category_name : "-"}
                    />

                </div>

            </div>

            {/* Message */}
            {
                message && (
                    <p className='text-center capitalize m-2 inter text-lg font-semibold text-black '>
                        {message}
                    </p>
                )
            }
        </div>
    );
};

export default Profile;
