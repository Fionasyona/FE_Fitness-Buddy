import React, { useEffect, useState } from "react";
import "../styles/ProgressPage.css";

function ProgressPage() {
  const [progressData, setProgressData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load data safely from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("workoutData")) || [];
      setProgressData(saved);
    } catch (err) {
      console.error("Error loading workoutData:", err);
      setProgressData([]);
    }
  }, []);

  return (
    <div className="progress-page">
      <nav className="navbar progresspage-navbar">
        <div className="logo"> 📈 MyFitnessApp</div>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/LoginPage">Login</a>
          </li>
          <li>
            <a href="/Searchpage">Search</a>
          </li>
          <li>
            <a href="/LogWorkoutPage">Log Workout</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>

      <h1>📈 Progress Tracker</h1>

      {progressData.length === 0 ? (
        <p>No progress data yet. Log some workouts first!</p>
      ) : (
        <div className="progress-list">
          {progressData.map((entry, index) => (
            <div key={index} className="progress-card">
              <h2>Week {index + 1}</h2>
              <p>
                <strong>Total Workouts:</strong> {entry.totalWorkouts}
              </p>
              <p>
                <strong>Total Calories:</strong>{" "}
                {Math.round(entry.totalCalories)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressPage;
