import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

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
          <form className="form">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <button
              type="submit"
              className="form-btn"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="form">
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              className="form-input"
            />
            <select className="form-select">
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
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
