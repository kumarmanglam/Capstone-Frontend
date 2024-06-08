import axios from "axios"

const PASSWORD_RESET_BASE_URL = "http://localhost:8080/password-reset";

export const sendResetLink = (email: string) => {
    return axios.post(PASSWORD_RESET_BASE_URL + "/request/" + email);
};


export const resetPassword = (token: string, newPassword: string) => {
    return axios.post(
        PASSWORD_RESET_BASE_URL + "/reset/" + token,
      { newPassword: newPassword } 
    );
};