import { useAuth } from "../src/context/AuthContext";
import api from "./api";

const getReports = async () => {
    try {
        const response = await api.get("/manager/reports");
        return { error: null, reports: response.data.reports }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, reports: [] }
    }
}

const getSingleReport = async (id) => {
    try {
        const response = await api.get(`/manager/reports/${id}`);
        return { error: null, report: response.data.report }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, report: null }
    }
}

export default {
    getReports,
    getSingleReport
}
