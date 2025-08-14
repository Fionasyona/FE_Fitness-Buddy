import React, { useState } from "react";
import "../styles/SearchPage.css"; // Import the CSS for this page only

// Example exercise data 
const exercisesData = [
  { id: 1, name: "Push Up", muscle: "Chest" },
  { id: 2, name: "Squat", muscle: "Legs" },
  { id: 3, name: "Plank", muscle: "Core" },
  { id: 4, name: "Bicep Curl", muscle: "Arms" },
  { id: 5, name: "Lunges", muscle: "Legs" },
  { id: 6, name: "Shoulder Press", muscle: "Shoulders" },
];

export default function SearchPage() {
  // State for storing what the user types
  const [query, setQuery] = useState("");

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Filter exercises based on search query
  const filteredExercises = exercisesData.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      exercise.muscle.toLowerCase().includes(query.toLowerCase())
  );

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
      <h1 className="title">Search Exercises</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or muscle group..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* Display search results */}
      <div className="grid-container">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <div key={exercise.id} className="card">
              <h2 className="card-title">{exercise.name}</h2>
              <p className="card-muscle">{exercise.muscle}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No exercises found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
