import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import PageWrapper from "../components/PageWrapper";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // Store JWT tokens in localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard"); // redirect to Dashboard page
    } catch (error) {
      console.error(error);
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <PageWrapper>
      <div className="auth-container">
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📚</div>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '24px' }}>Welcome Back</h2>
        <p style={{ color: '#666', marginBottom: '18px', fontSize: '13px' }}>Sign in to continue</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '12px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', fontSize: '14px' }}
            />
          </div>
          
          <div style={{ marginBottom: '14px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', fontSize: '14px' }}
            />
          </div>
          
          <button type="submit" style={{ marginBottom: '12px', fontWeight: '600', fontSize: '14px', padding: '11px 14px' }}>Sign In</button>
        </form>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '12px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Don't have an account?</p>
          <Link to="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>Create one here →</Link>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;
