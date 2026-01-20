import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

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
    <div className="container">
      <h2>Login to Study Planner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;
