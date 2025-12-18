import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import signup from '../../../services/signup';
import login from '../../../services/login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login: contextLogin } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const errors = {
    nameLength: "name length should be between 4 and 20",
    missingField: "Missing field is required",
    emailFormat: "Email format is invalid",
    passwordLength: "Password length should be between 8 "
  }
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "employee"
  })


  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault(); //prevents default form submission behavior(refresh)
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

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>MYS</h1>

        <div className="toggle-buttons">
          <button
            onClick={() => setIsLogin(true)}
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className="form" onSubmit={handleLoginSubmit}>
            <select
              className="form-select"
              name="role"
              value={loginForm.role}
              onChange={handleLoginChange}
              style={{ marginBottom: '1rem' }}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={loginForm.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={loginForm.password}
              onChange={handleLoginChange}
            />
            <button
              type="submit"
              className="form-btn"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-input"
              value={signupForm.name}
              onChange={handleSignupChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={signupForm.email}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={signupForm.password}
              onChange={handleSignupChange}
            />
            <button
              type="submit"
              className="form-btn"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Login;
