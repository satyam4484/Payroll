import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import login_image from '../../assets/images/login_image.svg';
import { getUserProfile, userLogin } from '../../api/apiUrl';
import { useGlobalContext } from '../../provider/Context';
import EyeOn from '../../assets/icons/EyeOn';
import EyeOff from '../../assets/icons/EyeOff';
import Spinner from '../../ui/Spinner';
import Message from '../../ui/Message';

const initialState = {
    userId: "",
    password: "",
};

const Login = () => {

    const { isLoggedIn, loginUser, setUserProfile, setMessage, isLoading, toggleLoading } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const [data, setData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputFields = [
        {
            label: "User ID",
            type: "text",
            name: "userId",
            value: data.userId,
            placeholder: 'Enter User Id',
        },
        {
            label: "Password",
            type: showPassword ? "text" : "password",
            name: "password",
            value: data.password,
            placeholder: 'Enter Password',
        },
    ]

    const onChangeHandler = (e) => {
        setData((state) => {
            return { ...state, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.userId && data.password) {
            toggleLoading(true);

            const formData = {
                user_id: data.userId,
                password: data.password
            }

            // Send the formData to the server for authentication
            userLogin(formData).then((response) => {
                if (response.error === false) {

                    localStorage.setItem("user_id", formData.user_id);
                    localStorage.setItem("token", response.token);
                    navigate('/');

                    // Fetch user profile data
                    getUserProfile(formData.user_id).then(
                        (response) => {
                            if (response.error === false) {
                                setUserProfile(response.user)
                            }
                        }
                    );

                } else {
                    setMessage(true, "Invalid userId or password!");
                }
            }).catch((error) => {
                setMessage(true, "Invalid userId or password!");
                console.log(error);
            }).finally(() => {
                toggleLoading(false);
            });

        } else {
            setMessage(true, "Please fill in both fields!");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }

    return (
        <div className="relative flex flex-col justify-center items-center h-screen md:h-screen lg:h-screen">

            {isLoading &&
                <div className="fixed flex items-center justify-center inset-0 bg-white bg-opacity-30 z-50">
                    <Spinner newClass="w-10" />
                </div>
            }

            <div className={` ${loading && 'blur-[1px]'} flex flex-col justify-center items-center `}>
                <img src={login_image} alt="login_image" className="w-28 md:w-36 lg:w-36 rotate-animation" />
                <h1 className="poppins font-semibold text-2xl md:text-3xl lg:text-3xl">Login</h1>

                <form className="flex flex-col items-center md:mt-4 lg:mt-4" onSubmit={handleSubmit}>
                    {inputFields.map((item, index) => {
                        const { label, type, name, value, placeholder } = item
                        return (
                            <div className="flex flex-col mt-2 md:mb-2 lg:mb-2" key={index}>
                                <label htmlFor={name} className="text-sm text-[#78828A] my-1" >
                                    {label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={value}
                                        onChange={onChangeHandler}
                                        className="focus:outline-0 focus:ring-1 focus:ring-[#E87F01] focus:border-transparent border border-blue-gray-100 rounded-xl w-72 md:w-80 lg:w-80 shadow-md py-2 px-3 md:p-3 lg:p-3 transition-all duration-300 "
                                    />
                                    {name === 'password' && (
                                        <p
                                            className="absolute cursor-pointer p-1 bg-white right-3 top-[0.55rem] md:top-[0.70rem] lg:top-[0.70rem]"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <EyeOn /> : <EyeOff />}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div className='my-9'>
                        <button
                            type='submit'
                            className='py-2 px-3 md:p-3 bg-[#24B6E9] w-72 md:w-80 lg:w-80 rounded-3xl plus-jkrt text-white shadow-lg hover:bg-[#27c0f8] transition-all duration-300'
                            disabled={loading}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

            {/* <div className='flex space-x-3 text-sm mb-5'>
                <p>Don't have an account?</p>
                <Link to="/auth/signup" className='underline text-blue-500'>Create Account</Link>
            </div> */}

            <Message />
        </div>
    );
};

export default Login;
