import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SearchPage.css";

export default function SearchPage() {
  // State for storing search input
  const [query, setQuery] = useState("");

  // State for exercises fetched from API
  const [exercises, setExercises] = useState([]);

  // State for menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch exercises by muscle group from WGER API
  useEffect(() => {
    if (!query) {
      setExercises([]); // Clear when query is empty
      return;
    }

    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://wger.de/api/v2/exercise/?muscle=${query}&language=2&limit=20`
        );
        setExercises(response.data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exercises. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [query]);

  return (
    <div className="search-page-container">
      {/* Navbar */}
      <nav className="navbar SearchPage-navbar">
        <div className="logo">🏋️ MyFitnessApp</div>

        {/* Mobile menu icon */}
        <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </div>

        {/* Navigation links */}
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

      {/* Page title */}
      <h1 className="title">Search Exercises by Muscle Group</h1>

      {/* Search input (expects a muscle ID) */}
      <input
        type="text"
        placeholder="Enter muscle ID (e.g., 1 for biceps)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* Display results */}
      <div className="grid-container">
        {loading && <p>Loading exercises...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && exercises.length > 0
          ? exercises.map((exercise) => (
              <div key={exercise.id} className="card">
                <h2 className="card-title">{exercise.name}</h2>
                <p className="card-muscle">
                  {exercise.description || "No description available"}
                </p>
              </div>
            ))
          : !loading &&
            !error &&
            query &&
            exercises.length === 0 && <p>No exercises found.</p>}
      </div>
    </div>
  );
}
