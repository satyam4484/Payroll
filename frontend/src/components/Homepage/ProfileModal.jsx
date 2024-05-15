import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react';
import default_image from '../../assets/images/default_image.svg';
import { Copy, CopyDone, CrossIcon } from '../../ui/Icons';
import Input from './Input';
import { useGlobalContext } from '../../provider/Context';

const ProfileModal = ({ open, handleOpen }) => {
    const { userCred } = useGlobalContext();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${userCred.user_id}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
    };

    const {
        name: userName,
        profile_pic: userProfilePic,
        user_id: userId,
        user_role: userRole,
    } = userCred;

    const profilePic = userProfilePic === 'profile_pic_url' || userProfilePic === '' ? default_image : userProfilePic;

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className={`relative rounded-2xl overflow-hidden bg-gray-100`}
            >
                <DialogBody className={` overflow-scroll px-6 md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-center lg:overflow-auto`}>
                    <div className={`grid grid-cols-1 md:grid-cols-1 gap-4`}>

                        <div className="md:hidden lg:hidden flex justify-end">
                            <button
                                type="button"
                                onClick={handleOpen}
                                className=" p-3 hover:shadow-lg hover:rounded-full hover:bg-white"
                            >
                                <CrossIcon />
                            </button>
                        </div>

                        {/* User */}
                        <div className="bg-white rounded-xl shadow-lg p-5 md:p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <img
                                        src={profilePic}
                                        alt="profile"
                                        className="text-sm border font-normal w-14 h-14 rounded-full object-cover"
                                    />
                                </div>
                                <p className="uppercase plusJakartaSans text-black text-sm sm:text-base md:text-md lg:text-md font-medium">{userName}</p>
                            </div>

                            <div className="md:flex md:items-center md:justify-between md:space-x-4 lg:flex lg:items-center lg:justify-between lg:space-x-4 my-2">
                                <p className="capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md">User ID:</p>
                                <div className="flex items-center justify-between border border-gray-500 rounded-lg px-2 lg:px-4 py-1 lg:py-2 w-auto md:w-52 lg:w-80">
                                    <p className="plusJakartaSans text-black text-sm sm:text-sm md:text-sm lg:text-md">{userId}</p>

                                    <button
                                        type="button"
                                        className="bg-gray-200 flex items-center py-1 px-2 rounded-md text-gray-900"
                                        onClick={handleCopy}
                                    >
                                        <span className="text-xs font-light spaceMono hidden md:block">{copied ? 'Copied!' : 'Copy'} </span>{' '}
                                        <span className="text-right w-4"> {copied ? <CopyDone /> : <Copy />}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default ProfileModal;
