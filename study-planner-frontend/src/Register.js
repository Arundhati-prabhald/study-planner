import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

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
    <div className="container">
      <h2>Join Study Planner</h2>
      <input
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
      <button onClick={handleRegister}>Register</button>
      <br />
      <a href="/">Already have an account? Login</a>
    </div>
  );
}

export default Register;
