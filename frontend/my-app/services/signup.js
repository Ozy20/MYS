import api from "./api"

const signup = (userData) => {
    try {
        const response = api.post("/signup", userData);
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

export default signup;