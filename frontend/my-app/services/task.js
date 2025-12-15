import { useAuth } from "../src/context/AuthContext";
import api from "./api";

const getTasks = async () => {
    try {
        const response = await api.get("/manager/tasks");
        return { error: null, tasks: response.data.tasks }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, tasks: [] }
    }
}

const getSingleTask = async (id) => {
    try {
        const response = await api.get(`/manager/tasks/${id}`);
        return { error: null, task: response.data.task }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, task: null }
    }
}

export default {
    getTasks,
    getSingleTask
}
