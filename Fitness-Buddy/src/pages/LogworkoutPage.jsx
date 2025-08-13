import React, { useState } from "react";
import "../styles/LogWorkout.css"; // Scoped styles for this page

function LogWorkoutPage() {
  const [workoutList, setWorkoutList] = useState([
    {
      id: 1,
      name: "Sit Ups",
      sets: []
    },
    {
      id: 2,
      name: "Push Ups",
      sets: []
    },
  ]);

  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editingWorkoutName, setEditingWorkoutName] = useState("");
  const [setInputs, setSetInputs] = useState({});
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  //add new workout
  function addWorkout() {
    const newWorkout = {
      id: Date.now(),
      name: "New Workout",
      sets: [],
    };
    setWorkoutList([...workoutList, newWorkout]);
  }

  // removing workout
  function removeWorkout(id) {
    setWorkoutList(workoutList.filter((w) => w.id !== id));
    setSetInputs((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  //editing workout
  function editWorkout(id, name) {
    setEditingWorkoutId(id);
    setEditingWorkoutName(name);
  }

  //saving workout
  function saveWorkout(id) {
    setWorkoutList(
      workoutList.map((w) =>
        w.id === id ? { ...w, name: editingWorkoutName } : w
      )
    );
    setEditingWorkoutId(null);
  }


// toggleset status 
  function toggleSetStatus(workoutId, index) {
    setWorkoutList(
      workoutList.map((w) => {
        if (w.id === workoutId) {
          const updatedSets = w.sets.map((set, i) =>
            i === index
              ? {
                  ...set,
                  status:
                    set.status === "warmup"
                      ? "completed"
                      : set.status === "completed"
                      ? "failed"
                      : "warmup",
                }
              : set
          );
          return { ...w, sets: updatedSets };
        }
        return w;
      })
    );
  }

  function addSet(workoutId) {
    const setData = setInputs[workoutId] || { sets: "", reps: "" };
    if (!setData.sets || !setData.reps) return;

    setWorkoutList(
      workoutList.map((workout) =>
        workoutId.id === workoutId
          ? {
              ...workout,
              sets: [
                ...workout.sets,
                { sets: setData.sets, reps: setData.reps, status: "warmup" },
              ],
            }
          : workout
      )
    );

    setSetInputs((prev) => ({ ...prev, [workoutId]: { sets: "", reps: "" } }));
    setActiveWorkoutId(null);
  }

  function removeSet(workoutId, index) {
    setWorkoutList(
      workoutList.map((w) =>
        w.id === workoutId
          ? { ...w, sets: w.sets.filter((_, i) => i !== index) }
          : w
      )
    );
  }

  return (
    <div className="log-workout-container">
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
            <a href="/SearchPage">Search</a>
          </li>
          <li>
            <a href="/Progresspage">Progress</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>

      <div className="workout-logger">
        <h1>Log Workout</h1>

        {/* Summary */}
        <div className="summary-container">
          <SummaryCard label="Duration" value="-" />
          <SummaryCard label="Sets" value="-" />
          <SummaryCard
            label="Total Sets"
            value={workoutList.reduce((sum, w) => sum + w.sets.length, 0)}
          />
        </div>

        {/* Workout List */}
        {workoutList.map((workout) => (
          <div key={workout.id} className="workout-block">
            <div className="workout-header">
              {editingWorkoutId === workout.id ? (
                <input
                  value={editingWorkoutName}
                  onChange={(e) => setEditingWorkoutName(e.target.value)}
                />
              ) : (
                <h2>{workout.name}</h2>
              )}

              <div>
                {editingWorkoutId === workout.id ? (
                  <>
                    <button onClick={() => saveWorkout(workout.id)}>💾</button>
                    <button onClick={() => setEditingWorkoutId(null)}>
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => editWorkout(workout.id, workout.name)}
                    >
                      ✏️
                    </button>
                    <button onClick={() => removeWorkout(workout.id)}>
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Set Rows */}
            {workout.sets.map((set, idx) => (
              <SetRow
                key={idx}
                sets={set.sets}
                reps={set.reps}
                status={set.status}
                onToggleStatus={() => toggleSetStatus(workout.id, idx)}
                onRemove={() => removeSet(workout.id, idx)}
              />
            ))}

            {/* Add Set Form */}
            {activeWorkoutId === workout.id ? (
              <div className="add-set-form">
                <input
                  placeholder="Sets"
                  type="number"
                  value={setInputs[workout.id]?.sets || ""}
                  onChange={(e) =>
                    setSetInputs((prev) => ({
                      ...prev,
                      [workout.id]: {
                        ...prev[workout.id],
                        sets: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  placeholder="Reps"
                  type="number"
                  value={setInputs[workout.id]?.reps || ""}
                  onChange={(e) =>
                    setSetInputs((prev) => ({
                      ...prev,
                      [workout.id]: {
                        ...prev[workout.id],
                        reps: e.target.value,
                      },
                    }))
                  }
                />
                <button onClick={() => addSet(workout.id)}>✔️</button>
              </div>
            ) : (
              <button onClick={() => setActiveWorkoutId(workout.id)}>
                ➕ Add Set
              </button>
            )}
          </div>
        ))}

        <button className="add-workout-btn" onClick={addWorkout}>
          ➕ Add Workout
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

function SetRow({ sets, reps, status, onToggleStatus, onRemove }) {
  let statusClass =
    status === "warmup"
      ? "label-warmup"
      : status === "completed"
      ? "label-completed"
      : "label-failed";

  return (
    <div className="set-row">
      <div>{sets}</div>
      <div>{reps}</div>
      <div className={statusClass}>{status}</div>
      <button onClick={onToggleStatus}>🔄</button>
      <button onClick={onRemove}>❌</button>
    </div>
  );
}

export default LogWorkoutPage;
