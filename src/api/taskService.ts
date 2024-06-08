import axios from "axios";
import { Task } from "../components/TodoView";

const TASK_BASE_URL = "http://localhost:8080/todos"

export const getTask = async (id:number) => {
    try{
        const res = await axios.get<Task>(TASK_BASE_URL+"/"+id);
        return res
    }catch(error){
        console.error("Error fetching tasks: ", error);
        throw error;
    }
}

export const getAllTasks = async () => {
    try {
      const response = await axios.get<Task[]>(TASK_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      throw error;
    }
};

export const addTask =  async (task: Task) => {
    console.log("task recieved ---> ", task);
    return await axios.post(TASK_BASE_URL, task);
};
  
export const updateTask = async (task:Task) => {
    return await axios.put(TASK_BASE_URL+"/"+ task?.id, task);
};

export const deleteTask = async (id: number) => {
    return await axios.delete(TASK_BASE_URL+ "/"+id);
};