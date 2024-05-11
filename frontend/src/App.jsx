import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css'
import { useGlobalContext } from './provider/Context';
import Routing from './routing';
import Spinner from './ui/Spinner';
import { getUserProfile } from './api/apiUrl';
import Message from './ui/Message';

const App = () => {

  const { toggleLoading, isLoading, loginUser, setUserProfile, userCred } = useGlobalContext();
  // console.log(userCred)
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoading(true);
    if (localStorage.getItem("token")) {
      loginUser(localStorage.getItem("token"));

      const userName = localStorage.getItem("user_id")
      getUserProfile(userName).then((response) => {
        setUserProfile(response.user)
      });

    } else {
      navigate('/auth/login')
    }
    toggleLoading(false);
  }, [])

  return (
    <div>
      <Routing />
    </div>
  )
}

export default App
