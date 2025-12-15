import api from "./api";

const getReports = async (role) => {
    try {
        const response = await api.get(`/${role}/reports`);
        return { error: null, reports: response.data.reports }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, reports: [] }
    }
}

const getSingleReport = async (id, role) => {
    try {
        const response = await api.get(`/${role}/reports/${id}`);
        return { error: null, report: response.data.report }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, report: null }
    }
}

const sendReport = async (report, role) => {
    try {
        const response = await api.post(`/${role}/reports/create`, report);
        return { error: null, report: response.data.report }
    }
    catch (axiosError) {
        console.log(axiosError)
        return { error: axiosError, report: null }
    }
}

export default {
    getReports,
    getSingleReport,
    sendReport
}
