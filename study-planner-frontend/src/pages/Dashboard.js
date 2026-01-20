import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    syllabus_size: '',
    exam_date: '',
    priority: 1,
    difficulty: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = async () => {
    if (!newSubject.name || !newSubject.syllabus_size || !newSubject.exam_date) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/add-subject/", newSubject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setNewSubject({ name: '', syllabus_size: '', exam_date: '', priority: 1, difficulty: 1 });
      // Refresh subjects
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setSubjects(response.data.subjects);
      alert("Subject added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding subject. Please try again.");
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-subject/${subjectId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      // Refresh subjects
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setSubjects(response.data.subjects);
      alert("Subject deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting subject.");
    }
  };

  
  const handleProceed = () => {
  navigate("/plan-settings");
};


  return (
    <div className="container">
      <h2>Welcome to Your Study Dashboard</h2>

      <h3>Add a Subject</h3>
      <input
        placeholder="Subject Name"
        value={newSubject.name}
        onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
      />
      <input
        placeholder="Syllabus Size (e.g., number of topics)"
        type="number"
        value={newSubject.syllabus_size}
        onChange={(e) => setNewSubject({...newSubject, syllabus_size: e.target.value})}
      />
      <input
        placeholder="Exam Date"
        type="date"
        value={newSubject.exam_date}
        onChange={(e) => setNewSubject({...newSubject, exam_date: e.target.value})}
      />
      <select
        value={newSubject.priority}
        onChange={(e) => setNewSubject({...newSubject, priority: e.target.value})}
      >
        <option value={1}>Low Priority</option>
        <option value={2}>Medium Priority</option>
        <option value={3}>High Priority</option>
      </select>
      <select
        value={newSubject.difficulty}
        onChange={(e) => setNewSubject({...newSubject, difficulty: e.target.value})}
      >
        <option value={1}>Easy</option>
        <option value={2}>Medium</option>
        <option value={3}>Hard</option>
      </select>
      <button onClick={handleAddSubject}>Add Subject</button>

      <h3>Your Subjects</h3>
      {subjects.length > 0 ? (
        <ul className="subject-list">
          {subjects.map((subj, idx) => (
            <li key={idx} className="subject-item">
              <div>
                <strong>{subj.name}</strong> - Syllabus: {subj.syllabus_size}, Exam: {subj.exam_date}, Priority: {subj.priority}, Difficulty: {subj.difficulty}
              </div>
              <button onClick={() => handleDeleteSubject(subj.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects added yet.</p>
      )}

      <button onClick={handleProceed} style={{marginTop: '20px'}}>Proceed to Plan Settings</button>
    </div>
  );
}

export default Dashboard;
