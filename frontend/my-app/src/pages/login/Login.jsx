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
  const navigate = useNavigate();

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
      const response = await login(loginForm);
      console.log("Login Success:", response);
      const decodedUser = jwtDecode(response.data.token);
      console.log("Decoded Token:", decodedUser);
      contextLogin(decodedUser);
      navigate(`/app/${decodedUser.role === "manager" ? "dashboard" : "tasks"}`);

    } catch (error) {
      console.error("Login Failed:", error);
      alert(error.message || "Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(signupForm);
      console.log("Signup Success:", response);
      alert("Signup Successful! Please Login.");
      setIsLogin(true);
    } catch (error) {
      console.error("Signup Failed:", error);
      alert(error.message || "Signup failed");
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
    </div>
  );
}

export default Login;
