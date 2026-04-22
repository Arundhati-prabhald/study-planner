import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import PageWrapper from "./components/PageWrapper";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });
      alert("Registered successfully");
      navigate("/");
    } catch {
      alert("Error registering user");
    }
  };

  return (
    <PageWrapper>
      <div className="auth-container">
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✨</div>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '24px' }}>Get Started</h2>
        <p style={{ color: '#666', marginBottom: '18px', fontSize: '13px' }}>Create your account now</p>
        
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '12px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', fontSize: '14px' }}
            />
          </div>
          
          <button onClick={handleRegister} style={{ marginBottom: '12px', fontWeight: '600', fontSize: '14px', padding: '11px 14px' }}>Create Account</button>
        </div>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginTop: '12px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Already have an account?</p>
          <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>Sign in here →</Link>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Register;
