import api from "./api";

const getTasks = async (role) => {
    try {
        const response = await api.get(`/${role}/tasks`);
        return { error: null, tasks: response.data.tasks }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, tasks: [] }
    }
}

const getSingleTask = async (id, role) => {
    try {
        const response = await api.get(`/${role}/tasks/${id}`);
        return { error: null, task: response.data.task }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, task: null }
    }
}

const assignTask = async (taskInfo) => {
    try {
        const response = await api.post("/manager/assign-task", taskInfo);
        return { error: null, data: response.data }
    }
    catch (error) {
        console.log(error.details);
        alert("error while Assgining task")
    }
}

export default {
    getTasks,
    getSingleTask,
    assignTask
}
