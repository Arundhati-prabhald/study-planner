import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./Register";
import Dashboard from "./pages/Dashboard";
import PlanSettings from "./pages/PlanSettings";
import StudyPlan from "./pages/StudyPlan";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan-settings" element={<PlanSettings />} />
        <Route path="/study-plan" element={<StudyPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
