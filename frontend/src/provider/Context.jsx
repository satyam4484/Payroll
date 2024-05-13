import React, { createContext, useReducer, useContext } from "react";
import { globalReducer, initialState } from "./GlobalReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Function to toggle the loading spinner
    const toggleLoading = (isLoading) => {
        dispatch({ type: "TOGGLE_LOADING", payload: isLoading });
    };

    // Function to set a message and show a toast message
    const setMessage = (isError, message) => {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                isError, message
            }
        });
    }

    const setUserProfile = (userCred) => {
        dispatch({ type: "USER_PROFILE", data: userCred });
    };

    const setCompanyId = (companyId) => {
        dispatch({ type: "COMPANY_ID", data: companyId });
    };

    // Function to log in a user
    const loginUser = (data) => {
        dispatch({ type: "LOGIN_USER", payload: data });
    };

    // Function to log out a user
    const logoutUser = () => {
        dispatch({ type: "LOGOUT_USER" });
    };

    return (
        <AppContext.Provider value={{
            ...state,
            loginUser,
            logoutUser,
            setMessage,
            setUserProfile,
            setCompanyId,
            toggleLoading
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };