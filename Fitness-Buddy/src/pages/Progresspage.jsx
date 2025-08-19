import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/ProgressPage.css";

// ✅ Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProgressPage() {
  const [labels, setLabels] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [calories, setCalories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Load progress data from localStorage
  useEffect(() => {
    const progressData = JSON.parse(localStorage.getItem("workoutData")) || [];

    // Convert into labels + datasets
    const weeks = progressData.map((_, idx) => `Week ${idx + 1}`);
    const workoutCounts = progressData.map((d) => d.totalWorkouts || 0);
    const calorieCounts = progressData.map((d) => d.totalCalories || 0);

    setLabels(weeks);
    setWorkouts(workoutCounts);
    setCalories(calorieCounts);
  }, []);

  // ✅ Chart Data
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
      {/* ✅ NAVBAR */}
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

      {/* ✅ Show charts only if data exists */}
      {labels.length > 0 ? (
        <>
          <div style={{ width: "600px", margin: "20px auto" }}>
            <h2>Workouts vs Calories</h2>
            <Line data={lineData} />
          </div>

          <div style={{ width: "600px", margin: "20px auto" }}>
            <h2>Workouts Overview</h2>
            <Bar data={barData} />
          </div>
        </>
      ) : (
        <p>No progress data yet. Log some workouts first!</p>
      )}
    </div>
  );
}

export default ProgressPage;
