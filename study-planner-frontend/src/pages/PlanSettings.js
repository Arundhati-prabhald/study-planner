import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function PlanSettings() {
  const [planSettings, setPlanSettings] = useState({
    daily_study_hours: '',
    study_style: 'mixed',
    max_focus_time: ''
  });
  const [studyPlan, setStudyPlan] = useState(null);

  const handleGeneratePlan = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generate-plan/", planSettings, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setStudyPlan(response.data.plan);
    } catch (error) {
      console.error(error);
      alert("Error generating plan. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Set Your Study Preferences</h2>
      <input
        placeholder="Daily Study Hours"
        type="number"
        step="0.5"
        value={planSettings.daily_study_hours}
        onChange={(e) => setPlanSettings({...planSettings, daily_study_hours: e.target.value})}
        required
      />
      <select
        value={planSettings.study_style}
        onChange={(e) => setPlanSettings({...planSettings, study_style: e.target.value})}
      >
        <option value="continuous">Continuous (Focus on one subject)</option>
        <option value="mixed">Mixed (Rotate subjects)</option>
      </select>
      <input
        placeholder="Max Focus Time (hours)"
        type="number"
        step="0.5"
        value={planSettings.max_focus_time}
        onChange={(e) => setPlanSettings({...planSettings, max_focus_time: e.target.value})}
        required
      />
      <button onClick={handleGeneratePlan}>Generate My Study Plan</button>

      {studyPlan && (
        <div className="plan-display">
          <h3>Your Personalized Study Plan</h3>
          <ul className="subject-list">
            {studyPlan.map((session, idx) => (
              <li key={idx} className="subject-item">
                <strong>{session.subject}</strong>: {session.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlanSettings;