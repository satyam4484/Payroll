import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { globalReducer, initialState, State } from "./Reducer";

interface AppProviderProps {
    children: ReactNode;
}

interface AppContextType extends State {
    loginUser: (data: any) => void;
    logoutUser: () => void;
    setMessage: (isError: boolean, type: string, message: string) => void;
    setUserProfile: (userCred: any) => void;
    setCompanyId: (companyId: string) => void;
    toggleSpinner: (data: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Function to toggle the loading spinner
    const toggleSpinner = (data: boolean) => {
        dispatch({ type: "TOGGLE_SPINNER", payload: data });
    };

    // Function to set a message and show a toast message
    const setMessage = (isError: boolean, type: string, message: string) => {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                isError, type, message
            }
        });
    }

    const setUserProfile = (userCred: any) => {
        dispatch({ type: "USER_PROFILE", data: userCred });
    };

    const setCompanyId = (companyId: string) => {
        dispatch({ type: "COMPANY_ID", data: companyId });
    };

    // Function to log in a user
    const loginUser = (data: any) => {
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
            toggleSpinner
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within an AppProvider");
    }
    return context;
};
