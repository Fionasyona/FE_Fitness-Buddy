import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "../styles/ProgressPage.css";

function ProgressPage() {
  const [labels, setLabels] = useState(["Week 1", "Week 2", "Week 3"]);
  const [workouts, setWorkouts] = useState([3, 5, 2]);
    const [calories, setCalories] = useState([1200, 1500, 1000]);
     const [menuOpen, setMenuOpen] = useState(false);

  // Function to add a new random workout for the next week
  function addWorkout() {
    const nextWeek = `Week ${labels.length + 1}`;
    setLabels([...labels, nextWeek]);
    setWorkouts([...workouts, Math.floor(Math.random() * 5) + 1]);
    setCalories([...calories, Math.floor(Math.random() * 1000) + 1000]);
  }

  // Line chart data (Workouts & Calories)
  const lineData = {
    labels,
    datasets: [
      {
        label: "Workouts",
        data: workouts,
        borderColor: "blue",
        backgroundColor: "lightblue",
      },
      {
        label: "Calories Burned",
        data: calories,
        borderColor: "red",
        backgroundColor: "pink",
      },
    ],
  };

  // Bar chart data (Workouts only)
  const barData = {
    labels,
    datasets: [
      {
        label: "Workouts",
        data: workouts,
        backgroundColor: "purple",
      },
    ],
  };

  return (
    <div className="progress-page">
      <nav className="navbar log-workout-navbar">
        <div className="logo">🏋️ MyFitnessApp</div>
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
            <a href="/LogWorkoutPage">Log Workout</a>
          </li>
          <li>
            <a href="/Searchpage">Search</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>

      <h1>Progress Page</h1>
      <p>Track your fitness journey here!</p>

      {/* Button to add workouts */}
      <button onClick={addWorkout}>Add Random Workout</button>

      {/* Line Chart */}
      <div style={{ width: "600px", margin: "20px auto" }}>
        <h2>Workouts vs Calories</h2>
        <Line data={lineData} />
      </div>

      {/* Bar Chart */}
      <div style={{ width: "600px", margin: "20px auto" }}>
        <h2>Workouts Overview</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default ProgressPage;
