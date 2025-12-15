import api from "./api";
const login = async (userData) => {
    try {
        const { email, password, role } = userData;
        const endpoint = `/login/${role || 'employee'}`;
        const response = await api.post(endpoint, { email, password });
        localStorage.setItem("token", response.data.token);
        return response;
    }
    catch (axiosError) {
        const data = axiosError.response?.data || {};
        throw {
            message: data.error || "Something went wrong",
            details: data.details || [],
            status: axiosError.response?.status
        };
    }
}
export default login;