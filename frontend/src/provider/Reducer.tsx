export interface State {
    isLoggedIn: boolean;
    isLoading: boolean;
    userCred: object; // Change 'any' to the type of user credentials
    companyId: string;
    error: {
        isError: boolean;
        message: string;
        type: string;
    };
}

export interface Action {
    type: string;
    payload?: any; // Change 'any' to the payload type
    data?: any; // Change 'any' to the data type
}

export const initialState: State = {
    isLoggedIn: false,
    isLoading: false,
    userCred: {},
    companyId: '',
    error: { isError: false, message: "", type: "error" },
};

export const globalReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_SPINNER":
            return { ...state, isLoading: action.payload };

        case "SET_MESSAGE":
            return {
                ...state,
                error: {
                    ...state.error,
                    isError: action.payload.isError,
                    message: action.payload.message,
                    type: action.payload.type,
                },
            }

        case "USER_PROFILE":
            return { ...state, userCred: action.data };

        case "COMPANY_ID":
            return { ...state, companyId: action.data };

        case "LOGIN_USER":
            return { ...state, isLoggedIn: true, userCred: action.payload.userCred }

        case "LOGOUT_USER":
            // Remove token from localStorage and update isLoggedIn
            localStorage.removeItem("token");
            localStorage.removeItem("companyId");
            return { ...state, isLoggedIn: false }

        default:
            return state;
    }
};
