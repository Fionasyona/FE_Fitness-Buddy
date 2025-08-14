import React, { useState } from "react";
import "../styles/SearchPage.css";

// Example exercise data
const exercisesData = [
    {
        id: 1,
        name: "Push Up",
        muscle: "Chest"
    },
    {
        id: 2,
        name: "Squat",
        muscle: "Legs"
    },
    {
        id: 3,
        name: "Plank",
        muscle: "Core"
    },
    {
        id: 4,
        name: "Bicep Curl",
        muscle: "Arms"
    },
    {
        id: 5,
        name: "Lunges",
        muscle: "Legs"
    },
    {
        id: 6,
        name: "Shoulder Press",
        muscle: "Shoulders"
    },
];

export default function SearchPage() {
  // State to store the search input value
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

  // Filter the list of exercises based on the search query
  const filteredExercises = exercisesData.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      exercise.muscle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <nav className="navbar SearchPage-navbar">
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
            <a href="/LogWorkoutPage">LogWorkout</a>
          </li>
          <li>
            <a href="/Progresspage">Progress</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>
      {/* Title */}
      <h1 className="title">Search Exercises</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or muscle group..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query when typing
        className="search-input"
      />

      {/* Display results */}
      <div className="grid-container">
        {filteredExercises.length > 0 ? (
          // Loop through filtered exercises and display them
          filteredExercises.map((exercise) => (
            <div key={exercise.id} className="card">
              <h2 className="card-title">{exercise.name}</h2>
              <p className="card-muscle">{exercise.muscle}</p>
            </div>
          ))
        ) : (
          // If no exercises match, show a message
          <p className="no-results">No exercises found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
