import axios from "axios";

const USER_BASE_URL = "http://localhost:8080/user";

export type UserType = {
    id: number,
    name: string,
    email: string,
    username: string,
}
export const getUser = async () => {
    try{
        const res = await axios.get<UserType>(USER_BASE_URL);
        return res
    }catch(error){
        console.error("Error fetching user: ", error);
        throw error;
    }
}