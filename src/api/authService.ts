import axios from "axios"
import { SignUpForm } from "../components/Pages/SignUp";
import { SignInForm } from "../components/Pages/SignIn";

const AUTH_BASE_URL = "http://localhost:8080/auth"

export const registerAPICall = (registerObj: SignUpForm) => {
    return axios.post(AUTH_BASE_URL + "/register", registerObj);
};

export const loginAPICall = (loginObj: SignInForm) => {
    return axios
      .post(AUTH_BASE_URL + "/login", loginObj)
      .then((response) => {
        const token = "Bearer " + response.data.accessToken;
        sessionStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
};

// Interceptors
axios.interceptors.request.use(
    function (config) {
      config.headers["Authorization"] = sessionStorage.getItem("token");
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);