import React, { useState } from "react";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Editable state
  const [details, setDetails] = useState({
    weight: "70 kg",
    height: "170 cm",
    bmi: "24.2",
    targetWeight: "65 kg",
  });

  // Toggle visibility of personal details
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Personal details updated successfully!");
  };

  return (
    <div className="profile-page">
      {/* ✅ Navbar */}
      <nav className="navbar profile-navbar">
        <div className="logo">📈 MyFitnessApp</div>
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
            <a href="/SearchPage">Search</a>
          </li>
          <li>
            <a href="/ProgressPage">Progress</a>
          </li>
        </ul>
      </nav>

      {/* ✅ Profile Section */}
      <div className="profile-header">
        <h2>Agnes</h2>
        <p>Fitness Enthusiast</p>
      </div>

      {/* ✅ All Options + Personal Details in SAME Container */}
      <div className="profile-options">
        {/* Personal Details */}
        <h2 onClick={() => setShowDetails(!showDetails)}>
          Personal Details {showDetails ? "▲" : "▼"}
        </h2>

        <form
          className={`personal-details-form ${showDetails ? "active" : ""}`}
        >
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={details.weight}
              onChange={handleChange}
            />
          </label>
          <label>
            Height:
            <input
              type="text"
              name="height"
              value={details.height}
              onChange={handleChange}
            />
          </label>
          <label>
            BMI:
            <input
              type="text"
              name="bmi"
              value={details.bmi}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Weight:
            <input
              type="text"
              name="targetWeight"
              value={details.targetWeight}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleSave} className="save-btn">
            Save Details
          </button>
        </form>

        {/* Other Options */}
        <h3>Account</h3>
        <ul>
          <li>⚙️ Settings</li>
          <li>⭐ Favorites</li>
          <li>📅 Workout Schedule</li>
        </ul>

        <h3>Community</h3>
        <ul>
          <li>👥 Join Fitness Family</li>
          <li>➕ Invite Your Friend</li>
        </ul>

        <h3>Support</h3>
        <ul>
          <li>📸 Follow us on Instagram</li>
          <li>🌟 Rate us</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
