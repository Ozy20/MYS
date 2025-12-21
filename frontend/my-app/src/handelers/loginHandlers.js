import { jwtDecode } from "jwt-decode";
import signup from '../../services/signup';
import login from '../../services/login';

const errors = {
    nameLength: "name length should be between 4 and 20",
    missingField: "Missing field is required",
    emailFormat: "Email format is invalid",
    passwordLength: "Password length should be between 8 "
};

export const handleSignupChange = (e, signupForm, setSignupForm) => {
    setSignupForm({
        ...signupForm,
        [e.target.name]: e.target.value
    });
};

export const handleLoginChange = (e, loginForm, setLoginForm) => {
    setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value
    });
};

export const handleLoginSubmit = async (e, loginForm, setError, setSuccess, contextLogin, navigate) => {
    e.preventDefault();
    try {
        const { email, password, role } = loginForm
        if (!email || !password || !role) {
            setError(errors.missingField)
            setSuccess("")
            return;
        }
        const response = await login(loginForm);
        console.log("Login Success:", response);
        const decodedUser = jwtDecode(response.data.token);
        console.log("Decoded Token:", decodedUser);
        contextLogin(decodedUser);
        navigate(`/app/${decodedUser.role === "manager" ? "dashboard" : "tasks"}`);

    } catch (error) {
        console.error("Login Failed:", error);
        setError(error.message || "Login failed");
    }
};

export const handleSignupSubmit = async (e, signupForm, setError, setSuccess, setIsLogin) => {
    e.preventDefault();
    try {
        const { name, email, password } = signupForm;
        if (!name || !email || !password) {
            setError(errors.missingField);
            setSuccess("")
            return;
        }
        if (name.length < 4 || name.length > 20) {
            setError(errors.nameLength);
            setSuccess("")
            return;
        }
        if (password.length < 8) {
            setError(errors.passwordLength);
            setSuccess("")
            return;
        }
        if (!email.includes("@" || ".")) {
            setError(errors.emailFormat);
            setSuccess("")
            return;
        }
        const response = await signup(signupForm);
        console.log("Signup Success:", response);
        setSuccess("Signup Successful! Please Login.");
        setError("");
        setIsLogin(true);
    } catch (error) {
        console.error("Signup Failed:", error);
        setError(error.message || "Signup failed");
        setSuccess("");
    }
};
