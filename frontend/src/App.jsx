import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css'
import { useGlobalContext } from './provider/Context';
import Routing from './routing';
import Spinner from './ui/Spinner';
import { getUserProfile } from './api/apiUrl';

const App = () => {

  const { toggleSpinner, isLoading, loginUser, setUserProfile, userCred } = useGlobalContext();
  // console.log(userCred)
  const navigate = useNavigate();

  useEffect(() => {
    toggleSpinner(true);
    if (localStorage.getItem("token")) {
      loginUser(localStorage.getItem("token"));

      const userName = localStorage.getItem("user_id")
      getUserProfile(userName).then((response) => {
        setUserProfile(response.user)
      });

    } else {
      navigate('/auth/login')
    }
    toggleSpinner(false);
  }, [])

  return (
    <div>
      {/* <Message /> */}
      {isLoading && <Spinner />}
      <Routing />
    </div>
  )
}

export default App
