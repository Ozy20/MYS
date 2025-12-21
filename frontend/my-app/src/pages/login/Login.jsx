import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import {
  handleLoginChange,
  handleSignupChange,
  handleLoginSubmit,
  handleSignupSubmit
} from '../../handelers/loginHandlers';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login: contextLogin } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
          <form className="form" onSubmit={(e) => handleLoginSubmit(e, loginForm, setError, setSuccess, contextLogin, navigate)}>
            <select
              className="form-select"
              name="role"
              value={loginForm.role}
              onChange={(e) => handleLoginChange(e, loginForm, setLoginForm)}
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
              onChange={(e) => handleLoginChange(e, loginForm, setLoginForm)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={loginForm.password}
              onChange={(e) => handleLoginChange(e, loginForm, setLoginForm)}
            />
            <button
              type="submit"
              className="form-btn"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={(e) => handleSignupSubmit(e, signupForm, setError, setSuccess, setIsLogin)}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-input"
              value={signupForm.name}
              onChange={(e) => handleSignupChange(e, signupForm, setSignupForm)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={signupForm.email}
              onChange={(e) => handleSignupChange(e, signupForm, setSignupForm)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={signupForm.password}
              onChange={(e) => handleSignupChange(e, signupForm, setSignupForm)}
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
