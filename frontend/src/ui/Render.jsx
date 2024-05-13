import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/Context';
import Navbar from '../components/Homepage/Navbar';
import Dashboard from '../components/Homepage/Dashboard';

const Render = () => {

    const { isLoggedIn, logoutUser, userCred } = useGlobalContext();
    // console.log(userCred)
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        } 
    }, []);

    const userLogoutHandler = () => {
        logoutUser();
        navigate('/auth/login');
    }

    const userRole = userCred?.user_role
    // console.log(userRole)

    return (
        <div className='bg-gray-100 min-h-screen'>

            {(userRole === 'Employee') && <Navbar />}

            {(userRole === 'Employee') && <Dashboard />}

            {/* {userRole !== 'Employee' && (
                <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-5">
                    <p className='poppins text-xl capitalize text-red-500 font-semibold '>
                        You do not have authorization to access this page!
                    </p>
                    <button onClick={userLogoutHandler} className='plusJakartaSans underline underline-offset-2 text-gray-500'>
                        <Link to="/auth/login">Go back to Login</Link>
                    </button>
                </div>
            )} */}
        </div>
    )
}

export default Render