import React, { useEffect, useState } from "react";
import "../App.css";
import PageWrapper from "../components/PageWrapper";

function StudyPlan() {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const storedPlan = localStorage.getItem("studyPlan");
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
  }, []);

  return (
    <PageWrapper>
      <div className="container">
        <h2>Your Personalized Study Plan</h2>
      {plan.length > 0 ? (
        <div className="plan-display">
          <ul className="subject-list">
            {plan.map((session, idx) => (
              <li key={idx} className="subject-item">
                <strong>{session.subject}</strong>: {session.time}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No plan generated yet.</p>
      )}
      </div>
    </PageWrapper>
  );
}

export default StudyPlan;