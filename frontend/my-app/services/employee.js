import { useAuth } from "../src/context/AuthContext";
import api from "./api";

const getAllEmployees = async () => {
    try {
        const response = await api.get("/manager/employees");
        if (response.data.employees == 0) {
            return { message: "No employees found", employees: [] }
        }
        return response.data;
    }
    catch (axiosError) {
        console.error("Error fetching employees:", axiosError);
        return { error: axiosError.message, employees: [] }
    }
};

const deleteEmployee = async (id) => {

};

const updateEmployee = async (id, data) => {

};

export default {
    getAllEmployees,
    deleteEmployee,
    updateEmployee
};
