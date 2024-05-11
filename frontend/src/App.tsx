import React, { useEffect } from "react";
import "./App.css"
import Routing from "./routing/Routing";
import Spinner from "./components/UI/Spinner";
import { useGlobalContext } from "./provider/Context";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "./api/apiUrl";

const App: React.FC = () => {

  const { toggleSpinner, isLoading, loginUser, setUserProfile } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    toggleSpinner(true);
    if (localStorage.getItem("token")) {
      loginUser(localStorage.getItem("token"));
      // getUserProfile().then((response) => {
      //   setUserProfile(response.data)
      // });
    } else {
      navigate('/auth/login')
    }
    toggleSpinner(false);
  }, [])


  return (
    <div>
      {isLoading && <Spinner />}
      <Routing />
    </div>
  )
}

export default App