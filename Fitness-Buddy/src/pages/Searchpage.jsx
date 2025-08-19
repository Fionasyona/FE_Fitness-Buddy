import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SearchPage.css";

export default function SearchPage() {
  // State for selected muscle
  const [muscle, setMuscle] = useState("");

  // State for exercises
  const [exercises, setExercises] = useState([]);

  // State for menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Map of muscle IDs → names (from WGER docs)
  const muscleOptions = [
    { id: 1, name: "Biceps" },
    { id: 2, name: "Shoulders" },
    { id: 3, name: "Chest" },
    { id: 4, name: "Triceps" },
    { id: 5, name: "Abs" },
    { id: 6, name: "Calves" },
    { id: 7, name: "Glutes" },
    { id: 8, name: "Quadriceps" },
    { id: 9, name: "Hamstrings" },
    { id: 10, name: "Lats" },
    { id: 11, name: "Trapezius" },
    { id: 12, name: "Lower Back" },
  ];

  // Fetch exercises when muscle changes
  useEffect(() => {
    if (!muscle) {
      setExercises([]);
      return;
    }

    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://wger.de/api/v2/exercise/?muscles=${muscle}&language=2&limit=20`
        );
        setExercises(response.data.results);
      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to fetch exercises. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [muscle]);

  return (
    <div className="search-page-container">
      {/* Navbar */}
      <nav className="navbar SearchPage-navbar">
        <div className="logo">🏋️ MyFitnessApp</div>

        <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
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
            <a href="/ProgressPage">Progress</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>

      {/* Title */}
      <h1 className="title">Search Exercises by Muscle Group</h1>

      {/* Dropdown for muscles */}
      <select
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
        className="search-dropdown"
      >
        <option value="">-- Select a Muscle Group --</option>
        {muscleOptions.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      {/* Display results */}
      <div className="grid-container">
        {loading && <p>⏳ Loading exercises...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && exercises.length > 0
          ? exercises.map((exercise) => (
              <div key={exercise.id} className="card">
                <h2 className="card-title">{exercise.name}</h2>
                {exercise.description && exercise.description.trim() ? (
                  <p
                    className="card-description"
                    dangerouslySetInnerHTML={{ __html: exercise.description }}
                  />
                ) : (
                  <div className="placeholder-box">
                    🚧 Description coming soon. Check back later!
                  </div>
                )}
              </div>
            ))
          : !loading &&
            !error &&
            muscle && (
              <p className="info-text">
                🤷 No exercises found for this muscle group.
              </p>
            )}
      </div>
    </div>
  );
}
