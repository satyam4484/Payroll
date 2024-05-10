import axios, { AxiosRequestConfig } from "axios";

// export const BASE_URL = "http://127.0.0.1:8000/api/"
export const BASE_URL = "http://localhost:8000/api/"

const axiosClient = (options: AxiosRequestConfig = {}): any => {
    if (localStorage.getItem("token")) {
        options.headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    }
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
};

export default axiosClient;
