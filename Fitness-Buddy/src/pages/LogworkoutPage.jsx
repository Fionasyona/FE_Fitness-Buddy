import React, { useState } from "react";
import "../styles/LogWorkout.css";

function WorkoutLogger() {
  // State to store the list of workouts
  const [workoutList, setWorkoutList] = useState([
    {
      id: 1,
      name: "Bench Press",
      sets: []
    },
    {
      id: 2,
      name: "Overhead Press",
      sets: []
    },
  ]);

  // State for editing workout names
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editingWorkoutName, setEditingWorkoutName] = useState("");

  // State for adding a new set
  const [newSet, setNewSet] = useState({
    weight: "",
    reps: "",
    status: "warmup",
  });

  // Add a new workout
  function addWorkout() {
    const newWorkout = {
      id: Date.now(),
      name: "New Workout",
      sets: [],
    };
    setWorkoutList([...workoutList, newWorkout]);
  }

  // Remove a workout
  function removeWorkout(id) {
    setWorkoutList(workoutList.filter((workout) => workout.id !== id));
  }

  // Edit workout
  function editWorkout(id, name) {
    setEditingWorkoutId(id);
    setEditingWorkoutName(name);
  }

  // Save edited workout name
  function saveWorkout(id) {
    setWorkoutList(
      workoutList.map((workout) =>
        workout.id === id ? { ...workout, name: editingWorkoutName } : workout
      )
    );
    setEditingWorkoutId(null);
  }

  // Toggle set status
  function toggleSetStatus(workoutId, index) {
    setWorkoutList(
      workoutList.map((workout) => {
        if (workout.id === workoutId) {
          const updatedSets = workout.sets.map((set, i) => {
            if (i === index) {
              let newStatus =
                set.status === "warmup"
                  ? "completed"
                  : set.status === "completed"
                  ? "failed"
                  : "warmup";
              return { ...set, status: newStatus };
            }
            return set;
          });
          return { ...workout, sets: updatedSets };
        }
        return workout;
      })
    );
  }

  // Add a new set
  function addSet(workoutId) {
    if (!newSet.weight || !newSet.reps) return; // Prevent empty sets

    setWorkoutList(
      workoutList.map((workout) =>
        workout.id === workoutId
          ? { ...workout, sets: [...workout.sets, { ...newSet }] }
          : workout
      )
    );

    // Reset
    setNewSet({ weight: "", reps: "", status: "warmup" });
  }

  // Remove set
  function removeSet(workoutId, index) {
    setWorkoutList(
      workoutList.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: workout.sets.filter((_, i) => i !== index),
            }
          : workout
      )
    );
  }

  return (
    <div className="workout-logger">
      <h1>Log Workout</h1>

      {/* Summary */}
      <div className="summary-container">
        <SummaryCard label="Duration" value="-" />
        <SummaryCard label="Total Weight" value="-" />
        <SummaryCard
          label="Total Sets"
          value={workoutList.reduce(
            (sum, workout) => sum + workout.sets.length,
            0
          )}
        />
      </div>

      {/* Workouts */}
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
                  <button
                    className="save-btn"
                    onClick={() => saveWorkout(workout.id)}
                  >
                    💾
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => setEditingWorkoutId(null)}
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => editWorkout(workout.id, workout.name)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => removeWorkout(workout.id)}
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sets */}
          {workout.sets.map((set, idx) => (
            <SetRow
              key={idx}
              weight={set.weight}
              reps={set.reps}
              status={set.status}
              onToggleStatus={() => toggleSetStatus(workout.id, idx)}
              onRemove={() => removeSet(workout.id, idx)}
            />
          ))}

          {/* Add set form */}
          <div className="add-set-form">
            <input
              placeholder="Weight"
              type="number"
              value={newSet.weight}
              onChange={(e) => setNewSet({ ...newSet, weight: e.target.value })}
            />
            <input
              placeholder="Reps"
              type="number"
              value={newSet.reps}
              onChange={(e) => setNewSet({ ...newSet, reps: e.target.value })}
            />
            <button onClick={() => addSet(workout.id)}>✔️</button>
          </div>
        </div>
      ))}

      <button className="add-workout-btn" onClick={addWorkout}>
        ➕ Add Workout
      </button>
    </div>
  );
}

// Summary display card
function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

// Single set row
function SetRow({ weight, reps, status, onToggleStatus, onRemove }) {
  let statusClass =
    status === "warmup"
      ? "label-warmup"
      : status === "completed"
      ? "label-completed"
      : "label-failed";

  return (
    <div className="set-row">
      <div>{weight}</div>
      <div>{reps}</div>
      <div className={statusClass}>{status}</div>
      <button onClick={onToggleStatus}>🔄</button>
      <button onClick={onRemove}>❌</button>
    </div>
  );
}

export default WorkoutLogger;
