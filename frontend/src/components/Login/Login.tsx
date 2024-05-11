import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import login_image from '@/assets/images/login_image.svg';
import EyeOn from '@/assets/icons/EyeOn';
import EyeOff from '@/assets/icons/EyeOff';
import { getUserProfile, userLogin } from '@/api/apiUrl';
import { useGlobalContext } from '@/provider/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../UI/Spinner';

interface InputField {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
}

const initialState = {
    userId: "",
    password: "",
};


const Login: React.FC = () => {

    const { isLoggedIn, loginUser, setUserProfile } = useGlobalContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const [data, setData] = useState(initialState);
    const [message, setMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const inputFields: InputField[] = [
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
    ];

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.userId && data.password) {
            setLoading(true)

            const formData = {
                user_id: data.userId,
                password: data.password
            };
            // console.log(formData)

            userLogin(formData).then((response) => {
                if (response.error === false) {
                    navigate('/app/dashboard');
                    localStorage.setItem("token", response.token);
                    console.log(response)
                    // Fetch user profile data
                    // getUserProfile().then(response => setUserProfile(response.data));
                } else {
                    setMessage("Invalid userId or password!");
                }
            }).catch((error) => {
                setMessage("Invalid userId or password!");
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setMessage("Please fill in both fields!");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-screen md:h-screen lg:h-screen">
            <span className="bg-black loading border border-red-500 loading-infinity loading-lg"></span>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
                    <Spinner />
                </div>
            )}

            <div className={` ${loading && 'blur-[1px]'} flex flex-col justify-center items-center `}>
                <img src={login_image} alt="login_image" className="w-28 md:w-36 lg:w-36 rotate-animation" />
                <h1 className="font-semibold text-2xl md:text-3xl lg:text-3xl poppins">Login</h1>
                <form className="flex flex-col items-center md:mt-4 lg:mt-4" onSubmit={handleSubmit}>
                    {inputFields.map((item, index) => {
                        const { label, type, name, value, placeholder } = item;
                        return (
                            <div className="flex flex-col mt-2 md:mb-2 lg:mb-2" key={index}>
                                <label htmlFor={name} className="text-sm text-[#78828A] my-1">
                                    {label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={value}
                                        onChange={onChangeHandler}
                                        className="inter focus:outline-0 focus:ring-1 focus:ring-[#E87F01] focus:border-transparent border border-blue-gray-100 rounded-xl w-72 md:w-80 lg:w-80 shadow-md py-2 px-3 md:p-3 lg:p-3 transition-all duration-300 "
                                    />
                                    {name === 'password' && (
                                        <button
                                            type="button"
                                            className="absolute bg-white pl-2 py-1 right-[0.80rem] top-[0.45rem] md:top-[0.75rem] lg:top-[0.75rem]"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <EyeOn /> : <EyeOff />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div className='my-9'>
                        <button
                            type='submit'
                            className='py-2 px-3 md:p-3 bg-[#24B6E9] w-72 md:w-80 lg:w-80 rounded-3xl plus-jkrt text-white shadow-lg hover:bg-[#27c0f8] transition-all duration-300'
                        >
                            Login
                        </button>
                    </div>
                    {message && (
                        <div className='m-0 p-0'>
                            <p className='text-base text-red-500 capitalize lexend font-semibold md:font-semibold lg:font-semibold'>{message}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
