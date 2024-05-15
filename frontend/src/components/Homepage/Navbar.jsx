import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import default_image from '../../assets/images/default_image.svg'
import Person from '../../assets/icons/Person';
import Logout from '../../assets/icons/Logout';
import { ArrowDropdownIcon, Menu } from '../../ui/Icons.jsx'
import ProfileModal from './ProfileModal';
import { useGlobalContext } from '../../provider/Context.jsx';

const Navbar = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const { logoutUser, userCred } = useGlobalContext();
    const [openAccount, setOpenAccount] = useState(false);


    let name = userCred?.name ? userCred?.name : 'Guest';
    let profilePic = userCred?.profile_pic === 'profile_pic_url' || userCred?.profile_pic === '' ? default_image : userCred?.profile_pic;

    const navigate = useNavigate();

    const userLogoutHandler = () => {
        logoutUser();
        navigate('/auth/login');
    }

    const handleOpenAccount = () => {
        setOpenAccount(!openAccount)
    };

    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (
                (profileRef.current && !profileRef.current.contains(event.target))
            ) {
                // setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };

    }, []);

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const closeProfileDropdown = () => {
        setIsProfileOpen(false);
    };

    return (
        <header className='fixed w-full top-0 z-10 bg-white shadow-md'>
            <div className='grid grid-cols-12 px-4 py-2'>

                {/* Mobile Menu (Shown in mobile screen sizes) */}
                <div
                    className='md:hidden col-span-2 cursor-pointer self-center'
                    onClick={toggleProfileDropdown}
                >
                    <button>
                        <Menu />
                    </button>

                    {isProfileOpen && (
                        <div ref={profileRef} className='absolute left-4 mt-8 bg-white drop-shadow-md rounded-xl w-32'>
                            <div className='px-4 py-2 space-y-2'>

                                <div
                                    className='flex items-center space-x-1 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                                    onClick={(handleOpenAccount)}
                                >
                                    <div className='w-4'>
                                        <Person />
                                    </div>
                                    <p className='text-sm'>
                                        Account
                                    </p>
                                </div>

                                <div
                                    className='flex items-center space-x-1 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                                    onClick={userLogoutHandler}
                                >
                                    <div className='w-4'>
                                        <Logout />
                                    </div>
                                    <p className='text-sm'>
                                        Logout
                                    </p>
                                </div>

                            </div>
                        </div>
                    )}

                    {
                        openAccount &&
                        <ProfileModal open={openAccount} handleOpen={handleOpenAccount} />
                    }
                </div>

                {/* Logo and Name */}
                <div
                    className='flex items-center col-span-8 md:col-span-2 justify-center md:justify-around cursor-pointer'
                >
                    <div>
                        <img
                            src={profilePic}
                            alt='logo'
                            className='text-xs border rounded-full w-11 h-11 object-cover'
                        />
                    </div>
                    <p className='font-semibold px-1 text-center md:text-left uppercase inter'>{name}</p>
                </div>

                {/* Profile Dropdown (Hidden in mobile screen sizes) */}
                <div
                    className='hidden md:flex items-center justify-center md:col-span-1 cursor-pointer'
                    onClick={toggleProfileDropdown}
                >
                    <div className='relative'>

                        <button>
                            <ArrowDropdownIcon />
                        </button>

                        {isProfileOpen && (
                            <div ref={profileRef} className='absolute right-0 mt-8 bg-white drop-shadow-md rounded-xl w-40'>
                                <div className='px-4 py-2 space-y-2'>

                                    <div
                                        className='flex items-center space-x-2 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                                        onClick={handleOpenAccount}
                                    >
                                        <div className='w-5'>
                                            <Person />
                                        </div>
                                        <p>
                                            Account
                                        </p>
                                    </div>

                                    <div
                                        className='flex items-center space-x-2 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                                        onClick={userLogoutHandler}
                                    >
                                        <div className='w-5'>
                                            <Logout />
                                        </div>
                                        <p>
                                            Logout
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )}

                        {
                            !openAccount &&
                            <ProfileModal open={openAccount} handleOpen={handleOpenAccount} />
                        }

                    </div>
                </div>

            </div>
        </header>

    )
}

export default Navbar;